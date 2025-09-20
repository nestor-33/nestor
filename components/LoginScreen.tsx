
import React from 'react';

interface LoginScreenProps {
    onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
            <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
                <div className="text-blue-500 mb-4">
                    <i className="fas fa-user-doctor fa-4x"></i>
                </div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">DermaIA</h1>
                <p className="text-gray-600 mb-6">Tu asistente dermatológico con IA</p>
                <p className="text-sm text-gray-500 mb-8">
                    Sube una foto de tu piel y obtén un análisis orientativo al instante.
                </p>
                <button
                    onClick={onLogin}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                >
                    Comenzar Análisis
                </button>
                 <div className="mt-6 text-xs text-gray-400">
                    <p>
                        <i className="fas fa-shield-alt mr-1"></i>
                        Esta es una demostración. No se requiere inicio de sesión real.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginScreen;
