import React, { useState, useRef } from 'react';
import CameraCapture from './CameraCapture';

interface MainScreenProps {
    onAnalyze: (imageBase64: string, mimeType: string, symptoms: string) => void;
    error: string | null;
}

const ImageUploader: React.FC<{ onImageSelect: (file: File) => void }> = ({ onImageSelect }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            onImageSelect(event.target.files[0]);
        }
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/png, image/jpeg, image/webp"
            />
            <button
                onClick={handleClick}
                className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 text-gray-700 font-semibold py-4 px-6 rounded-xl transition duration-300"
            >
                <i className="fas fa-upload text-xl text-blue-500"></i>
                Subir Imagen
            </button>
        </div>
    );
};


const MainScreen: React.FC<MainScreenProps> = ({ onAnalyze, error }) => {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [isCameraOpen, setCameraOpen] = useState(false);
    const [symptoms, setSymptoms] = useState('');
    const [step, setStep] = useState<'select' | 'symptoms'>('select');

    const handleImageSelect = (file: File) => {
        setImageFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result as string);
            setStep('symptoms');
        };
        reader.readAsDataURL(file);
        setCameraOpen(false);
    };

    const handleCapture = (dataUri: string) => {
        setImagePreview(dataUri);
        fetch(dataUri)
            .then(res => res.blob())
            .then(blob => {
                const file = new File([blob], "capture.jpg", { type: "image/jpeg" });
                setImageFile(file);
            });
        setStep('symptoms');
        setCameraOpen(false);
    };

    const handleAnalyzeClick = () => {
        if (imagePreview && imageFile) {
            const base64String = imagePreview.split(',')[1];
            onAnalyze(base64String, imageFile.type, symptoms);
        }
    };
    
    const clearSelection = () => {
        setImagePreview(null);
        setImageFile(null);
        setSymptoms('');
        setStep('select');
    };

    if (isCameraOpen) {
        return <CameraCapture onCapture={handleCapture} onCancel={() => setCameraOpen(false)} />;
    }

    return (
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-md max-w-2xl mx-auto">
            {step === 'select' && (
                <>
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Paso 1: Proporciona una Imagen</h2>
                    <p className="text-center text-gray-500 mb-8">Elige una opción para analizar tu piel.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ImageUploader onImageSelect={handleImageSelect} />
                        <button
                            onClick={() => setCameraOpen(true)}
                            className="w-full flex items-center justify-center gap-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-6 rounded-xl transition duration-300"
                        >
                            <i className="fas fa-camera text-xl"></i>
                            Tomar Foto
                        </button>
                    </div>
                </>
            )}

            {step === 'symptoms' && imagePreview && (
                 <div className="animate-fade-in">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Paso 2: Describe tus Síntomas</h2>
                    <p className="text-center text-gray-500 mb-6">Añade información adicional para un análisis más preciso.</p>
                    
                    <div className="mb-6 text-center">
                        <img src={imagePreview} alt="Vista previa de la piel" className="max-w-full max-h-64 mx-auto rounded-lg shadow-lg" />
                    </div>

                    <div className="mb-6 text-left">
                        <label htmlFor="symptoms" className="block text-md font-semibold text-gray-700 mb-2">
                            <i className="fas fa-edit mr-2 text-gray-500"></i>
                            Síntomas Adicionales (Opcional)
                        </label>
                        <textarea
                            id="symptoms"
                            value={symptoms}
                            onChange={(e) => setSymptoms(e.target.value)}
                            rows={4}
                            placeholder="Ej: Picazón, ardor, la mancha ha crecido con el tiempo..."
                            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition bg-gray-50"
                        ></textarea>
                        <p className="text-xs text-gray-400 mt-1">Describir tus síntomas ayuda a la IA a dar un resultado más preciso.</p>
                    </div>

                    <div className="flex flex-col-reverse sm:flex-row gap-4">
                        <button
                            onClick={clearSelection}
                            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg transition duration-300"
                        >
                            <i className="fas fa-arrow-left mr-2"></i>
                            Volver
                        </button>
                        <button
                            onClick={handleAnalyzeClick}
                            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-300 ease-in-out transform hover:scale-105"
                        >
                            <i className="fas fa-microscope mr-2"></i>
                            Analizar Ahora
                        </button>
                    </div>
                 </div>
            )}
            
            {error && <p className="text-red-500 text-center mt-4 font-semibold">{error}</p>}
            
            <style>{`
                @keyframes fade-in {
                    0% { opacity: 0; transform: translateY(10px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
            `}</style>
        </div>
    );
};

export default MainScreen;