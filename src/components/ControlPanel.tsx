import React from 'react';
import { ControlPanelProps, GameMode } from '@/types/types';
import styles from './ControlPanel.module.css';

const ControlPanel: React.FC<ControlPanelProps> = ({ lastCalledNumber, remainingNumbersCount, onCallNextNumber, lastFiveCalledNumbers, activeGameMode, onGameModeChange, gameModes, onOpenOptionsMenu }) => {

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onGameModeChange(event.target.value as GameMode);
  };

  return (
    <div className={styles.controlPanelWrapper}>
      <h2 className={styles.title}>Panel del Anfitrión</h2>

      {/* Selector de Modalidad de Juego */}
      <div className={styles.gameModeSelectorContainer}>
        <label htmlFor="game-mode-select" className={styles.gameModeSelectorLabel}>Selecciona Modalidad:</label>
        <select
          id="game-mode-select"
          className={styles.gameModeSelect}
          value={activeGameMode}
          onChange={handleSelectChange}
        >
          {gameModes.map((mode) => (
            <option key={mode.id} value={mode.id}>
              {mode.name}
            </option>
          ))}
        </select>
      </div>

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

      {/* Botón para abrir el Menú de Opciones */}
      <button
        onClick={onOpenOptionsMenu}
        className={styles.optionsMenuButton}
      >
        Opciones de Juego
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
