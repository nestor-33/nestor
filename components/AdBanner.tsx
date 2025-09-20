
import React from 'react';

const AdBanner: React.FC = () => {
    return (
        <div className="bg-gray-200 p-4 rounded-lg text-center mt-8">
            <p className="text-sm text-gray-600 font-semibold">Anuncio</p>
            <p className="text-gray-800">
                ¡Descubre los mejores productos para el cuidado de la piel!
            </p>
            <a href="#" className="text-blue-500 hover:underline text-sm">
                Visitar tienda
            </a>
        </div>
    );
};

export default AdBanner;
