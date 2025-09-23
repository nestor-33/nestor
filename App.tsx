
import React, { useState, useCallback } from 'react';
import { AnalysisResult, User, AppState, View } from './types';
import LoginScreen from './components/LoginScreen';
import MainScreen from './components/MainScreen';
import AnalysisView from './components/AnalysisView';
import Header from './components/Header';
import UpgradeModal from './components/UpgradeModal';
import { analyzeSkinImage } from './services/geminiService';
import Spinner from './components/Spinner';

const App: React.FC = () => {
    const [appState, setAppState] = useState<AppState>({
        user: null,
        currentView: View.LOGIN,
        currentAnalysis: null,
        analysisHistory: [],
        isLoading: false,
        error: null,
        isUpgradeModalOpen: false,
    });

    const handleLogin = () => {
        setAppState(prev => ({ ...prev, user: { isPremium: false }, currentView: View.MAIN }));
    };

    const handleLogout = () => {
        setAppState({
            user: null,
            currentView: View.LOGIN,
            currentAnalysis: null,
            analysisHistory: [],
            isLoading: false,
            error: null,
            isUpgradeModalOpen: false,
        });
    };
    
    const handleUpgrade = () => {
        setAppState(prev => ({
            ...prev,
            user: prev.user ? { ...prev.user, isPremium: true } : null,
            isUpgradeModalOpen: false
        }));
    };

    const openUpgradeModal = () => setAppState(prev => ({ ...prev, isUpgradeModalOpen: true }));
    const closeUpgradeModal = () => setAppState(prev => ({ ...prev, isUpgradeModalOpen: false }));
    
    const startNewAnalysis = () => {
        setAppState(prev => ({ ...prev, currentView: View.MAIN, currentAnalysis: null, error: null }));
    };

    const handleAnalysis = useCallback(async (imageBase64: string, mimeType: string, symptoms: string) => {
        setAppState(prev => ({ ...prev, isLoading: true, error: null }));
        try {
            const result = await analyzeSkinImage(imageBase64, mimeType, symptoms);
            setAppState(prev => ({
                ...prev,
                isLoading: false,
                currentAnalysis: result,
                analysisHistory: [...prev.analysisHistory, result],
                currentView: View.ANALYSIS,
            }));
        } catch (err) {
            console.error(err);
            setAppState(prev => ({
                ...prev,
                isLoading: false,
                error: 'Hubo un error al analizar la imagen. Por favor, intente de nuevo.',
            }));
        }
    }, []);

    const renderContent = () => {
        if (appState.isLoading) {
            return <Spinner />;
        }
        
        switch (appState.currentView) {
            case View.LOGIN:
                return <LoginScreen onLogin={handleLogin} />;
            case View.MAIN:
                return <MainScreen onAnalyze={handleAnalysis} error={appState.error} />;
            case View.ANALYSIS:
                if (appState.currentAnalysis) {
                    return (
                        <AnalysisView
                            result={appState.currentAnalysis}
                            history={appState.analysisHistory}
                            user={appState.user}
                            onNewAnalysis={startNewAnalysis}
                            onOpenUpgradeModal={openUpgradeModal}
                        />
                    );
                }
                return <MainScreen onAnalyze={handleAnalysis} error={appState.error} />; // Fallback
            default:
                return <LoginScreen onLogin={handleLogin} />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 font-sans antialiased">
            {appState.user && <Header user={appState.user} onLogout={handleLogout} onOpenUpgradeModal={openUpgradeModal} />}
            <main className="p-4 sm:p-6 max-w-4xl mx-auto">
                {renderContent()}
            </main>
            {appState.isUpgradeModalOpen && <UpgradeModal onClose={closeUpgradeModal} onUpgrade={handleUpgrade} />}
        </div>
    );
};

export default App;
