
import React from 'react';
import { AnalysisResult, User } from '../types';
import Disclaimer from './Disclaimer';
import AdBanner from './AdBanner';
import HistoryTracker from './HistoryTracker';
import PersonalizedConsejos from './PersonalizedConsejos';

interface AnalysisViewProps {
    result: AnalysisResult;
    history: AnalysisResult[];
    user: User | null;
    onNewAnalysis: () => void;
    onOpenUpgradeModal: () => void;
}

const AnalysisView: React.FC<AnalysisViewProps> = ({ result, history, user, onNewAnalysis, onOpenUpgradeModal }) => {
    if (result.error) {
        return (
            <div className="bg-white p-6 rounded-2xl shadow-md text-center">
                <div className="text-red-500 mb-4"><i className="fas fa-exclamation-triangle fa-3x"></i></div>
                <h2 className="text-2xl font-bold text-red-700 mb-2">Error en el Análisis</h2>
                <p className="text-gray-600 mb-6">{result.error}</p>
                <button
                    onClick={onNewAnalysis}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition"
                >
                    Intentar de Nuevo
                </button>
            </div>
        );
    }
    
    if (!result.analisis || result.analisis.length === 0) {
        return (
            <div className="bg-white p-6 rounded-2xl shadow-md text-center">
                 <div className="text-yellow-500 mb-4"><i className="fas fa-search-minus fa-3x"></i></div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">No se Detectaron Afecciones</h2>
                <p className="text-gray-600 mb-6">La IA no pudo identificar condiciones específicas en la imagen. Intenta con una foto más clara.</p>
                <button
                    onClick={onNewAnalysis}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition"
                >
                    Realizar Nuevo Análisis
                </button>
            </div>
        );
    }


    const getProbabilityBadgeClass = (prob: string) => {
        switch (prob) {
            case 'Alta': return 'bg-red-100 text-red-800';
            case 'Media': return 'bg-yellow-100 text-yellow-800';
            case 'Baja': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="space-y-8">
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-md">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Resultados del Análisis</h1>
                <Disclaimer />

                {result.analisis.map((condition, index) => (
                    <div key={index} className="mb-8 p-6 border border-gray-200 rounded-xl bg-gray-50">
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4">
                            <h2 className="text-2xl font-semibold text-blue-600">{condition.nombre}</h2>
                            <span className={`text-sm font-medium px-3 py-1 rounded-full mt-2 sm:mt-0 ${getProbabilityBadgeClass(condition.probabilidad)}`}>
                                Probabilidad {condition.probabilidad}
                            </span>
                        </div>
                        <p className="text-gray-600 mb-6">{condition.descripcion}</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center"><i className="fas fa-pills mr-2 text-green-500"></i>Tratamientos Sugeridos</h3>
                                <ul className="list-disc list-inside space-y-2 text-gray-600">
                                    {condition.tratamientosSugeridos.map((t, i) => <li key={i}>{t}</li>)}
                                </ul>
                            </div>
                             <div>
                                <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center"><i className="fas fa-exclamation-circle mr-2 text-orange-500"></i>Posibles Consecuencias</h3>
                                <ul className="list-disc list-inside space-y-2 text-gray-600">
                                    {condition.consecuenciasNoTratamiento.map((c, i) => <li key={i}>{c}</li>)}
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="text-center mt-8">
                    <button
                        onClick={onNewAnalysis}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition"
                    >
                        Realizar Nuevo Análisis
                    </button>
                </div>
            </div>

            {/* Premium Features */}
            {user?.isPremium ? (
                <>
                    <HistoryTracker history={history} />
                    <PersonalizedConsejos />
                </>
            ) : (
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-8 rounded-2xl shadow-lg text-white text-center">
                    <h2 className="text-3xl font-bold mb-3">Desbloquea Funciones Premium</h2>
                    <p className="mb-6">Obtén seguimiento de evolución, consejos personalizados y elimina los anuncios con DermaIA Premium.</p>
                    <button onClick={onOpenUpgradeModal} className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full text-lg transition transform hover:scale-105 shadow-md">
                        ¡Actualizar Ahora!
                    </button>
                </div>
            )}


            {!user?.isPremium && <AdBanner />}
        </div>
    );
};

export default AnalysisView;
