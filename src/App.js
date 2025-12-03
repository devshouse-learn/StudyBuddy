import React, { useState, useEffect } from 'react';
import './App.css';
import LoginScreen from './components/LoginScreen';
import Dashboard from './components/Dashboard';
import PomodoroTimer from './components/PomodoroTimer';
import StudyRooms from './components/StudyRooms';
import Statistics from './components/Statistics';
import Settings from './components/Settings';
import Help from './components/Help';
import Achievements from './components/Achievements';

function App() {
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState('dashboard');
  const [studySessions, setStudySessions] = useState([]);
  const [userStats, setUserStats] = useState({
    totalMinutes: 0,
    sessionsCompleted: 0,
    level: 1,
    xp: 0,
    streak: 0
  });
  const [settings, setSettings] = useState({
    pomodoroLength: 25,
    shortBreak: 5,
    longBreak: 15,
    autoStartBreaks: false,
    notifications: true,
    theme: 'light',
    soundEnabled: true
  });
  const [achievements, setAchievements] = useState([]);

  // Cargar datos del localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('studyBuddyUser');
    const savedSessions = localStorage.getItem('studySessions');
    const savedStats = localStorage.getItem('userStats');
    const savedSettings = localStorage.getItem('settings');
    const savedAchievements = localStorage.getItem('achievements');

    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedSessions) setStudySessions(JSON.parse(savedSessions));
    if (savedStats) setUserStats(JSON.parse(savedStats));
    if (savedSettings) setSettings(JSON.parse(savedSettings));
    if (savedAchievements) setAchievements(JSON.parse(savedAchievements));
  }, []);

  // Guardar datos en localStorage
  useEffect(() => {
    if (user) localStorage.setItem('studyBuddyUser', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('studySessions', JSON.stringify(studySessions));
  }, [studySessions]);

  useEffect(() => {
    localStorage.setItem('userStats', JSON.stringify(userStats));
  }, [userStats]);

  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('achievements', JSON.stringify(achievements));
  }, [achievements]);

  // Aplicar tema
  useEffect(() => {
    document.body.className = settings.theme;
  }, [settings.theme]);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    if (window.confirm('¿Seguro que quieres cerrar sesión?')) {
      setUser(null);
      setCurrentView('dashboard');
    }
  };

  const addStudySession = (session) => {
    const newSession = {
      ...session,
      id: Date.now(),
      date: new Date().toISOString()
    };
    setStudySessions([...studySessions, newSession]);
    
    // Actualizar estadísticas
    const xpGained = Math.floor(session.duration / 5) * 10;
    const newTotalMinutes = userStats.totalMinutes + session.duration;
    const newSessionsCompleted = userStats.sessionsCompleted + 1;
    const newXP = userStats.xp + xpGained;
    const newLevel = Math.floor(newXP / 500) + 1;

    setUserStats({
      ...userStats,
      totalMinutes: newTotalMinutes,
      sessionsCompleted: newSessionsCompleted,
      xp: newXP,
      level: newLevel
    });

    // Verificar logros
    checkAchievements(newSessionsCompleted, newTotalMinutes, newLevel);
  };

  const checkAchievements = (sessions, minutes, level) => {
    const possibleAchievements = [
      { id: 'first_session', name: 'Primera Sesión', description: 'Completa tu primera sesión de estudio', condition: sessions >= 1, icon: '🎯' },
      { id: 'rookie', name: 'Novato', description: 'Completa 5 sesiones de estudio', condition: sessions >= 5, icon: '🌱' },
      { id: 'dedicated', name: 'Dedicado', description: 'Completa 25 sesiones de estudio', condition: sessions >= 25, icon: '⭐' },
      { id: 'master', name: 'Maestro', description: 'Completa 100 sesiones de estudio', condition: sessions >= 100, icon: '🏆' },
      { id: 'hour_club', name: 'Club de la Hora', description: 'Estudia durante 60 minutos', condition: minutes >= 60, icon: '⏰' },
      { id: 'marathon', name: 'Maratonista', description: 'Acumula 10 horas de estudio', condition: minutes >= 600, icon: '🏃' },
      { id: 'level_5', name: 'Nivel 5', description: 'Alcanza el nivel 5', condition: level >= 5, icon: '🎖️' },
      { id: 'level_10', name: 'Nivel 10', description: 'Alcanza el nivel 10', condition: level >= 10, icon: '👑' }
    ];

    const newAchievements = possibleAchievements.filter(ach => 
      ach.condition && !achievements.find(a => a.id === ach.id)
    );

    if (newAchievements.length > 0) {
      setAchievements([...achievements, ...newAchievements]);
      // Mostrar notificación
      if (settings.notifications) {
        newAchievements.forEach(ach => {
          setTimeout(() => alert(`🎉 ¡Logro Desbloqueado! ${ach.icon} ${ach.name}\n${ach.description}`), 100);
        });
      }
    }
  };

  const updateSettings = (newSettings) => {
    setSettings({ ...settings, ...newSettings });
  };

  if (!user) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className={`App ${settings.theme}`}>
      <nav className="navbar">
        <div className="nav-brand">
          <span className="logo">📚 StudyBuddy</span>
          <span className="user-info">
            {user.isGuest ? '👤 Invitado' : `👋 ${user.name}`}
          </span>
        </div>
        <div className="nav-menu">
          <button 
            className={currentView === 'dashboard' ? 'active' : ''} 
            onClick={() => setCurrentView('dashboard')}
          >
            🏠 Inicio
          </button>
          <button 
            className={currentView === 'timer' ? 'active' : ''} 
            onClick={() => setCurrentView('timer')}
          >
            ⏲️ Pomodoro
          </button>
          <button 
            className={currentView === 'rooms' ? 'active' : ''} 
            onClick={() => setCurrentView('rooms')}
          >
            👥 Salas
          </button>
          <button 
            className={currentView === 'stats' ? 'active' : ''} 
            onClick={() => setCurrentView('stats')}
          >
            📊 Stats
          </button>
          <button 
            className={currentView === 'achievements' ? 'active' : ''} 
            onClick={() => setCurrentView('achievements')}
          >
            🏆 Logros
          </button>
          <button 
            className={currentView === 'settings' ? 'active' : ''} 
            onClick={() => setCurrentView('settings')}
          >
            ⚙️ Config
          </button>
          <button 
            className={currentView === 'help' ? 'active' : ''} 
            onClick={() => setCurrentView('help')}
          >
            💡 Ayuda
          </button>
          <button onClick={handleLogout} className="logout-btn">
            🚪 Salir
          </button>
        </div>
      </nav>

      <div className="level-bar">
        <div className="level-info">
          <span className="level-badge">Nivel {userStats.level}</span>
          <div className="xp-bar">
            <div 
              className="xp-fill" 
              style={{ width: `${(userStats.xp % 500) / 5}%` }}
            ></div>
          </div>
          <span className="xp-text">{userStats.xp % 500}/500 XP</span>
        </div>
      </div>

      <main className="main-content">
        {currentView === 'dashboard' && (
          <Dashboard 
            user={user} 
            stats={userStats} 
            recentSessions={studySessions.slice(-5).reverse()}
            onNavigate={setCurrentView}
          />
        )}
        {currentView === 'timer' && (
          <PomodoroTimer 
            settings={settings}
            onSessionComplete={addStudySession}
          />
        )}
        {currentView === 'rooms' && (
          <StudyRooms user={user} />
        )}
        {currentView === 'stats' && (
          <Statistics 
            sessions={studySessions}
            stats={userStats}
          />
        )}
        {currentView === 'achievements' && (
          <Achievements 
            achievements={achievements}
            stats={userStats}
          />
        )}
        {currentView === 'settings' && (
          <Settings 
            settings={settings}
            onUpdateSettings={updateSettings}
            user={user}
          />
        )}
        {currentView === 'help' && (
          <Help />
        )}
      </main>

      <footer className="footer">
        <p>StudyBuddy © 2025 - Tu compañero de estudio inteligente</p>
      </footer>
    </div>
  );
}

export default App;
