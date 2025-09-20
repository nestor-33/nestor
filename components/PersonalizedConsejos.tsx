
import React, { useState } from 'react';

// This is a simulated component. In a real app, this would call the Gemini API chat.
const PersonalizedConsejos: React.FC = () => {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleAsk = () => {
        if (!question.trim()) return;
        setIsLoading(true);
        setAnswer('');
        // Simulate API call
        setTimeout(() => {
            setAnswer(`Respuesta simulada para: "${question}". Como IA, te recomiendo mantener una rutina de limpieza constante y consultar a tu dermatólogo para obtener consejos adaptados específicamente a tu tipo de piel.`);
            setIsLoading(false);
            setQuestion('');
        }, 1500);
    };

    return (
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <i className="fas fa-comments mr-3 text-green-500"></i>
                Consejos Personalizados
            </h2>
            <p className="text-gray-500 mb-4">Haz una pregunta sobre el cuidado de la piel a nuestra IA.</p>
            <div className="flex gap-2">
                <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Ej: ¿Cómo puedo reducir los poros?"
                    className="flex-grow p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    disabled={isLoading}
                />
                <button
                    onClick={handleAsk}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-5 rounded-lg transition disabled:bg-gray-400"
                    disabled={isLoading}
                >
                    {isLoading ? <i className="fas fa-spinner fa-spin"></i> : 'Preguntar'}
                </button>
            </div>
            {answer && (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="font-semibold text-green-800">Respuesta de la IA:</p>
                    <p className="text-green-700">{answer}</p>
                </div>
            )}
        </div>
    );
};

export default PersonalizedConsejos;
