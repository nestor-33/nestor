
export interface User {
    isPremium: boolean;
}

export interface AnalysisCondition {
    nombre: string;
    probabilidad: 'Alta' | 'Media' | 'Baja';
    descripcion: string;
    tratamientosSugeridos: string[];
    consecuenciasNoTratamiento: string[];
}

export interface AnalysisResult {
    analisis?: AnalysisCondition[];
    error?: string;
}

export enum View {
    LOGIN,
    MAIN,
    ANALYSIS,
}

export interface AppState {
    user: User | null;
    currentView: View;
    currentAnalysis: AnalysisResult | null;
    analysisHistory: AnalysisResult[];
    isLoading: boolean;
    error: string | null;
    isUpgradeModalOpen: boolean;
}
