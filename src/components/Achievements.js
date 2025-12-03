import React from 'react';
import './Achievements.css';

function Achievements({ achievements, stats }) {
  const allAchievements = [
    { id: 'first_session', name: 'Primera Sesión', description: 'Completa tu primera sesión de estudio', icon: '🎯', condition: stats.sessionsCompleted >= 1 },
    { id: 'rookie', name: 'Novato', description: 'Completa 5 sesiones de estudio', icon: '🌱', condition: stats.sessionsCompleted >= 5 },
    { id: 'dedicated', name: 'Dedicado', description: 'Completa 25 sesiones de estudio', icon: '⭐', condition: stats.sessionsCompleted >= 25 },
    { id: 'expert', name: 'Experto', description: 'Completa 50 sesiones de estudio', icon: '💎', condition: stats.sessionsCompleted >= 50 },
    { id: 'master', name: 'Maestro', description: 'Completa 100 sesiones de estudio', icon: '🏆', condition: stats.sessionsCompleted >= 100 },
    { id: 'hour_club', name: 'Club de la Hora', description: 'Estudia durante 60 minutos', icon: '⏰', condition: stats.totalMinutes >= 60 },
    { id: 'marathon', name: 'Maratonista', description: 'Acumula 10 horas de estudio', icon: '🏃', condition: stats.totalMinutes >= 600 },
    { id: 'scholar', name: 'Erudito', description: 'Acumula 50 horas de estudio', icon: '📚', condition: stats.totalMinutes >= 3000 },
    { id: 'streak_3', name: 'Racha de 3', description: 'Estudia 3 días consecutivos', icon: '🔥', condition: stats.streak >= 3 },
    { id: 'streak_7', name: 'Semana Completa', description: 'Estudia 7 días consecutivos', icon: '📅', condition: stats.streak >= 7 },
    { id: 'streak_30', name: 'Mes Perfecto', description: 'Estudia 30 días consecutivos', icon: '🌟', condition: stats.streak >= 30 },
    { id: 'level_5', name: 'Nivel 5', description: 'Alcanza el nivel 5', icon: '🎖️', condition: stats.level >= 5 },
    { id: 'level_10', name: 'Nivel 10', description: 'Alcanza el nivel 10', icon: '👑', condition: stats.level >= 10 },
    { id: 'level_20', name: 'Nivel 20', description: 'Alcanza el nivel 20', icon: '💫', condition: stats.level >= 20 }
  ];

  const unlockedAchievements = allAchievements.filter(ach => 
    achievements.find(a => a.id === ach.id) || ach.condition
  );

  const lockedAchievements = allAchievements.filter(ach => 
    !achievements.find(a => a.id === ach.id) && !ach.condition
  );

  const completionPercentage = Math.round((unlockedAchievements.length / allAchievements.length) * 100);

  return (
    <div className="achievements fade-in">
      <div className="achievements-header">
        <h1>🏆 Logros</h1>
        <p>Desbloquea logros completando desafíos</p>
      </div>

      <div className="achievements-progress card">
        <div className="progress-header">
          <h2>Progreso General</h2>
          <span className="progress-percentage">{completionPercentage}%</span>
        </div>
        <div className="progress-bar-container">
          <div 
            className="progress-bar-fill"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
        <div className="progress-stats">
          <span>{unlockedAchievements.length} desbloqueados</span>
          <span>{lockedAchievements.length} pendientes</span>
        </div>
      </div>

      <div className="achievements-section">
        <h2 className="section-title">✨ Logros Desbloqueados ({unlockedAchievements.length})</h2>
        {unlockedAchievements.length === 0 ? (
          <div className="empty-state card">
            <p>🎯 Aún no has desbloqueado ningún logro</p>
            <p className="empty-hint">¡Comienza a estudiar para conseguir tu primer logro!</p>
          </div>
        ) : (
          <div className="achievements-grid">
            {unlockedAchievements.map(achievement => (
              <div key={achievement.id} className="achievement-card unlocked card">
                <div className="achievement-icon">{achievement.icon}</div>
                <h3>{achievement.name}</h3>
                <p>{achievement.description}</p>
                <div className="achievement-badge">Desbloqueado</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="achievements-section">
        <h2 className="section-title">🔒 Logros Bloqueados ({lockedAchievements.length})</h2>
        {lockedAchievements.length === 0 ? (
          <div className="congratulations card">
            <div className="congrats-icon">🎉</div>
            <h2>¡Felicitaciones!</h2>
            <p>Has desbloqueado todos los logros disponibles</p>
            <p className="congrats-message">Eres un verdadero maestro del estudio 🏆</p>
          </div>
        ) : (
          <div className="achievements-grid">
            {lockedAchievements.map(achievement => (
              <div key={achievement.id} className="achievement-card locked card">
                <div className="achievement-icon blurred">❓</div>
                <h3>{achievement.name}</h3>
                <p>{achievement.description}</p>
                <div className="achievement-badge locked-badge">Bloqueado</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="achievements-tips card">
        <h2>💡 Cómo Desbloquear Logros</h2>
        <div className="tips-grid">
          <div className="tip">
            <span className="tip-icon">📚</span>
            <p>Completa sesiones de estudio regularmente</p>
          </div>
          <div className="tip">
            <span className="tip-icon">🔥</span>
            <p>Mantén una racha diaria sin interrupciones</p>
          </div>
          <div className="tip">
            <span className="tip-icon">⏰</span>
            <p>Acumula tiempo total de estudio</p>
          </div>
          <div className="tip">
            <span className="tip-icon">📈</span>
            <p>Sube de nivel ganando experiencia</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Achievements;
