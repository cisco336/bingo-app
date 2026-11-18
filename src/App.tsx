import { useState, useEffect, useCallback } from 'react';
import TablaBingo from './components/TablaBingo';
import ControlPanel from './components/ControlPanel';
import { GameState } from '@/types/types';
import styles from './App.module.css'; // Importar el módulo CSS

// Nombre de la clave para almacenar el estado del juego en localStorage.
const LOCAL_STORAGE_KEY = 'bingoGameState';

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

function App(): JSX.Element {
  // Objeto Audio para el efecto de sonido del bingo.
  // ¡IMPORTANTE!: Reemplaza '/sounds/bingo-ding.mp3' con la ruta a tu archivo de sonido real.
  const bingoSound = new Audio('/sounds/bingo-ding.mp3');

  const playBingoSound = useCallback(() => {
    if (bingoSound) {
      bingoSound.currentTime = 0; // Reinicia el sonido si ya se está reproduciendo
      bingoSound.play().catch(e => console.error("Error al reproducir el sonido:", e));
    }
  }, [bingoSound]);

  // Función para inicializar el estado cargando desde localStorage, o con valores predeterminados.
  const initializeState = (): { allPossibleNumbers: number[]; calledNumbers: Set<number>; lastCalledNumber: string | null; lastFiveCalledNumbers: string[] } => {
    try {
      const savedState = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedState) {
        const parsedState: GameState = JSON.parse(savedState);
        return {
          allPossibleNumbers: parsedState.allPossibleNumbers || generateBingoNumbers(),
          calledNumbers: new Set(parsedState.calledNumbers || []),
          lastCalledNumber: parsedState.lastCalledNumber || null,
          lastFiveCalledNumbers: parsedState.lastFiveCalledNumbers || [],
        };
      }
    } catch (e) {
      console.error("Error al cargar el estado desde localStorage:", e);
      // Si hay un error, inicializa con el estado por defecto
    }
    // Estado inicial por defecto si no hay nada guardado o hubo un error
    return {
      allPossibleNumbers: generateBingoNumbers(),
      calledNumbers: new Set<number>(),
      lastCalledNumber: null,
      lastFiveCalledNumbers: [],
    };
  };

  // Inicializa los estados llamando a initializeState una vez.
  const initialState = initializeState();

  const [allPossibleNumbers, setAllPossibleNumbers] = useState<number[]>(initialState.allPossibleNumbers);
  const [calledNumbers, setCalledNumbers] = useState<Set<number>>(initialState.calledNumbers);
  const [lastCalledNumber, setLastCalledNumber] = useState<string | null>(initialState.lastCalledNumber);
  const [lastFiveCalledNumbers, setLastFiveCalledNumbers] = useState<string[]>(initialState.lastFiveCalledNumbers);

  // Estado que muestra cuántos números quedan por salir.
  const [remainingNumbersCount, setRemainingNumbersCount] = useState<number>(75);

  // Efecto que se ejecuta cada vez que 'calledNumbers' cambia.
  // Actualiza el contador de números restantes.
  useEffect(() => {
    setRemainingNumbersCount(75 - calledNumbers.size);
  }, [calledNumbers]);

  // Nuevo useEffect para guardar el estado en localStorage cada vez que los estados relevantes cambian.
  useEffect(() => {
    try {
      const stateToSave: GameState = {
        allPossibleNumbers: allPossibleNumbers,
        calledNumbers: Array.from(calledNumbers), // Convertir Set a Array para guardar en JSON
        lastCalledNumber: lastCalledNumber,
        lastFiveCalledNumbers: lastFiveCalledNumbers,
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (e) {
      console.error("Error al guardar el estado en localStorage:", e);
    }
  }, [allPossibleNumbers, calledNumbers, lastCalledNumber, lastFiveCalledNumbers]); // Dependencias del efecto.

  // Función useCallback para "cantar" el siguiente número.
  const callNextNumber = useCallback(() => {
    if (allPossibleNumbers.length === 0) {
      alert('¡Todos los números han sido cantados! El juego ha terminado.');
      setLastCalledNumber('FIN'); // Indicador de fin de juego
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

      <main className={styles.mainContent}>
        {/* Panel de Control */}
        <div className={styles.panelContainer}>
          <ControlPanel
            lastCalledNumber={lastCalledNumber}
            remainingNumbersCount={remainingNumbersCount}
            onCallNextNumber={callNextNumber}
            lastFiveCalledNumbers={lastFiveCalledNumbers}
          />
        </div>

        {/* Tabla de Bingo */}
        <div className={styles.bingoBoardContainer}>
          <TablaBingo calledNumbers={calledNumbers} />
        </div>
      </main>
    </div>
  );
}

export default App;
