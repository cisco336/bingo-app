import React from 'react';
import { ControlPanelProps } from '@/types/types';
import styles from './ControlPanel.module.css'; // Importar el módulo CSS

const ControlPanel: React.FC<ControlPanelProps> = ({ lastCalledNumber, remainingNumbersCount, onCallNextNumber, lastFiveCalledNumbers }) => {
  return (
    <div className={styles.controlPanelWrapper}>
      <h2 className={styles.title}>Panel del Anfitrión</h2>

      {/* Último Número Cantado - Gigante y Llamativo */}
      <div className={styles.lastCalledNumberContainer}>
        {lastCalledNumber !== null && lastCalledNumber !== 'FIN' && (
          <span className={styles.pingAnimation}></span>
        )}
        <p className={styles.lastCalledLabel}>Último Número Cantado:</p>
        <div className={styles.lastCalledNumber}>
          {lastCalledNumber || '--'}
        </div>
      </div>

      {/* Botón Sacar Siguiente Número */}
      <button
        onClick={onCallNextNumber}
        className={styles.callNextButton}
        disabled={lastCalledNumber === 'FIN'}
      >
        {lastCalledNumber === 'FIN' ? 'Juego Terminado' : 'Sacar Siguiente Número'}
        {/* Efecto de relieve simulado */}
        <span className={styles.callNextButtonRelief}></span>
      </button>

      {/* Historial de últimos 5 números - Píldoras */}
      <div className={styles.historyContainer}>
        <p className={styles.historyTitle}>Últimos 5 Números:</p>
        <div className={styles.historyNumbers}>
          {lastFiveCalledNumbers.length > 0 ? (
            lastFiveCalledNumbers.map((num: string, index: number) => (
              <span
                key={index}
                className={styles.historyNumberPill}
              >
                {num}
              </span>
            ))
          ) : (
            <span className={styles.historyEmpty}>Ninguno aún...</span>
          )}
        </div>
      </div>

      {/* Contador de Números Restantes */}
      <div className={styles.remainingCounterContainer}>
        <p className={styles.remainingCounterLabel}>Números por salir:</p>
        <p className={styles.remainingCounterNumber}>
          {remainingNumbersCount}
        </p>
      </div>
    </div>
  );
};

export default ControlPanel;
