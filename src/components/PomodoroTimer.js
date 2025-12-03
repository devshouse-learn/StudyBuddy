import React, { useState, useEffect, useRef } from 'react';
import './PomodoroTimer.css';

function PomodoroTimer({ settings, onSessionComplete }) {
  const [minutes, setMinutes] = useState(settings.pomodoroLength);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('study'); // study, shortBreak, longBreak
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            handleTimerComplete();
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, minutes, seconds]);

  const handleTimerComplete = () => {
    setIsActive(false);
    
    if (settings.soundEnabled) {
      playSound();
    }

    if (settings.notifications) {
      if (mode === 'study') {
        alert('🎉 ¡Sesión de estudio completada! Toma un descanso.');
      } else {
        alert('⏰ ¡Descanso terminado! Hora de volver a estudiar.');
      }
    }

    if (mode === 'study') {
      const newSessionsCompleted = sessionsCompleted + 1;
      setSessionsCompleted(newSessionsCompleted);
      
      onSessionComplete({
        duration: settings.pomodoroLength,
        type: 'study'
      });

      if (settings.autoStartBreaks) {
        if (newSessionsCompleted % 4 === 0) {
          startLongBreak();
        } else {
          startShortBreak();
        }
      }
    }
  };

  const playSound = () => {
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjGH0fPTgjMGHm7A7+OZSA0PVK/m77BhFwxEneDxu3AeByuG1PPYij0HGWi77emfTxELT6fj7bllHAY5kdDwzHkqBSd1xe7dkUEKFF+07OuqVxQLR57e8r1tHwY0hdLz13svBx5tv+/hmUkND1Ot5u+xYxgLRKHh8bl1IAQBAP//');
    audio.play().catch(e => console.log('Audio play failed:', e));
  };

  const startStudySession = () => {
    setMode('study');
    setMinutes(settings.pomodoroLength);
    setSeconds(0);
    setIsActive(true);
  };

  const startShortBreak = () => {
    setMode('shortBreak');
    setMinutes(settings.shortBreak);
    setSeconds(0);
    if (settings.autoStartBreaks) {
      setIsActive(true);
    }
  };

  const startLongBreak = () => {
    setMode('longBreak');
    setMinutes(settings.longBreak);
    setSeconds(0);
    if (settings.autoStartBreaks) {
      setIsActive(true);
    }
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    if (mode === 'study') {
      setMinutes(settings.pomodoroLength);
    } else if (mode === 'shortBreak') {
      setMinutes(settings.shortBreak);
    } else {
      setMinutes(settings.longBreak);
    }
    setSeconds(0);
  };

  const formatTime = (mins, secs) => {
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgress = () => {
    let totalSeconds;
    if (mode === 'study') {
      totalSeconds = settings.pomodoroLength * 60;
    } else if (mode === 'shortBreak') {
      totalSeconds = settings.shortBreak * 60;
    } else {
      totalSeconds = settings.longBreak * 60;
    }
    const currentSeconds = minutes * 60 + seconds;
    return ((totalSeconds - currentSeconds) / totalSeconds) * 100;
  };

  const getModeColor = () => {
    if (mode === 'study') return '#667eea';
    if (mode === 'shortBreak') return '#48bb78';
    return '#ed8936';
  };

  const getModeIcon = () => {
    if (mode === 'study') return '📚';
    if (mode === 'shortBreak') return '☕';
    return '🌟';
  };

  const getModeText = () => {
    if (mode === 'study') return 'Sesión de Estudio';
    if (mode === 'shortBreak') return 'Descanso Corto';
    return 'Descanso Largo';
  };

  return (
    <div className="pomodoro-container fade-in">
      <div className="pomodoro-card card">
        <div className="mode-indicator" style={{ background: getModeColor() }}>
          <span className="mode-icon">{getModeIcon()}</span>
          <span className="mode-text">{getModeText()}</span>
        </div>

        <div className="timer-display">
          <svg className="timer-circle" viewBox="0 0 200 200">
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke="rgba(0,0,0,0.1)"
              strokeWidth="8"
            />
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke={getModeColor()}
              strokeWidth="8"
              strokeDasharray={`${2 * Math.PI * 90}`}
              strokeDashoffset={`${2 * Math.PI * 90 * (1 - getProgress() / 100)}`}
              transform="rotate(-90 100 100)"
              style={{ transition: 'stroke-dashoffset 1s linear' }}
            />
          </svg>
          <div className="timer-text">
            <div className="time">{formatTime(minutes, seconds)}</div>
            {isActive && <div className="timer-status">En progreso...</div>}
          </div>
        </div>

        <div className="timer-controls">
          <button 
            className="control-btn"
            onClick={toggleTimer}
            style={{ background: getModeColor() }}
          >
            {isActive ? '⏸️ Pausar' : '▶️ Iniciar'}
          </button>
          <button 
            className="control-btn secondary"
            onClick={resetTimer}
          >
            🔄 Reiniciar
          </button>
        </div>

        <div className="mode-switcher">
          <button 
            className={mode === 'study' ? 'active' : ''}
            onClick={startStudySession}
          >
            📚 Estudio
          </button>
          <button 
            className={mode === 'shortBreak' ? 'active' : ''}
            onClick={startShortBreak}
          >
            ☕ Descanso
          </button>
          <button 
            className={mode === 'longBreak' ? 'active' : ''}
            onClick={startLongBreak}
          >
            🌟 Descanso Largo
          </button>
        </div>

        <div className="sessions-counter">
          <div className="counter-label">Sesiones Completadas Hoy</div>
          <div className="counter-value">{sessionsCompleted}</div>
          <div className="counter-circles">
            {[...Array(4)].map((_, i) => (
              <div 
                key={i} 
                className={`circle ${i < sessionsCompleted % 4 ? 'filled' : ''}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="pomodoro-info card">
        <h2>🍅 ¿Qué es la Técnica Pomodoro?</h2>
        <p>
          La técnica Pomodoro es un método de gestión del tiempo que utiliza 
          intervalos de trabajo de 25 minutos separados por breves descansos.
        </p>
        <div className="info-steps">
          <div className="step">
            <span className="step-number">1</span>
            <span>Elige una tarea</span>
          </div>
          <div className="step">
            <span className="step-number">2</span>
            <span>Estudia 25 minutos</span>
          </div>
          <div className="step">
            <span className="step-number">3</span>
            <span>Descansa 5 minutos</span>
          </div>
          <div className="step">
            <span className="step-number">4</span>
            <span>Repite 4 veces</span>
          </div>
          <div className="step">
            <span className="step-number">5</span>
            <span>Descansa 15-30 min</span>
          </div>
        </div>

        <div className="tips-box">
          <h3>💡 Consejos</h3>
          <ul>
            <li>Elimina todas las distracciones antes de empezar</li>
            <li>No interrumpas el Pomodoro una vez iniciado</li>
            <li>Respeta los descansos, son igual de importantes</li>
            <li>Lleva un registro de tus sesiones completadas</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PomodoroTimer;
