
import React from 'react';

const Disclaimer: React.FC = () => {
    return (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 p-4 rounded-r-lg mb-8" role="alert">
            <div className="flex">
                <div className="py-1"><i className="fas fa-exclamation-triangle text-yellow-500 mr-4 text-2xl"></i></div>
                <div>
                    <p className="font-bold">Aviso Importante</p>
                    <p className="text-sm">
                        DermaIA proporciona una orientación educativa y no sustituye un diagnóstico médico profesional. 
                        Los resultados son generados por una IA y deben ser considerados como informativos. 
                        Consulte siempre a un dermatólogo para obtener un diagnóstico y tratamiento precisos.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Disclaimer;
