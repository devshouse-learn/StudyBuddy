import React, { useState } from 'react';
import './LoginScreen.css';

function LoginScreen({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isLogin) {
      // Login
      if (formData.email && formData.password) {
        onLogin({
          name: formData.name || formData.email.split('@')[0],
          email: formData.email,
          isGuest: false
        });
      } else {
        alert('Por favor completa todos los campos');
      }
    } else {
      // Registro
      if (formData.name && formData.email && formData.password) {
        onLogin({
          name: formData.name,
          email: formData.email,
          isGuest: false
        });
      } else {
        alert('Por favor completa todos los campos');
      }
    }
  };

  const handleGuestLogin = () => {
    onLogin({
      name: 'Invitado',
      email: 'guest@studybuddy.com',
      isGuest: true
    });
  };

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="floating-icon">📚</div>
        <div className="floating-icon">✏️</div>
        <div className="floating-icon">🎯</div>
        <div className="floating-icon">⏰</div>
        <div className="floating-icon">🏆</div>
      </div>

      <div className="login-card fade-in">
        <div className="login-header">
          <h1 className="login-logo">📚 StudyBuddy</h1>
          <p className="login-tagline">Tu compañero de estudio inteligente</p>
        </div>

        <div className="login-tabs">
          <button 
            className={isLogin ? 'active' : ''} 
            onClick={() => setIsLogin(true)}
          >
            Iniciar Sesión
          </button>
          <button 
            className={!isLogin ? 'active' : ''} 
            onClick={() => setIsLogin(false)}
          >
            Registrarse
          </button>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {!isLogin && (
            <div className="form-group">
              <label>👤 Nombre</label>
              <input
                type="text"
                name="name"
                placeholder="Tu nombre"
                value={formData.name}
                onChange={handleChange}
                required={!isLogin}
              />
            </div>
          )}

          <div className="form-group">
            <label>📧 Email</label>
            <input
              type="email"
              name="email"
              placeholder="tu@email.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>🔒 Contraseña</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block">
            {isLogin ? '🚀 Iniciar Sesión' : '✨ Crear Cuenta'}
          </button>
        </form>

        <div className="divider">
          <span>o</span>
        </div>

        <button 
          onClick={handleGuestLogin} 
          className="btn btn-guest btn-block"
        >
          👤 Continuar como Invitado
        </button>

        <div className="login-features">
          <div className="feature">
            <span className="feature-icon">⏲️</span>
            <span>Pomodoro Timer</span>
          </div>
          <div className="feature">
            <span className="feature-icon">🏆</span>
            <span>Gamificación</span>
          </div>
          <div className="feature">
            <span className="feature-icon">👥</span>
            <span>Salas Colaborativas</span>
          </div>
          <div className="feature">
            <span className="feature-icon">📊</span>
            <span>Estadísticas</span>
          </div>
        </div>
      </div>

      <div className="login-footer">
        <p>StudyBuddy © 2025 - Estudia más inteligentemente, no más tiempo</p>
      </div>
    </div>
  );
}

export default LoginScreen;
