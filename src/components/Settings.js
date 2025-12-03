import React, { useState } from 'react';
import './Settings.css';

function Settings({ settings, onUpdateSettings, user }) {
  const [localSettings, setLocalSettings] = useState(settings);
  const [saved, setSaved] = useState(false);

  const handleChange = (key, value) => {
    setLocalSettings({
      ...localSettings,
      [key]: value
    });
  };

  const handleSave = () => {
    onUpdateSettings(localSettings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    if (window.confirm('¿Estás seguro de que quieres restablecer todas las configuraciones?')) {
      const defaultSettings = {
        pomodoroLength: 25,
        shortBreak: 5,
        longBreak: 15,
        autoStartBreaks: false,
        notifications: true,
        theme: 'light',
        soundEnabled: true
      };
      setLocalSettings(defaultSettings);
      onUpdateSettings(defaultSettings);
    }
  };

  const handleClearData = () => {
    if (window.confirm('⚠️ ADVERTENCIA: Esto eliminará todos tus datos, incluyendo sesiones, estadísticas y logros. Esta acción no se puede deshacer.\n\n¿Estás seguro?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="settings fade-in">
      <div className="settings-header">
        <h1>⚙️ Configuración</h1>
        <p>Personaliza StudyBuddy a tu gusto</p>
      </div>

      <div className="settings-container">
        <div className="settings-section card">
          <h2>⏲️ Temporizador Pomodoro</h2>
          
          <div className="setting-item">
            <div className="setting-label">
              <label>Duración de Sesión de Estudio</label>
              <span className="setting-description">Tiempo en minutos para cada sesión Pomodoro</span>
            </div>
            <div className="setting-control">
              <input
                type="number"
                value={localSettings.pomodoroLength}
                onChange={(e) => handleChange('pomodoroLength', parseInt(e.target.value))}
                min="1"
                max="60"
              />
              <span className="setting-unit">min</span>
            </div>
          </div>

          <div className="setting-item">
            <div className="setting-label">
              <label>Descanso Corto</label>
              <span className="setting-description">Tiempo de descanso entre sesiones</span>
            </div>
            <div className="setting-control">
              <input
                type="number"
                value={localSettings.shortBreak}
                onChange={(e) => handleChange('shortBreak', parseInt(e.target.value))}
                min="1"
                max="30"
              />
              <span className="setting-unit">min</span>
            </div>
          </div>

          <div className="setting-item">
            <div className="setting-label">
              <label>Descanso Largo</label>
              <span className="setting-description">Descanso después de 4 sesiones</span>
            </div>
            <div className="setting-control">
              <input
                type="number"
                value={localSettings.longBreak}
                onChange={(e) => handleChange('longBreak', parseInt(e.target.value))}
                min="1"
                max="60"
              />
              <span className="setting-unit">min</span>
            </div>
          </div>

          <div className="setting-item">
            <div className="setting-label">
              <label>Iniciar Descansos Automáticamente</label>
              <span className="setting-description">Los descansos comienzan sin intervención</span>
            </div>
            <div className="setting-control">
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={localSettings.autoStartBreaks}
                  onChange={(e) => handleChange('autoStartBreaks', e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>

        <div className="settings-section card">
          <h2>🔔 Notificaciones y Sonido</h2>
          
          <div className="setting-item">
            <div className="setting-label">
              <label>Notificaciones</label>
              <span className="setting-description">Recibe alertas cuando terminen las sesiones</span>
            </div>
            <div className="setting-control">
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={localSettings.notifications}
                  onChange={(e) => handleChange('notifications', e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>

          <div className="setting-item">
            <div className="setting-label">
              <label>Sonido de Alerta</label>
              <span className="setting-description">Reproduce un sonido al finalizar</span>
            </div>
            <div className="setting-control">
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={localSettings.soundEnabled}
                  onChange={(e) => handleChange('soundEnabled', e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>

        <div className="settings-section card">
          <h2>🎨 Apariencia</h2>
          
          <div className="setting-item">
            <div className="setting-label">
              <label>Tema</label>
              <span className="setting-description">Elige entre modo claro u oscuro</span>
            </div>
            <div className="setting-control">
              <div className="theme-selector">
                <button
                  className={`theme-btn ${localSettings.theme === 'light' ? 'active' : ''}`}
                  onClick={() => handleChange('theme', 'light')}
                >
                  ☀️ Claro
                </button>
                <button
                  className={`theme-btn ${localSettings.theme === 'dark' ? 'active' : ''}`}
                  onClick={() => handleChange('theme', 'dark')}
                >
                  🌙 Oscuro
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="settings-section card">
          <h2>👤 Cuenta</h2>
          
          <div className="account-info">
            <div className="info-row">
              <span className="info-label">Tipo de Usuario:</span>
              <span className="info-value">
                {user.isGuest ? '👤 Invitado' : '✅ Usuario Registrado'}
              </span>
            </div>
            <div className="info-row">
              <span className="info-label">Nombre:</span>
              <span className="info-value">{user.name}</span>
            </div>
            {!user.isGuest && (
              <div className="info-row">
                <span className="info-label">Email:</span>
                <span className="info-value">{user.email}</span>
              </div>
            )}
          </div>

          {user.isGuest && (
            <div className="guest-warning">
              <p>⚠️ Estás usando el modo invitado. Tus datos solo se guardan localmente.</p>
              <button className="btn btn-primary">
                Crear Cuenta para Guardar en la Nube
              </button>
            </div>
          )}
        </div>

        <div className="settings-section card danger-zone">
          <h2>⚠️ Zona de Peligro</h2>
          
          <div className="danger-actions">
            <div className="danger-item">
              <div>
                <h3>Restablecer Configuración</h3>
                <p>Volver a los valores predeterminados</p>
              </div>
              <button className="btn btn-secondary" onClick={handleReset}>
                Restablecer
              </button>
            </div>

            <div className="danger-item">
              <div>
                <h3>Borrar Todos los Datos</h3>
                <p>Eliminar sesiones, estadísticas y logros permanentemente</p>
              </div>
              <button className="btn btn-danger" onClick={handleClearData}>
                Borrar Todo
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="settings-actions">
        <button 
          className={`btn btn-primary btn-large ${saved ? 'saved' : ''}`}
          onClick={handleSave}
        >
          {saved ? '✅ Guardado' : '💾 Guardar Cambios'}
        </button>
      </div>

      {saved && (
        <div className="save-notification fade-in">
          ✅ Configuración guardada correctamente
        </div>
      )}
    </div>
  );
}

export default Settings;
