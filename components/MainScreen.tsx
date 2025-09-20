
import React, { useState, useRef, useCallback } from 'react';
import CameraCapture from './CameraCapture';

interface MainScreenProps {
    onAnalyze: (imageBase64: string, mimeType: string) => void;
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

    const handleImageSelect = (file: File) => {
        setImageFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
        setCameraOpen(false);
    };

    const handleCapture = (dataUri: string) => {
        setImagePreview(dataUri);
        // Convert data URI to File object
        fetch(dataUri)
            .then(res => res.blob())
            .then(blob => {
                const file = new File([blob], "capture.jpg", { type: "image/jpeg" });
                setImageFile(file);
            });
        setCameraOpen(false);
    };

    const handleAnalyzeClick = () => {
        if (imagePreview && imageFile) {
            // remove the data:image/jpeg;base64, part
            const base64String = imagePreview.split(',')[1];
            onAnalyze(base64String, imageFile.type);
        }
    };
    
    const clearSelection = () => {
        setImagePreview(null);
        setImageFile(null);
    };

    if (isCameraOpen) {
        return <CameraCapture onCapture={handleCapture} onCancel={() => setCameraOpen(false)} />;
    }

    return (
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-md max-w-2xl mx-auto">
            {!imagePreview ? (
                <>
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Comienza tu Análisis</h2>
                    <p className="text-center text-gray-500 mb-8">Elige una opción para proporcionar una imagen de tu piel.</p>
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
            ) : (
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Imagen Seleccionada</h2>
                    <div className="relative inline-block mb-6">
                         <img src={imagePreview} alt="Vista previa de la piel" className="max-w-full max-h-80 rounded-lg shadow-lg" />
                         <button onClick={clearSelection} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-8 w-8 flex items-center justify-center shadow-md hover:bg-red-600 transition">
                            <i className="fas fa-times"></i>
                         </button>
                    </div>
                    <button
                        onClick={handleAnalyzeClick}
                        className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-300 ease-in-out transform hover:scale-105"
                    >
                        <i className="fas fa-microscope mr-2"></i>
                        Analizar Ahora
                    </button>
                </div>
            )}
             {error && <p className="text-red-500 text-center mt-4 font-semibold">{error}</p>}
        </div>
    );
};

export default MainScreen;
