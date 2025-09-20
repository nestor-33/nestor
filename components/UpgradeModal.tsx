
import React from 'react';

interface UpgradeModalProps {
    onClose: () => void;
    onUpgrade: () => void;
}

const UpgradeModal: React.FC<UpgradeModalProps> = ({ onClose, onUpgrade }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300 scale-95 animate-modal-pop">
                <div className="p-8 text-center">
                     <div className="text-yellow-400 mb-4">
                        <i className="fas fa-star fa-3x"></i>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-3">Obtén DermaIA Premium</h2>
                    <p className="text-gray-600 mb-6">Desbloquea todo el potencial de tu asistente dermatológico.</p>

                    <ul className="space-y-4 text-left text-gray-700 mb-8">
                        <li className="flex items-center">
                            <i className="fas fa-check-circle text-green-500 mr-3"></i>
                            <strong>Seguimiento de Evolución:</strong> Compara fotos.
                        </li>
                        <li className="flex items-center">
                            <i className="fas fa-check-circle text-green-500 mr-3"></i>
                            <strong>Consejos Personalizados:</strong> Chat con la IA.
                        </li>
                         <li className="flex items-center">
                            <i className="fas fa-check-circle text-green-500 mr-3"></i>
                            <strong>Recordatorios de Tratamiento:</strong> No olvides tu rutina.
                        </li>
                        <li className="flex items-center">
                            <i className="fas fa-check-circle text-green-500 mr-3"></i>
                            <strong>Sin Anuncios:</strong> Una experiencia sin interrupciones.
                        </li>
                    </ul>

                    <button
                        onClick={onUpgrade}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg text-lg transition duration-300 transform hover:scale-105 mb-4"
                    >
                        Actualizar por $9.99/mes
                    </button>
                     <button
                        onClick={onClose}
                        className="w-full text-gray-500 hover:text-gray-700 font-semibold"
                    >
                        Quizás más tarde
                    </button>
                </div>
            </div>
             <style>{`
                @keyframes modal-pop {
                    0% { transform: scale(0.95); opacity: 0; }
                    100% { transform: scale(1); opacity: 1; }
                }
                .animate-modal-pop { animation: modal-pop 0.3s ease-out forwards; }
            `}</style>
        </div>
    );
};

export default UpgradeModal;
