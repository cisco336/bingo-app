// src/types/types.ts

// Define la interfaz para el estado del juego que se guardará en localStorage.
export interface GameState {
  allPossibleNumbers: number[];
  calledNumbers: number[]; // Se guarda como array en localStorage
  lastCalledNumber: string | null;
  lastFiveCalledNumbers: string[];
  activeGameMode: GameMode; // ¡Nuevo!: Modo de juego activo
}

// Define los tipos de modalidades de juego.
export type GameMode =
  | "B_AND_O"
  | "COLUMN_B"
  | "COLUMN_G"
  | "COLUMN_I"
  | "COLUMN_N"
  | "COLUMN_O"
  | "CONSONANTS_ONLY"
  | "DIAGONAL_X"
  | "FOUR_CORNERS"
  | "FULL_CARD"
  | "TRADITIONAL_LINE"
  | "U_PATTERN"
  | "VOWELS_ONLY";

// Define la interfaz para las opciones de modalidad de juego que se mostrarán en el selector.
export interface GameModeOption {
  id: GameMode;
  name: string;
  description: string;
  // patternVisual?: string; // Ya no se usa directamente en App.tsx para el render
}

// Define la interfaz para las props del componente TablaBingo.
export interface TablaBingoProps {
  calledNumbers: Set<number>;
  activeGameMode: GameMode; // ¡Nuevo!: Modo de juego activo para posible resaltado futuro
  isBoardHorizontal: boolean; // Nuevo!: Para controlar la orientación del tablero
}

// Define la interfaz para las props del componente ControlPanel.
export interface ControlPanelProps {
  lastCalledNumber: string | null;
  remainingNumbersCount: number;
  onCallNextNumber: () => void;
  lastFiveCalledNumbers: string[];
  activeGameMode: GameMode;
  onGameModeChange: (mode: GameMode) => void;
  gameModes: GameModeOption[];
  onOpenOptionsMenu: () => void; // ¡Nuevo!: Para abrir el menú de opciones
  onToggleBoardOrientation: () => void; // ¡Nuevo!: Para alternar la orientación del tablero
  isBoardHorizontal: boolean; // ¡Nuevo!: Estado actual de la orientación del tablero
}

// Define la interfaz para un cartón de bingo generado
export interface BingoCard {
  id: number;
  columns: {
    B: number[];
    I: number[];
    N: number[];
    G: number[];
    O: number[];
  };
}

// Define la interfaz para las props del componente OptionsMenu.
export interface OptionsMenuProps {
  onClose: () => void;
  onResetGame: () => void;
  onGenerateCards: (numCards: number) => BingoCard[];
  generatedCards: BingoCard[] | null;
}
