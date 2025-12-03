import React from 'react';
import './Dashboard.css';

function Dashboard({ user, stats, recentSessions, onNavigate }) {
  const quickStats = [
    {
      icon: '⏱️',
      label: 'Minutos Totales',
      value: stats.totalMinutes,
      color: '#667eea'
    },
    {
      icon: '✅',
      label: 'Sesiones Completadas',
      value: stats.sessionsCompleted,
      color: '#48bb78'
    },
    {
      icon: '🔥',
      label: 'Racha Actual',
      value: `${stats.streak} días`,
      color: '#f56565'
    },
    {
      icon: '⭐',
      label: 'Nivel',
      value: stats.level,
      color: '#ed8936'
    }
  ];

  const motivationalQuotes = [
    "El éxito es la suma de pequeños esfuerzos repetidos día tras día. 💪",
    "La educación es el arma más poderosa para cambiar el mundo. 🌍",
    "El único modo de hacer un gran trabajo es amar lo que haces. ❤️",
    "No cuentes los días, haz que los días cuenten. 📅",
    "El aprendizaje es un tesoro que seguirá a su dueño a todas partes. 💎"
  ];

  const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];

  return (
    <div className="dashboard fade-in">
      <div className="dashboard-header">
        <h1>¡Bienvenido de nuevo, {user.name}! 👋</h1>
        <p className="motivational-quote">{randomQuote}</p>
      </div>

      <div className="quick-stats">
        {quickStats.map((stat, index) => (
          <div 
            key={index} 
            className="stat-card"
            style={{ borderLeftColor: stat.color }}
          >
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-content">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="card quick-actions">
          <h2>🚀 Acciones Rápidas</h2>
          <div className="action-buttons">
            <button 
              className="action-btn"
              onClick={() => onNavigate('timer')}
            >
              <span className="action-icon">⏲️</span>
              <span>Comenzar Pomodoro</span>
            </button>
            <button 
              className="action-btn"
              onClick={() => onNavigate('rooms')}
            >
              <span className="action-icon">👥</span>
              <span>Unirse a Sala</span>
            </button>
            <button 
              className="action-btn"
              onClick={() => onNavigate('stats')}
            >
              <span className="action-icon">📊</span>
              <span>Ver Estadísticas</span>
            </button>
            <button 
              className="action-btn"
              onClick={() => onNavigate('achievements')}
            >
              <span className="action-icon">🏆</span>
              <span>Mis Logros</span>
            </button>
          </div>
        </div>

        <div className="card recent-activity">
          <h2>📋 Actividad Reciente</h2>
          {recentSessions.length === 0 ? (
            <div className="empty-state">
              <p>🎯 Aún no tienes sesiones de estudio</p>
              <p className="empty-hint">¡Comienza tu primera sesión ahora!</p>
              <button 
                className="btn btn-primary"
                onClick={() => onNavigate('timer')}
              >
                Iniciar Sesión
              </button>
            </div>
          ) : (
            <div className="sessions-list">
              {recentSessions.map((session, index) => (
                <div key={index} className="session-item">
                  <div className="session-icon">
                    {session.type === 'study' ? '📚' : '☕'}
                  </div>
                  <div className="session-info">
                    <div className="session-title">
                      {session.type === 'study' ? 'Sesión de Estudio' : 'Descanso'}
                    </div>
                    <div className="session-details">
                      {session.duration} min • {new Date(session.date).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="session-xp">
                    +{Math.floor(session.duration / 5) * 10} XP
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="tips-section card">
        <h2>💡 Consejos para Estudiar Mejor</h2>
        <div className="tips-grid">
          <div className="tip">
            <span className="tip-icon">🎯</span>
            <h3>Define Objetivos</h3>
            <p>Establece metas claras antes de cada sesión de estudio</p>
          </div>
          <div className="tip">
            <span className="tip-icon">🔕</span>
            <h3>Elimina Distracciones</h3>
            <p>Apaga notificaciones y crea un ambiente propicio</p>
          </div>
          <div className="tip">
            <span className="tip-icon">⏸️</span>
            <h3>Toma Descansos</h3>
            <p>El método Pomodoro mejora tu concentración y productividad</p>
          </div>
          <div className="tip">
            <span className="tip-icon">🤝</span>
            <h3>Estudia en Grupo</h3>
            <p>Únete a salas de estudio para motivarte con otros</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
