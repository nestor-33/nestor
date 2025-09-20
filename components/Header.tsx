
import React from 'react';
import { User } from '../types';

interface HeaderProps {
    user: User;
    onLogout: () => void;
    onOpenUpgradeModal: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout, onOpenUpgradeModal }) => {
    return (
        <header className="bg-white shadow-md">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
                <div className="flex items-center gap-2">
                     <i className="fas fa-user-doctor text-2xl text-blue-500"></i>
                    <h1 className="text-xl font-bold text-gray-800">DermaIA</h1>
                </div>
                <div className="flex items-center gap-4">
                    {user.isPremium ? (
                        <span className="text-sm font-semibold bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full">
                           <i className="fas fa-star mr-1"></i> Premium
                        </span>
                    ) : (
                        <button 
                            onClick={onOpenUpgradeModal}
                            className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold text-sm py-1 px-3 rounded-full transition duration-300"
                        >
                            <i className="fas fa-arrow-up mr-1"></i>
                            Upgrade
                        </button>
                    )}
                    <button onClick={onLogout} className="text-gray-500 hover:text-red-500 transition duration-300">
                        <i className="fas fa-sign-out-alt text-xl"></i>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
