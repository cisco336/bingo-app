// src/components/OptionsMenu.tsx
import React, { useState } from 'react';
import { OptionsMenuProps, BingoCard } from '@/types/types';
import styles from './OptionsMenu.module.css';

const LETTERS: Array<keyof BingoCard['columns']> = ['B', 'I', 'N', 'G', 'O'];

const OptionsMenu: React.FC<OptionsMenuProps> = ({
  onClose,
  onResetGame,
  onGenerateCards,
  generatedCards,
}) => {
  const [numParticipants, setNumParticipants] = useState<string>('1');

  const handleGenerate = () => {
    const num = parseInt(numParticipants, 10);
    if (isNaN(num) || num <= 0 || num > 100) {
      alert('Por favor, ingresa un número válido de participantes (1-100).');
      return;
    }
    onGenerateCards(num);
  };

  const handleReset = () => {
    if (
      window.confirm(
        '¿Estás seguro de que quieres reiniciar el juego y borrar todos los datos guardados?'
      )
    ) {
      onResetGame();
    }
  };

  const handlePrintCards = () => {
    if (!generatedCards || generatedCards.length === 0) return;

    const printWindow = window.open('', '_blank', 'height=800,width=1200');
    if (!printWindow) {
      alert('Por favor, permite ventanas emergentes para imprimir los cartones.');
      return;
    }

    const cardsHtml = generatedCards
      .map((card) => {
        const rowsHtml = [0, 1, 2, 3, 4]
          .map((rowIndex) =>
            LETTERS.map((letter) => {
              const isFree = letter === 'N' && rowIndex === 2;
              const cellValue = isFree
                ? '★'
                : (card.columns[letter][rowIndex] ?? '');
              return `<div class="bingo-cell">${cellValue}</div>`;
            }).join('')
          )
          .join('');

        return `
          <article class="bingo-card">
            <div class="bingo-header">
              ${LETTERS.map((letter) => `<div>${letter}</div>`).join('')}
            </div>
            <div class="bingo-grid">
              ${rowsHtml}
            </div>
            <div class="card-id">ID: ${card.id}</div>
          </article>
        `;
      })
      .join('');

    const printStyles = `
      @page {
        size: letter;
        margin: 0.5in;
      }

      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        padding: 0;
        font-family: Arial, sans-serif;
        color: #000;
        background: #fff;
      }

      .print-container {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 0.4in;
        width: 100%;
      }

      .bingo-card {
        border: 2px solid #111;
        border-radius: 8px;
        height: 4.5in;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        break-inside: avoid;
        page-break-inside: avoid;
        overflow: hidden;
      }

      .bingo-header {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        background-color: #16a34a;
        color: #fff;
        font-weight: 800;
        font-size: 20px;
        text-align: center;
        padding: 8px 0;
      }

      .bingo-header > div {
        border-right: 1px solid rgba(255, 255, 255, 0.35);
      }

      .bingo-header > div:last-child {
        border-right: none;
      }

      .bingo-grid {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-template-rows: repeat(5, 1fr);
        flex: 1;
      }

      .bingo-cell {
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #bbb;
        font-size: 22px;
        font-weight: 700;
      }

      .card-id {
        font-size: 12px;
        font-weight: 600;
        text-align: center;
        padding: 6px;
        background-color: #f3f4f6;
        border-top: 1px solid #111;
      }

      @media print {
        .bingo-card:nth-child(4n) {
          break-after: page;
          page-break-after: always;
        }
      }
    `;

    printWindow.document.open();
    printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="es">
        <head>
          <meta charset="UTF-8" />
          <title>Cartones de Bingo - Takali</title>
          <style>${printStyles}</style>
        </head>
        <body>
          <main id="print-root" class="print-container">${cardsHtml}</main>
          <script>
            window.onload = function () {
              window.focus();
              window.print();
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.menuContainer}>
        <h3 className={styles.menuTitle}>Menú de Opciones</h3>

        {/* Sección: Reiniciar Juego */}
        <div className={styles.section}>
          <p className={styles.sectionDescription}>
            Borra el estado actual del juego guardado en tu navegador y comienza una nueva partida.
          </p>
          <button onClick={handleReset} className={styles.resetButton}>
            Reiniciar Juego y Borrar Datos
          </button>
        </div>

        {/* Sección: Generar Cartones */}
        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>Generar Cartones de Bingo</h4>
          <p className={styles.sectionDescription}>
            Crea cartones de bingo únicos (5x5) para cada participante. Los cartones generados aparecerán abajo.
          </p>
          <div className={styles.inputGroup}>
            <label htmlFor="num-participants" className={styles.inputLabel}>
              Número de participantes:
            </label>
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
            <h4 className={styles.sectionTitle}>
              Cartones Generados ({generatedCards.length})
            </h4>
            <div className={styles.cardsGrid}>
              {generatedCards.map((card) => (
                <div key={card.id} className={styles.bingoCard}>
                  <div className={styles.bingoCardHeader}>
                    {LETTERS.map((letter) => (
                      <span key={letter}>{letter}</span>
                    ))}
                  </div>
                  <div className={styles.bingoCardGrid}>
                    {[0, 1, 2, 3, 4].map((rowIndex) =>
                      LETTERS.map((letter) => (
                        <span
                          key={`${card.id}-${rowIndex}-${letter}`}
                          className={styles.bingoCardCell}
                        >
                          {letter === 'N' && rowIndex === 2
                            ? '★'
                            : card.columns[letter][rowIndex] || ''}
                        </span>
                      ))
                    )}
                  </div>
                </div>
              ))}
            </div>
            <p className={styles.generatedCardsHint}>
              Puedes copiar el texto de los cartones y pegarlos en un documento o imprimirlos. Cada cartón es único.
            </p>
            <button
              onClick={handlePrintCards}
              className={styles.generateButton}
              style={{ marginTop: '1rem' }}
            >
              Imprimir Cartones
            </button>
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
