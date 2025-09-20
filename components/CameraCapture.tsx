import React, { useRef, useEffect, useState } from 'react';

interface CameraCaptureProps {
    onCapture: (dataUri: string) => void;
    onCancel: () => void;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({ onCapture, onCancel }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [error, setError] = useState<string | null>(null);
    const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');

    useEffect(() => {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            setError("Tu navegador no soporta el acceso a la cámara.");
            return;
        }

        let currentStream: MediaStream;

        const startCamera = async () => {
            setError(null);
            try {
                const mediaStream = await navigator.mediaDevices.getUserMedia({ 
                    video: { facingMode: facingMode } 
                });
                currentStream = mediaStream;
                if (videoRef.current) {
                    videoRef.current.srcObject = mediaStream;
                }
            } catch (err) {
                console.error("Error al acceder a la cámara:", err);
                setError(`No se pudo acceder a la cámara ${facingMode === 'environment' ? 'trasera' : 'frontal'}. Por favor, verifica los permisos.`);
            }
        };

        startCamera();

        return () => {
            if (currentStream) {
                currentStream.getTracks().forEach(track => track.stop());
            }
        };
    }, [facingMode]);

    const handleCapture = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const context = canvas.getContext('2d');
            if (context) {
                context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
                const dataUri = canvas.toDataURL('image/jpeg');
                onCapture(dataUri);
            }
        }
    };

    const toggleCamera = () => {
        setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
    };

    if (error) {
        return (
            <div className="bg-white p-6 rounded-2xl shadow-md text-center">
                <p className="text-red-500 font-semibold">{error}</p>
                <button 
                    onClick={toggleCamera} 
                    className="mt-4 mr-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                    Probar otra cámara
                </button>
                <button 
                    onClick={onCancel} 
                    className="mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                >
                    Volver
                </button>
            </div>
        );
    }

    return (
        <div className="w-full max-w-2xl mx-auto bg-black rounded-2xl shadow-lg p-4">
            <video ref={videoRef} autoPlay playsInline className="w-full h-auto rounded-lg"></video>
            <canvas ref={canvasRef} className="hidden"></canvas>
            <div className="flex justify-between items-center mt-4 px-2">
                <button 
                    onClick={onCancel} 
                    className="bg-gray-700 bg-opacity-50 hover:bg-opacity-75 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
                >
                    Cancelar
                </button>
                <button 
                    onClick={handleCapture} 
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-full w-20 h-20 flex items-center justify-center text-3xl border-4 border-white shadow-lg transition transform hover:scale-110"
                    aria-label="Tomar foto"
                >
                    <i className="fas fa-camera"></i>
                </button>
                <button 
                    onClick={toggleCamera} 
                    className="bg-gray-700 bg-opacity-50 hover:bg-opacity-75 text-white font-bold rounded-full w-14 h-14 flex items-center justify-center text-xl transition transform hover:scale-110"
                    title="Cambiar cámara"
                    aria-label="Cambiar cámara"
                >
                    <i className="fas fa-sync-alt"></i>
                </button>
            </div>
        </div>
    );
};

export default CameraCapture;
