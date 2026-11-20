import { useState, useEffect, useCallback } from 'react';
import TablaBingo from './components/TablaBingo';
import ControlPanel from './components/ControlPanel';
import PlayerCardPatternVisual from './components/PlayerCardPatternVisual';
import OptionsMenu from './components/OptionsMenu';
import { GameState, GameMode, GameModeOption, BingoCard } from '@/types/types';
import styles from './App.module.css';

// Nombre de la clave para almacenar el estado del juego en localStorage.
const LOCAL_STORAGE_KEY = 'bingoGameState';

// Definición de las modalidades de juego disponibles
const GAME_MODES: GameModeOption[] = [
  {
    id: 'TRADITIONAL_LINE',
    name: 'Línea Tradicional',
    description: 'Cualquier línea horizontal, vertical o diagonal en el cartón del jugador.',
  },
  {
    id: 'FOUR_CORNERS',
    name: 'Cuatro Esquinas',
    description: 'Marcar las cuatro casillas de las esquinas del cartón.',
  },
  {
    id: 'COLUMN_B',
    name: 'Columna "B" Completa',
    description: 'Completar todos los números de la columna "B" del cartón.',
  },
  {
    id: 'COLUMN_I',
    name: 'Columna "I" Completa',
    description: 'Completar todos los números de la columna "I" del cartón.',
  },
  {
    id: 'COLUMN_N',
    name: 'Columna "N" Completa',
    description: 'Completar todos los números de la columna "N" del cartón.',
  },
  {
    id: 'COLUMN_G',
    name: 'Columna "G" Completa',
    description: 'Completar todos los números de la columna "G" del cartón.',
  },
  {
    id: 'COLUMN_O',
    name: 'Columna "O" Completa',
    description: 'Completar todos los números de la columna "O" del cartón.',
  },
  {
    id: 'DIAGONAL_X',
    name: 'Diagonal "X"',
    description: 'Marcar los números que forman una "X" en el cartón.',
  },
  {
    id: 'VOWELS_ONLY',
    name: 'Modo "Vocales" (I, O)',
    description: 'Completar todas las casillas en las columnas I y O del cartón.',
  },
  {
    id: 'CONSONANTS_ONLY',
    name: 'Modo "Consonantes" (B, N, G)',
    description: 'Completar todas las casillas en las columnas B, N y G del cartón.',
  },
  {
    id: 'B_AND_O',
    name: 'Modo "B" y "O"',
    description: 'Completar todas las casillas en las columnas B y O del cartón.',
  },
  {
    id: 'U_PATTERN',
    name: 'Patrón de "U"',
    description: 'Marcar todas las casillas de los bordes del cartón, excepto la fila superior central (BINGO).',
  },
  {
    id: 'FULL_CARD',
    name: 'Cartón Lleno (Blackout)',
    description: 'Marcar todos los números del cartón del jugador.',
  },
];


// Función auxiliar para generar y barajar los números del bingo (1 al 75).
const generateBingoNumbers = (): number[] => {
  const numbers = Array.from({ length: 75 }, (_, i) => i + 1);
  // Algoritmo de Fisher-Yates para barajar los números aleatoriamente.
  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }
  return numbers;
};

// Función auxiliar para obtener la letra de bingo para un número dado.
const getBingoLetter = (number: number): string => {
  if (number >= 1 && number <= 15) return `B-${number}`;
  if (number >= 16 && number <= 30) return `I-${number}`;
  if (number >= 31 && number <= 45) return `N-${number}`;
  if (number >= 46 && number <= 60) return `G-${number}`;
  if (number >= 61 && number <= 75) return `O-${number}`;
  return String(number); // En caso de un número fuera del rango, solo devuelve el número.
};

// Función para generar un número aleatorio sin repetir de un rango dado
const getRandomUniqueNumbers = (min: number, max: number, count: number): number[] => {
  const numbers = new Set<number>();
  while (numbers.size < count) {
    numbers.add(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return Array.from(numbers).sort((a, b) => a - b);
};

// Función para generar un solo cartón de bingo único
const generateSingleBingoCard = (id: number): BingoCard => {
  const card: BingoCard = {
    id,
    columns: {
      B: getRandomUniqueNumbers(1, 15, 5),
      I: getRandomUniqueNumbers(16, 30, 5),
      N: getRandomUniqueNumbers(31, 45, 5),
      G: getRandomUniqueNumbers(46, 60, 5),
      O: getRandomUniqueNumbers(61, 75, 5),
    },
  };
  return card;
};


function App() {
  const bingoSound = new Audio('/sounds/bingo-ding.mp3');

  const playBingoSound = useCallback(() => {
    if (bingoSound) {
      bingoSound.currentTime = 0;
      bingoSound.play().catch(e => console.error("Error al reproducir el sonido:", e));
    }
  }, [bingoSound]);

  const initializeState = (): { allPossibleNumbers: number[]; calledNumbers: Set<number>; lastCalledNumber: string | null; lastFiveCalledNumbers: string[]; activeGameMode: GameMode } => {
    try {
      const savedState = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedState) {
        const parsedState: GameState = JSON.parse(savedState);
        return {
          allPossibleNumbers: parsedState.allPossibleNumbers || generateBingoNumbers(),
          calledNumbers: new Set(parsedState.calledNumbers || []),
          lastCalledNumber: parsedState.lastCalledNumber || null,
          lastFiveCalledNumbers: parsedState.lastFiveCalledNumbers || [],
          activeGameMode: parsedState.activeGameMode || 'TRADITIONAL_LINE',
        };
      }
    } catch (e) {
      console.error("Error al cargar el estado desde localStorage:", e);
    }
    return {
      allPossibleNumbers: generateBingoNumbers(),
      calledNumbers: new Set<number>(),
      lastCalledNumber: null,
      lastFiveCalledNumbers: [],
      activeGameMode: 'TRADITIONAL_LINE',
    };
  };

  const initialState = initializeState();

  const [allPossibleNumbers, setAllPossibleNumbers] = useState<number[]>(initialState.allPossibleNumbers);
  const [calledNumbers, setCalledNumbers] = useState<Set<number>>(initialState.calledNumbers);
  const [lastCalledNumber, setLastCalledNumber] = useState<string | null>(initialState.lastCalledNumber);
  const [lastFiveCalledNumbers, setLastFiveCalledNumbers] = useState<string[]>(initialState.lastFiveCalledNumbers);
  const [activeGameMode, setActiveGameMode] = useState<GameMode>(initialState.activeGameMode);
  const [showOptionsMenu, setShowOptionsMenu] = useState<boolean>(false);
  const [generatedCards, setGeneratedCards] = useState<BingoCard[] | null>(null);
  const [isBoardHorizontal, setIsBoardHorizontal] = useState<boolean>(false); // Nuevo estado para la orientación del tablero

  const [remainingNumbersCount, setRemainingNumbersCount] = useState<number>(75);

  useEffect(() => {
    setRemainingNumbersCount(75 - calledNumbers.size);
  }, [calledNumbers]);

  useEffect(() => {
    try {
      const stateToSave: GameState = {
        allPossibleNumbers: allPossibleNumbers,
        calledNumbers: Array.from(calledNumbers),
        lastCalledNumber: lastCalledNumber,
        lastFiveCalledNumbers: lastFiveCalledNumbers,
        activeGameMode: activeGameMode,
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (e) {
      console.error("Error al guardar el estado en localStorage:", e);
    }
  }, [allPossibleNumbers, calledNumbers, lastCalledNumber, lastFiveCalledNumbers, activeGameMode]);

  const resetGameAndLocalStorage = useCallback(() => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setAllPossibleNumbers(generateBingoNumbers());
    setCalledNumbers(new Set<number>());
    setLastCalledNumber(null);
    setLastFiveCalledNumbers([]);
    setActiveGameMode('TRADITIONAL_LINE');
    setGeneratedCards(null);
    setIsBoardHorizontal(false); // Resetear también la orientación al reiniciar el juego
    setShowOptionsMenu(false);
  }, []);

  const handleGenerateCards = useCallback((numCards: number) => {
    const cards: BingoCard[] = [];
    for (let i = 1; i <= numCards; i++) {
      cards.push(generateSingleBingoCard(i));
    }
    setGeneratedCards(cards);
    return cards;
  }, []);

  const callNextNumber = useCallback(() => {
    if (allPossibleNumbers.length === 0) {
      alert('¡Todos los números han sido cantados! El juego ha terminado.');
      setLastCalledNumber('FIN');
      return;
    }

    const nextNumber = allPossibleNumbers[0];

    setAllPossibleNumbers(prev => prev.slice(1));
    setCalledNumbers(prev => new Set(prev).add(nextNumber));
    const formattedNumber = getBingoLetter(nextNumber);
    setLastCalledNumber(formattedNumber);
    playBingoSound();
    setLastFiveCalledNumbers(prev => [formattedNumber, ...prev.slice(0, 4)]);

  }, [allPossibleNumbers, calledNumbers, playBingoSound]);

  const handleGameModeChange = useCallback((mode: GameMode) => {
    setActiveGameMode(mode);
  }, []);

  const currentModeOption = GAME_MODES.find(mode => mode.id === activeGameMode);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          Bingo Takali
        </h1>
        <p className={styles.subtitle}>
          ¡A divertirse y a cantar bingo! Proyectado en pantalla grande para tu salón comunal. (Números del 1 al 75)
        </p>
      </header>

      {/* Indicador Visual del Modo de Juego Activo */}
      <div className={styles.gameModeIndicatorContainer}>
        <h2 className={styles.gameModeIndicatorTitle}>
          Modo Actual: <span className={styles.gameModeName}>{currentModeOption?.name || 'Cargando...'}</span>
        </h2>
        <p className={styles.gameModeDescription}>
          {currentModeOption?.description}
        </p>
        <PlayerCardPatternVisual activeGameMode={activeGameMode} />
      </div>


      <main className={styles.mainContent}>
        {/* Panel de Control */}
        <div className={styles.panelContainer}>
          <ControlPanel
            lastCalledNumber={lastCalledNumber}
            remainingNumbersCount={remainingNumbersCount}
            onCallNextNumber={callNextNumber}
            lastFiveCalledNumbers={lastFiveCalledNumbers}
            activeGameMode={activeGameMode}
            onGameModeChange={handleGameModeChange}
            gameModes={GAME_MODES}
            onOpenOptionsMenu={() => setShowOptionsMenu(true)}
            onToggleBoardOrientation={() => setIsBoardHorizontal(prev => !prev)}
            isBoardHorizontal={isBoardHorizontal}
          />
        </div>

        {/* Tabla de Bingo */}
        <div className={styles.bingoBoardContainer}>
          <TablaBingo calledNumbers={calledNumbers} activeGameMode={activeGameMode} isBoardHorizontal={isBoardHorizontal} />
        </div>
      </main>

      {/* Menú de Opciones (renderizado condicionalmente) */}
      {showOptionsMenu && (
        <OptionsMenu
          onClose={() => setShowOptionsMenu(false)}
          onResetGame={resetGameAndLocalStorage}
          onGenerateCards={handleGenerateCards}
          generatedCards={generatedCards}
        />
      )}
    </div>
  );
}

export default App;
