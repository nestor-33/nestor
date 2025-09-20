
import React from 'react';
import { AnalysisResult } from '../types';

interface HistoryTrackerProps {
    history: AnalysisResult[];
}

const HistoryTracker: React.FC<HistoryTrackerProps> = ({ history }) => {
    return (
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <i className="fas fa-history mr-3 text-blue-500"></i>
                Historial de Análisis
            </h2>
            {history.length > 1 ? (
                 <div className="space-y-4">
                    {history.slice(0, -1).reverse().map((item, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg border">
                            <p className="font-semibold text-gray-700">Análisis Anterior #{history.length - 1 - index}</p>
                            <p className="text-sm text-gray-500">
                                {item.analisis && item.analisis.length > 0
                                    ? `Principal hallazgo: ${item.analisis[0].nombre}`
                                    : 'Sin hallazgos significativos.'}
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500">Este es tu primer análisis. Futuros análisis aparecerán aquí para que puedas comparar tu evolución.</p>
            )}
        </div>
    );
};

export default HistoryTracker;
