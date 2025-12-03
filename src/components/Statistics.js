import React from 'react';
import './Statistics.css';

function Statistics({ sessions, stats }) {
  // Calcular estadísticas por día
  const getSessionsByDay = () => {
    const days = {};
    sessions.forEach(session => {
      const date = new Date(session.date).toLocaleDateString();
      if (!days[date]) {
        days[date] = { count: 0, minutes: 0 };
      }
      days[date].count++;
      days[date].minutes += session.duration;
    });
    return Object.entries(days).slice(-7);
  };

  const dailyStats = getSessionsByDay();
  const maxMinutes = Math.max(...dailyStats.map(([_, data]) => data.minutes), 1);
  
  const averageSession = sessions.length > 0 
    ? Math.round(stats.totalMinutes / sessions.length) 
    : 0;

  const hoursStudied = Math.floor(stats.totalMinutes / 60);
  const minutesRemainder = stats.totalMinutes % 60;

  return (
    <div className="statistics fade-in">
      <div className="stats-header">
        <h1>📊 Tus Estadísticas</h1>
        <p>Analiza tu progreso y mejora continuamente</p>
      </div>

      <div className="stats-overview">
        <div className="overview-card card">
          <div className="overview-icon">⏰</div>
          <div className="overview-content">
            <div className="overview-value">{hoursStudied}h {minutesRemainder}m</div>
            <div className="overview-label">Tiempo Total</div>
          </div>
        </div>

        <div className="overview-card card">
          <div className="overview-icon">📚</div>
          <div className="overview-content">
            <div className="overview-value">{stats.sessionsCompleted}</div>
            <div className="overview-label">Sesiones Completadas</div>
          </div>
        </div>

        <div className="overview-card card">
          <div className="overview-icon">📈</div>
          <div className="overview-content">
            <div className="overview-value">{averageSession} min</div>
            <div className="overview-label">Promedio por Sesión</div>
          </div>
        </div>

        <div className="overview-card card">
          <div className="overview-icon">🔥</div>
          <div className="overview-content">
            <div className="overview-value">{stats.streak} días</div>
            <div className="overview-label">Racha Actual</div>
          </div>
        </div>
      </div>

      <div className="stats-charts">
        <div className="chart-card card">
          <h2>📅 Actividad de los Últimos 7 Días</h2>
          <div className="bar-chart">
            {dailyStats.length === 0 ? (
              <div className="empty-chart">
                <p>Aún no tienes datos suficientes</p>
                <p className="empty-hint">¡Comienza a estudiar para ver tus estadísticas!</p>
              </div>
            ) : (
              <>
                {dailyStats.map(([date, data]) => (
                  <div key={date} className="bar-item">
                    <div className="bar-label">{new Date(date).toLocaleDateString('es', { weekday: 'short' })}</div>
                    <div className="bar-wrapper">
                      <div 
                        className="bar"
                        style={{ height: `${(data.minutes / maxMinutes) * 100}%` }}
                        title={`${data.count} sesiones, ${data.minutes} minutos`}
                      >
                        <span className="bar-value">{data.minutes}m</span>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>

        <div className="insights-card card">
          <h2>💡 Insights</h2>
          <div className="insights-list">
            <div className="insight">
              <span className="insight-icon">🎯</span>
              <div className="insight-content">
                <h3>Nivel {stats.level}</h3>
                <p>¡Sigue así! Solo {500 - (stats.xp % 500)} XP para el siguiente nivel</p>
              </div>
            </div>

            <div className="insight">
              <span className="insight-icon">⭐</span>
              <div className="insight-content">
                <h3>Consistencia</h3>
                <p>
                  {stats.streak === 0 && 'Comienza una racha estudiando hoy'}
                  {stats.streak > 0 && stats.streak < 7 && `¡${stats.streak} días seguidos! Sigue así`}
                  {stats.streak >= 7 && stats.streak < 30 && `¡Excelente! ${stats.streak} días de racha`}
                  {stats.streak >= 30 && `¡Increíble! ${stats.streak} días consecutivos`}
                </p>
              </div>
            </div>

            <div className="insight">
              <span className="insight-icon">📊</span>
              <div className="insight-content">
                <h3>Productividad</h3>
                <p>
                  {averageSession < 20 && 'Intenta sesiones más largas para mejor enfoque'}
                  {averageSession >= 20 && averageSession < 30 && 'Duración ideal de sesiones'}
                  {averageSession >= 30 && 'Excelente duración de sesiones'}
                </p>
              </div>
            </div>

            <div className="insight">
              <span className="insight-icon">🏆</span>
              <div className="insight-content">
                <h3>Logros</h3>
                <p>
                  {stats.sessionsCompleted < 10 && 'Completa 10 sesiones para tu primer logro'}
                  {stats.sessionsCompleted >= 10 && stats.sessionsCompleted < 50 && `${50 - stats.sessionsCompleted} sesiones más para el siguiente logro`}
                  {stats.sessionsCompleted >= 50 && '¡Eres un verdadero estudioso!'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="stats-tips card">
        <h2>📈 Consejos para Mejorar</h2>
        <div className="tips-list">
          <div className="tip-item">
            <span className="tip-number">1</span>
            <div className="tip-text">
              <h3>Establece Metas Diarias</h3>
              <p>Define cuántas sesiones Pomodoro quieres completar cada día</p>
            </div>
          </div>
          <div className="tip-item">
            <span className="tip-number">2</span>
            <div className="tip-text">
              <h3>Mantén la Consistencia</h3>
              <p>Es mejor estudiar un poco cada día que mucho una sola vez</p>
            </div>
          </div>
          <div className="tip-item">
            <span className="tip-number">3</span>
            <div className="tip-text">
              <h3>Revisa tus Estadísticas</h3>
              <p>Analiza tus patrones de estudio y ajusta tu estrategia</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistics;
