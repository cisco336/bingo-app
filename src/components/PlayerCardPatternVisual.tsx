// src/components/PlayerCardPatternVisual.tsx
import React from 'react';
import { GameMode } from '@/types/types';
import styles from './PlayerCardPatternVisual.module.css';

interface PlayerCardPatternVisualProps {
  activeGameMode: GameMode;
}

// Función auxiliar para obtener las celdas a resaltar en un cartón 5x5 genérico
const getPatternCells = (mode: GameMode): { row: number, col: number }[] => {
  const cells: { row: number, col: number }[] = [];

  switch (mode) {
    case 'TRADITIONAL_LINE':
      // Ejemplo: Línea central horizontal
      for (let c = 0; c < 5; c++) cells.push({ row: 2, col: c });
      break;
    case 'FOUR_CORNERS':
      cells.push({ row: 0, col: 0 }); // Top-left
      cells.push({ row: 0, col: 4 }); // Top-right
      cells.push({ row: 4, col: 0 }); // Bottom-left
      cells.push({ row: 4, col: 4 }); // Bottom-right
      break;
    case 'COLUMN_B':
      for (let r = 0; r < 5; r++) cells.push({ row: r, col: 0 }); // Columna B (index 0)
      break;
    case 'COLUMN_I':
      for (let r = 0; r < 5; r++) cells.push({ row: r, col: 1 }); // Columna I (index 1)
      break;
    case 'COLUMN_N':
      for (let r = 0; r < 5; r++) cells.push({ row: r, col: 2 }); // Columna N (index 2)
      break;
    case 'COLUMN_G':
      for (let r = 0; r < 5; r++) cells.push({ row: r, col: 3 }); // Columna G (index 3)
      break;
    case 'COLUMN_O':
      for (let r = 0; r < 5; r++) cells.push({ row: r, col: 4 }); // Columna O (index 4)
      break;
    case 'DIAGONAL_X':
      for (let i = 0; i < 5; i++) cells.push({ row: i, col: i }); // Diagonal principal
      for (let i = 0; i < 5; i++) cells.push({ row: i, col: 4 - i }); // Diagonal secundaria
      break;
    case 'VOWELS_ONLY':
      // Columnas I (1), O (4) - ¡CORREGIDO!
      for (let r = 0; r < 5; r++) cells.push({ row: r, col: 1 }); // Columna I
      for (let r = 0; r < 5; r++) cells.push({ row: r, col: 4 }); // Columna O
      break;
    case 'CONSONANTS_ONLY':
      // Columnas B (0), N (2), G (3) - ¡CORREGIDO!
      for (let r = 0; r < 5; r++) cells.push({ row: r, col: 0 }); // Columna B
      for (let r = 0; r < 5; r++) cells.push({ row: r, col: 2 }); // Columna N
      for (let r = 0; r < 5; r++) cells.push({ row: r, col: 3 }); // Columna G
      break;
    case 'B_AND_O':
      // Columnas B (0) y O (4)
      for (let r = 0; r < 5; r++) cells.push({ row: r, col: 0 });
      for (let r = 0; r < 5; r++) cells.push({ row: r, col: 4 });
      break;
    case 'U_PATTERN':
      // Bordes, excluyendo la parte superior central (BINGO)
      // Fila inferior
      for (let c = 0; c < 5; c++) { cells.push({ row: 4, col: c }); }
      // Columna izquierda (excluyendo la esquina inferior ya cubierta)
      for (let r = 0; r < 4; r++) { cells.push({ row: r, col: 0 }); }
      // Columna derecha (excluyendo la esquina inferior ya cubierta)
      for (let r = 0; r < 4; r++) { cells.push({ row: r, col: 4 }); }
      break;
    case 'FULL_CARD':
      for (let r = 0; r < 5; r++) {
        for (let c = 0; c < 5; c++) {
          cells.push({ row: r, col: c });
        }
      }
      break;
    default:
      // No pattern for unknown modes
      break;
  }
  return cells;
};

const PlayerCardPatternVisual: React.FC<PlayerCardPatternVisualProps> = ({ activeGameMode }) => {
  const patternCells = React.useMemo(() => getPatternCells(activeGameMode), [activeGameMode]);

  const isHighlighted = (row: number, col: number): boolean => {
    return patternCells.some(cell => cell.row === row && cell.col === col);
  };

  const letters = ['B', 'I', 'N', 'G', 'O'];

  return (
    <div className={styles.cardVisualContainer}>
      <div className={styles.cardHeader}>
        {letters.map((letter, index) => (
          <div key={index} className={styles.cardHeaderLetter}>{letter}</div>
        ))}
      </div>
      <div className={styles.cardGrid}>
        {[...Array(5)].map((_, r) => (
          [...Array(5)].map((_2, c) => (
            <div
              key={`${r}-${c}`}
              className={`${styles.cardCell} ${isHighlighted(r, c) ? styles.cardCellHighlighted : ''}`}
            >
              {r === 2 && c === 2 && (activeGameMode !== 'FULL_CARD' && activeGameMode !== 'U_PATTERN') ? '★' : ''}
              {/* Espacio libre en N3, excepto para full card o U-Pattern donde podría ser parte del patrón */}
            </div>
          ))
        ))}
      </div>
    </div>
  );
};

export default PlayerCardPatternVisual;
