import React from 'react';
import { TablaBingoProps } from '@/types/types';
import styles from './TablaBingo.module.css';

const TablaBingo: React.FC<TablaBingoProps> = ({ calledNumbers, activeGameMode }) => {
  const letters = [
    { char: 'B', className: styles.letterB, range: { start: 1, end: 15 } },
    { char: 'I', className: styles.letterI, range: { start: 16, end: 30 } },
    { char: 'N', className: styles.letterN, range: { start: 31, end: 45 } },
    { char: 'G', className: styles.letterG, range: { start: 46, end: 60 } },
    { char: 'O', className: styles.letterO, range: { start: 61, end: 75 } },
  ];

  return (
    <div className={styles.bingoBoardWrapper}>
      <h2 className={styles.title}>Tablero de Números (1-75)</h2>

      <div className={styles.mainGrid}>
        {/* Cabeceras de Letras */}
        {letters.map((letter) => (
          <div key={letter.char} className={`${styles.letter} ${letter.className}`}>
            {letter.char}
          </div>
        ))}

        {/* Columnas de Números bajo cada Letra */}
        {letters.map((letter) => (
          <div key={`${letter.char}-numbers`} className={styles.numberColumn}>
            {Array.from({ length: letter.range.end - letter.range.start + 1 }, (_, i) => i + letter.range.start).map((number: number) => {
              const isCalled = calledNumbers.has(number);

              return (
                <div
                  key={number}
                  className={`${styles.numberCell} ${isCalled ? styles.numberCellCalled : styles.numberCellUncalled}`}
                >
                  {number}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TablaBingo;
