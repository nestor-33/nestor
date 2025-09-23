
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY no está configurada. Asegúrese de que la variable de entorno API_KEY esté definida.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        analisis: {
            type: Type.ARRAY,
            description: "Una lista de posibles afecciones de la piel detectadas en la imagen.",
            items: {
                type: Type.OBJECT,
                properties: {
                    nombre: {
                        type: Type.STRING,
                        description: "El nombre de la posible afección (ej. 'Acné vulgar', 'Dermatitis atópica')."
                    },
                    probabilidad: {
                        type: Type.STRING,
                        enum: ["Alta", "Media", "Baja"],
                        description: "Una estimación cualitativa de la probabilidad."
                    },
                    descripcion: {
                        type: Type.STRING,
                        description: "Una breve descripción de la afección."
                    },
                    tratamientosSugeridos: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING },
                        description: "Tratamientos comunes y medidas de autocuidado (en términos generales)."
                    },
                    consecuenciasNoTratamiento: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING },
                        description: "Posibles consecuencias si la afección no se trata."
                    }
                },
                required: ["nombre", "probabilidad", "descripcion", "tratamientosSugeridos", "consecuenciasNoTratamiento"]
            }
        },
        error: {
            type: Type.STRING,
            description: "Un mensaje de error si el análisis falla o la imagen no es válida."
        }
    }
};


export const analyzeSkinImage = async (imageBase64: string, mimeType: string, symptoms: string): Promise<AnalysisResult> => {
    try {
        let prompt = `
Eres un asistente dermatológico de IA llamado DermaIA. Tu propósito es proporcionar un análisis orientativo y educativo sobre afecciones de la piel basado en una imagen y los síntomas descritos por el usuario. NO ERES UN SUSTITUTO DE UN MÉDICO PROFESIONAL.

Analiza la siguiente imagen de la piel y proporciona una evaluación. Responde SIEMPRE en formato JSON estructurado.

El JSON debe contener una clave "analisis" que es un array de objetos. Cada objeto representa una posible afección y debe tener las claves definidas en el schema.`;

        if (symptoms && symptoms.trim() !== '') {
            prompt += `\n\nAdemás de la imagen, es crucial que consideres los siguientes síntomas descritos por el usuario para refinar tu análisis: "${symptoms}". Utiliza esta información para un diagnóstico más certero.`;
        }

        prompt += `\n\nSi la imagen no es clara, está vacía, o no parece ser de piel humana, devuelve un JSON con una clave "error" y un mensaje explicativo claro para el usuario.`;

        const imagePart = {
            inlineData: {
                data: imageBase64,
                mimeType,
            },
        };

        const textPart = {
            text: prompt,
        };

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: { parts: [imagePart, textPart] },
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
                temperature: 0.2
            }
        });
        
        const jsonText = response.text.trim();
        const parsedResult: AnalysisResult = JSON.parse(jsonText);

        if (parsedResult.error) {
            console.warn("La IA devolvió un error de análisis:", parsedResult.error);
        }
        
        return parsedResult;

    } catch (error) {
        console.error("Error al llamar a la API de Gemini:", error);
        return {
            error: "No se pudo comunicar con el servicio de IA. Por favor, verifique su conexión o intente más tarde."
        };
    }
};
