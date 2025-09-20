
import React, { useState, useEffect } from 'react';

const messages = [
    "Analizando los detalles de la imagen...",
    "La IA está identificando patrones...",
    "Consultando la base de conocimientos dermatológicos...",
    "Casi listo, generando el informe...",
];

const Spinner: React.FC = () => {
    const [messageIndex, setMessageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
        }, 2500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
            <h2 className="text-xl font-semibold text-gray-700 mt-6">Analizando...</h2>
            <p className="text-gray-500 mt-2">{messages[messageIndex]}</p>
        </div>
    );
};

export default Spinner;
