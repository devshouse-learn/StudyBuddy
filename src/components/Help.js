import React, { useState } from 'react';
import './Help.css';

function Help() {
  const [activeCategory, setActiveCategory] = useState('general');
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const categories = [
    { id: 'general', name: 'General', icon: '📚' },
    { id: 'pomodoro', name: 'Pomodoro', icon: '⏲️' },
    { id: 'rooms', name: 'Salas', icon: '👥' },
    { id: 'achievements', name: 'Logros', icon: '🏆' },
    { id: 'account', name: 'Cuenta', icon: '👤' }
  ];

  const faqs = {
    general: [
      {
        question: '¿Qué es StudyBuddy?',
        answer: 'StudyBuddy es una aplicación de estudio inteligente que combina la técnica Pomodoro, gamificación y salas de estudio colaborativas para ayudarte a estudiar de manera más efectiva.'
      },
      {
        question: '¿Necesito crear una cuenta?',
        answer: 'No es obligatorio. Puedes usar StudyBuddy como invitado, pero tus datos solo se guardarán localmente. Si creas una cuenta, podrás sincronizar tus datos en múltiples dispositivos.'
      },
      {
        question: '¿Cómo funciona el sistema de niveles?',
        answer: 'Ganas experiencia (XP) completando sesiones de estudio. Cada 5 minutos de estudio te dan 10 XP. Necesitas 500 XP para subir de nivel.'
      },
      {
        question: '¿Mis datos están seguros?',
        answer: 'Tus datos se guardan localmente en tu navegador usando localStorage. Si eres usuario registrado, también se sincronizan de forma segura en nuestros servidores.'
      }
    ],
    pomodoro: [
      {
        question: '¿Qué es la técnica Pomodoro?',
        answer: 'Es un método de gestión del tiempo que divide el trabajo en intervalos de 25 minutos (llamados "pomodoros") separados por breves descansos de 5 minutos.'
      },
      {
        question: '¿Puedo personalizar los tiempos?',
        answer: 'Sí, en Configuración puedes ajustar la duración de las sesiones de estudio, descansos cortos y descansos largos según tus preferencias.'
      },
      {
        question: '¿Qué pasa si necesito pausar?',
        answer: 'Puedes pausar el temporizador en cualquier momento haciendo clic en el botón de pausa. Sin embargo, para obtener los beneficios completos del método Pomodoro, se recomienda completar sesiones completas sin interrupciones.'
      },
      {
        question: '¿Cuándo debo tomar un descanso largo?',
        answer: 'Después de completar 4 sesiones Pomodoro (4 x 25 minutos), se recomienda tomar un descanso largo de 15-30 minutos para recargar energías.'
      }
    ],
    rooms: [
      {
        question: '¿Qué son las salas de estudio?',
        answer: 'Son espacios virtuales donde puedes estudiar junto a otros estudiantes. Puedes unirte a salas existentes o crear la tuya propia según tus temas de interés.'
      },
      {
        question: '¿Puedo chatear en las salas?',
        answer: 'En la versión completa, sí. Las salas incluyen chat en tiempo real, compartir recursos, y ver quién está estudiando en ese momento.'
      },
      {
        question: '¿Cómo creo mi propia sala?',
        answer: 'Ve a la sección de Salas y haz clic en "Crear Sala". Elige un nombre, tema, capacidad máxima y una descripción para tu sala.'
      },
      {
        question: '¿Puedo estudiar solo?',
        answer: '¡Por supuesto! Las salas son completamente opcionales. Puedes usar el temporizador Pomodoro y todas las demás funciones sin unirte a ninguna sala.'
      }
    ],
    achievements: [
      {
        question: '¿Cómo desbloqueo logros?',
        answer: 'Los logros se desbloquean automáticamente al cumplir ciertos objetivos, como completar un número específico de sesiones, acumular tiempo de estudio, o mantener rachas diarias.'
      },
      {
        question: '¿Para qué sirven los logros?',
        answer: 'Los logros son una forma de motivación y reconocimiento de tu progreso. Aunque no tienen un valor tangible, ayudan a mantener tu motivación y compromiso con el estudio.'
      },
      {
        question: '¿Puedo ver logros bloqueados?',
        answer: 'Sí, en la sección de Logros puedes ver tanto los logros que has desbloqueado como los que aún están bloqueados, junto con sus requisitos.'
      }
    ],
    account: [
      {
        question: '¿Qué diferencia hay entre invitado y usuario registrado?',
        answer: 'Como invitado, tus datos solo se guardan localmente. Como usuario registrado, tus datos se sincronizan en la nube y puedes acceder desde cualquier dispositivo.'
      },
      {
        question: '¿Puedo cambiar mi contraseña?',
        answer: 'Sí, en la sección de Configuración puedes actualizar tu información de cuenta, incluyendo tu contraseña.'
      },
      {
        question: '¿Qué pasa si borro mis datos?',
        answer: 'Si usas la opción "Borrar Todos los Datos" en Configuración, se eliminarán permanentemente todas tus sesiones, estadísticas y logros. Esta acción no se puede deshacer.'
      }
    ]
  };

  const guides = [
    {
      title: 'Comenzando con StudyBuddy',
      icon: '🚀',
      steps: [
        'Inicia sesión o continúa como invitado',
        'Ve a la sección Pomodoro y configura tu primera sesión',
        'Comienza a estudiar y completa tu primer Pomodoro',
        'Revisa tus estadísticas y desbloquea logros',
        'Únete a salas de estudio para motivarte con otros'
      ]
    },
    {
      title: 'Maximizando tu Productividad',
      icon: '📈',
      steps: [
        'Establece metas diarias de sesiones Pomodoro',
        'Personaliza los tiempos según tu capacidad de concentración',
        'Mantén una racha diaria para crear un hábito',
        'Revisa tus estadísticas semanalmente',
        'Estudia en salas temáticas para mayor enfoque'
      ]
    },
    {
      title: 'Técnicas de Estudio Efectivas',
      icon: '🎯',
      steps: [
        'Divide tareas grandes en sesiones Pomodoro',
        'Elimina distracciones antes de comenzar',
        'Usa los descansos para estirarte y moverte',
        'Alterna entre diferentes materias',
        'Revisa lo aprendido al final del día'
      ]
    }
  ];

  return (
    <div className="help fade-in">
      <div className="help-header">
        <h1>💡 Centro de Ayuda</h1>
        <p>Encuentra respuestas a tus preguntas y aprende a usar StudyBuddy</p>
      </div>

      <div className="help-content">
        <div className="quick-links card">
          <h2>🔗 Accesos Rápidos</h2>
          <div className="links-grid">
            <a href="#faq" className="quick-link">
              <span className="link-icon">❓</span>
              <span>Preguntas Frecuentes</span>
            </a>
            <a href="#guides" className="quick-link">
              <span className="link-icon">📖</span>
              <span>Guías</span>
            </a>
            <a href="#contact" className="quick-link">
              <span className="link-icon">📧</span>
              <span>Contacto</span>
            </a>
            <a href="#shortcuts" className="quick-link">
              <span className="link-icon">⌨️</span>
              <span>Atajos</span>
            </a>
          </div>
        </div>

        <div id="faq" className="faq-section card">
          <h2>❓ Preguntas Frecuentes</h2>
          
          <div className="faq-categories">
            {categories.map(cat => (
              <button
                key={cat.id}
                className={`category-btn ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>

          <div className="faq-list">
            {faqs[activeCategory].map((faq, index) => (
              <div 
                key={index} 
                className={`faq-item ${expandedFAQ === index ? 'expanded' : ''}`}
              >
                <button
                  className="faq-question"
                  onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                >
                  <span>{faq.question}</span>
                  <span className="faq-icon">{expandedFAQ === index ? '▼' : '▶'}</span>
                </button>
                {expandedFAQ === index && (
                  <div className="faq-answer">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div id="guides" className="guides-section">
          <h2 className="section-title">📖 Guías</h2>
          <div className="guides-grid">
            {guides.map((guide, index) => (
              <div key={index} className="guide-card card">
                <div className="guide-header">
                  <span className="guide-icon">{guide.icon}</span>
                  <h3>{guide.title}</h3>
                </div>
                <ol className="guide-steps">
                  {guide.steps.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>

        <div id="shortcuts" className="shortcuts-section card">
          <h2>⌨️ Atajos de Teclado</h2>
          <p className="shortcuts-note">Próximamente disponibles en futuras versiones</p>
          <div className="shortcuts-grid">
            <div className="shortcut">
              <span className="shortcut-key">Espacio</span>
              <span className="shortcut-desc">Pausar/Reanudar temporizador</span>
            </div>
            <div className="shortcut">
              <span className="shortcut-key">R</span>
              <span className="shortcut-desc">Reiniciar temporizador</span>
            </div>
            <div className="shortcut">
              <span className="shortcut-key">S</span>
              <span className="shortcut-desc">Ir a estadísticas</span>
            </div>
            <div className="shortcut">
              <span className="shortcut-key">H</span>
              <span className="shortcut-desc">Abrir ayuda</span>
            </div>
          </div>
        </div>

        <div id="contact" className="contact-section card">
          <h2>📧 ¿Necesitas Más Ayuda?</h2>
          <p>Si no encontraste la respuesta que buscabas, contáctanos:</p>
          <div className="contact-options">
            <div className="contact-option">
              <span className="contact-icon">📧</span>
              <div>
                <h3>Email</h3>
                <p>support@studybuddy.com</p>
              </div>
            </div>
            <div className="contact-option">
              <span className="contact-icon">💬</span>
              <div>
                <h3>Chat en Vivo</h3>
                <p>Disponible de 9:00 a 18:00</p>
              </div>
            </div>
            <div className="contact-option">
              <span className="contact-icon">🐦</span>
              <div>
                <h3>Redes Sociales</h3>
                <p>@StudyBuddyApp</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Help;
