import React from 'react';
import { TablaBingoProps } from '@/types/types';
import styles from './TablaBingo.module.css'; // Importar el módulo CSS

const TablaBingo: React.FC<TablaBingoProps> = ({ calledNumbers }) => {
  const letters = [
    { char: 'B', className: styles.letterB },
    { char: 'I', className: styles.letterI },
    { char: 'N', className: styles.letterN },
    { char: 'G', className: styles.letterG },
    { char: 'O', className: styles.letterO },
  ];
  const numbers = Array.from({ length: 75 }, (_, i) => i + 1);

  return (
    <div className={styles.bingoBoardWrapper}>
      <h2 className={styles.title}>Tablero de Números (1-75)</h2>

      <div className={styles.lettersGrid}>
        {letters.map((letter) => (
          <div key={letter.char} className={`${styles.letter} ${letter.className}`}>
            {letter.char}
          </div>
        ))}
      </div>

      <div className={styles.numbersGridContainer}>
        {numbers.map((number: number) => {
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
    </div>
  );
};

export default TablaBingo;
