import React from 'react';
import { BingoCard } from '@/types/types';
import styles from './PrintableBingoCards.module.css';

interface PrintableBingoCardsProps {
  cards: BingoCard[];
}

const PrintableBingoCards: React.FC<PrintableBingoCardsProps> = ({ cards }) => {
  const letters = ['B', 'I', 'N', 'G', 'O'];

  return (
    <div className={styles.printContainer}>
      {cards.map((card) => (
        <div key={card.id} className={styles.bingoCard}>
          <div className={styles.bingoCardHeader}>
            {letters.map(letter => <span key={letter}>{letter}</span>)}
          </div>
          <div className={styles.bingoCardGrid}>
            {[0, 1, 2, 3, 4].map(rowIndex => (
              letters.map((letter, colIndex) => (
                <span key={`${card.id}-${rowIndex}-${letter}`} className={styles.bingoCardCell}>
                  {letter === 'N' && rowIndex === 2 // Espacio libre en N3
                    ? '★'
                    : (card.columns[letter as keyof BingoCard['columns']][rowIndex] || '')
                  }
                </span>
              ))
            ))}
          </div>
          <div className={styles.cardId}>ID: {card.id}</div>
        </div>
      ))}
    </div>
  );
};

export default PrintableBingoCards;
