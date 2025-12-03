import React, { useState } from 'react';
import './StudyRooms.css';

function StudyRooms({ user }) {
  const [rooms] = useState([
    {
      id: 1,
      name: 'Matemáticas Avanzadas',
      topic: 'Matemáticas',
      members: 12,
      maxMembers: 20,
      icon: '📐',
      description: 'Estudiando cálculo y álgebra lineal'
    },
    {
      id: 2,
      name: 'Programación Web',
      topic: 'Tecnología',
      members: 18,
      maxMembers: 25,
      icon: '💻',
      description: 'React, Node.js y desarrollo full-stack'
    },
    {
      id: 3,
      name: 'Idiomas: Inglés',
      topic: 'Idiomas',
      members: 8,
      maxMembers: 15,
      icon: '🗣️',
      description: 'Práctica de conversación y gramática'
    },
    {
      id: 4,
      name: 'Preparación Exámenes',
      topic: 'General',
      members: 15,
      maxMembers: 30,
      icon: '📝',
      description: 'Sala general para preparar exámenes'
    },
    {
      id: 5,
      name: 'Ciencias Naturales',
      topic: 'Ciencias',
      members: 6,
      maxMembers: 15,
      icon: '🔬',
      description: 'Física, química y biología'
    },
    {
      id: 6,
      name: 'Historia y Humanidades',
      topic: 'Humanidades',
      members: 9,
      maxMembers: 20,
      icon: '📚',
      description: 'Historia, filosofía y literatura'
    }
  ]);

  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [newRoom, setNewRoom] = useState({
    name: '',
    topic: '',
    maxMembers: 20,
    description: ''
  });

  const handleJoinRoom = (roomId) => {
    alert(`¡Te has unido a la sala! 🎉\n\nEn una versión completa, esto abriría una sala de chat en tiempo real donde puedes:\n\n• Ver quién más está estudiando\n• Compartir notas y recursos\n• Hacer preguntas\n• Motivarte mutuamente`);
  };

  const handleCreateRoom = (e) => {
    e.preventDefault();
    alert('¡Sala creada con éxito! 🎉');
    setShowCreateRoom(false);
    setNewRoom({ name: '', topic: '', maxMembers: 20, description: '' });
  };

  const getProgressColor = (members, maxMembers) => {
    const percentage = (members / maxMembers) * 100;
    if (percentage < 50) return '#48bb78';
    if (percentage < 80) return '#ed8936';
    return '#f56565';
  };

  return (
    <div className="study-rooms fade-in">
      <div className="rooms-header">
        <div>
          <h1>👥 Salas de Estudio</h1>
          <p>Únete a una comunidad de estudiantes y aprende juntos</p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => setShowCreateRoom(!showCreateRoom)}
        >
          ➕ Crear Sala
        </button>
      </div>

      {showCreateRoom && (
        <div className="create-room-form card fade-in">
          <h2>Crear Nueva Sala</h2>
          <form onSubmit={handleCreateRoom}>
            <div className="form-group">
              <label>Nombre de la Sala</label>
              <input
                type="text"
                value={newRoom.name}
                onChange={(e) => setNewRoom({...newRoom, name: e.target.value})}
                placeholder="Ej: Matemáticas Nivel 2"
                required
              />
            </div>
            <div className="form-group">
              <label>Tema</label>
              <select
                value={newRoom.topic}
                onChange={(e) => setNewRoom({...newRoom, topic: e.target.value})}
                required
              >
                <option value="">Selecciona un tema</option>
                <option value="Matemáticas">📐 Matemáticas</option>
                <option value="Tecnología">💻 Tecnología</option>
                <option value="Idiomas">🗣️ Idiomas</option>
                <option value="Ciencias">🔬 Ciencias</option>
                <option value="Humanidades">📚 Humanidades</option>
                <option value="General">📝 General</option>
              </select>
            </div>
            <div className="form-group">
              <label>Capacidad Máxima</label>
              <input
                type="number"
                value={newRoom.maxMembers}
                onChange={(e) => setNewRoom({...newRoom, maxMembers: parseInt(e.target.value)})}
                min="5"
                max="50"
                required
              />
            </div>
            <div className="form-group">
              <label>Descripción</label>
              <textarea
                value={newRoom.description}
                onChange={(e) => setNewRoom({...newRoom, description: e.target.value})}
                placeholder="Describe de qué tratará esta sala..."
                rows="3"
                required
              />
            </div>
            <div className="form-buttons">
              <button type="submit" className="btn btn-primary">
                Crear Sala
              </button>
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={() => setShowCreateRoom(false)}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="rooms-grid">
        {rooms.map(room => (
          <div key={room.id} className="room-card card">
            <div className="room-header">
              <span className="room-icon">{room.icon}</span>
              <div className="room-info">
                <h3>{room.name}</h3>
                <span className="room-topic">{room.topic}</span>
              </div>
            </div>
            
            <p className="room-description">{room.description}</p>
            
            <div className="room-members">
              <div className="members-count">
                <span className="count">{room.members}/{room.maxMembers}</span>
                <span className="label">miembros</span>
              </div>
              <div className="members-bar">
                <div 
                  className="members-fill"
                  style={{
                    width: `${(room.members / room.maxMembers) * 100}%`,
                    background: getProgressColor(room.members, room.maxMembers)
                  }}
                />
              </div>
            </div>

            <button 
              className="btn btn-primary btn-block"
              onClick={() => handleJoinRoom(room.id)}
              disabled={room.members >= room.maxMembers}
            >
              {room.members >= room.maxMembers ? '🔒 Sala Llena' : '🚪 Unirse'}
            </button>
          </div>
        ))}
      </div>

      <div className="rooms-benefits card">
        <h2>✨ Beneficios de Estudiar en Grupo</h2>
        <div className="benefits-grid">
          <div className="benefit">
            <span className="benefit-icon">🤝</span>
            <h3>Motivación</h3>
            <p>Estudiar con otros aumenta tu compromiso y motivación</p>
          </div>
          <div className="benefit">
            <span className="benefit-icon">💡</span>
            <h3>Diferentes Perspectivas</h3>
            <p>Aprende de las ideas y enfoques de tus compañeros</p>
          </div>
          <div className="benefit">
            <span className="benefit-icon">🎯</span>
            <h3>Enfoque</h3>
            <p>La presencia de otros te ayuda a mantener la concentración</p>
          </div>
          <div className="benefit">
            <span className="benefit-icon">📈</span>
            <h3>Mejores Resultados</h3>
            <p>Los estudios muestran mejor retención en grupo</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudyRooms;
