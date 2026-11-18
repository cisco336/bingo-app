// src/types/types.ts

// Define la interfaz para el estado del juego que se guardará en localStorage.
export interface GameState {
  allPossibleNumbers: number[];
  calledNumbers: number[]; // Se guarda como array en localStorage
  lastCalledNumber: string | null;
  lastFiveCalledNumbers: string[];
}

// Define la interfaz para las props del componente TablaBingo.
export interface TablaBingoProps {
  calledNumbers: Set<number>;
}

// Define la interfaz para las props del componente ControlPanel.
export interface ControlPanelProps {
  lastCalledNumber: string | null;
  remainingNumbersCount: number;
  onCallNextNumber: () => void;
  lastFiveCalledNumbers: string[];
}
