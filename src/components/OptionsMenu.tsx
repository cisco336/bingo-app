// src/components/OptionsMenu.tsx
import React, { useState } from 'react';
import { OptionsMenuProps, BingoCard } from '@/types/types';
import styles from './OptionsMenu.module.css';

const OptionsMenu: React.FC<OptionsMenuProps> = ({ onClose, onResetGame, onGenerateCards, generatedCards }) => {
  const [numParticipants, setNumParticipants] = useState<string>('1');

  const handleGenerate = () => {
    const num = parseInt(numParticipants, 10);
    if (isNaN(num) || num <= 0 || num > 100) { // Límite razonable para evitar sobrecarga
      alert('Por favor, ingresa un número válido de participantes (1-100).');
      return;
    }
    onGenerateCards(num);
  };

  const handleReset = () => {
    if (window.confirm('¿Estás seguro de que quieres reiniciar el juego y borrar todos los datos guardados?')) {
      onResetGame();
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.menuContainer}>
        <h3 className={styles.menuTitle}>Menú de Opciones</h3>

        {/* Sección: Reiniciar Juego */}
        <div className={styles.section}>
          <p className={styles.sectionDescription}>Borra el estado actual del juego guardado en tu navegador y comienza una nueva partida.</p>
          <button onClick={handleReset} className={styles.resetButton}>
            Reiniciar Juego y Borrar Datos
          </button>
        </div>

        {/* Sección: Generar Cartones */}
        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>Generar Cartones de Bingo</h4>
          <p className={styles.sectionDescription}>Crea cartones de bingo únicos (5x5) para cada participante. Los cartones generados aparecerán abajo.</p>
          <div className={styles.inputGroup}>
            <label htmlFor="num-participants" className={styles.inputLabel}>Número de participantes:</label>
            <input
              type="number"
              id="num-participants"
              min="1"
              max="100"
              value={numParticipants}
              onChange={(e) => setNumParticipants(e.target.value)}
              className={styles.numParticipantsInput}
            />
          </div>
          <button onClick={handleGenerate} className={styles.generateButton}>
            Generar Cartones
          </button>
        </div>

        {/* Cartones Generados */}
        {generatedCards && generatedCards.length > 0 && (
          <div className={styles.generatedCardsContainer}>
            <h4 className={styles.sectionTitle}>Cartones Generados ({generatedCards.length})</h4>
            <div className={styles.cardsGrid}>
              {generatedCards.map((card, cardIndex) => (
                <div key={card.id} className={styles.bingoCard}>
                  <div className={styles.bingoCardHeader}>
                    {[ 'B', 'I', 'N', 'G', 'O' ].map(letter => <span key={letter}>{letter}</span>)}
                  </div>
                  <div className={styles.bingoCardGrid}>
                    {[0, 1, 2, 3, 4].map(rowIndex => (
                      [ 'B', 'I', 'N', 'G', 'O' ].map((letter, colIndex) => (
                        <span key={`${card.id}-${rowIndex}-${letter}`} className={styles.bingoCardCell}>
                          {letter === 'N' && rowIndex === 2 // Espacio libre en N3
                            ? '★'
                            : (card.columns[letter as keyof BingoCard['columns']][rowIndex] || '')
                          }
                        </span>
                      ))
                    ))}
                  </div>
                </div>
              ))}
            </div>
             <p className={styles.generatedCardsHint}>Puedes copiar el texto de los cartones y pegarlos en un documento o imprimirlos. Cada cartón es único.</p>
          </div>
        )}

        <button onClick={onClose} className={styles.closeButton}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default OptionsMenu;
