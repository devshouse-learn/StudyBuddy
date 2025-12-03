# 🚀 INSTALACIÓN Y DESPLIEGUE

## 📦 Instalación Local

### Requisitos Previos
- Node.js v14 o superior
- npm o yarn
- Git

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/devshouse-learn/StudyBuddy.git
cd StudyBuddy
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Iniciar en modo desarrollo**
```bash
npm start
```

La aplicación se abrirá automáticamente en `http://localhost:3000`

---

## 🌐 Despliegue

### Despliegue en Vercel (Recomendado)

1. **Fork o clona este repositorio**

2. **Ve a [Vercel](https://vercel.com)**

3. **Importa el proyecto**
   - Click en "New Project"
   - Selecciona el repositorio StudyBuddy
   - Framework Preset: Create React App
   - Click en "Deploy"

4. **¡Listo!** Tu app estará disponible en `https://tu-proyecto.vercel.app`

### Despliegue en Netlify

1. **Ve a [Netlify](https://netlify.com)**

2. **Arrastra la carpeta `build`** o conecta el repositorio

3. **Configuración de Build:**
   ```
   Build command: npm run build
   Publish directory: build
   ```

4. **Deploy**

### Despliegue en GitHub Pages

1. **Instala gh-pages**
```bash
npm install --save-dev gh-pages
```

2. **Agrega scripts en package.json**
```json
"homepage": "https://devshouse-learn.github.io/StudyBuddy",
"predeploy": "npm run build",
"deploy": "gh-pages -d build"
```

3. **Despliega**
```bash
npm run deploy
```

---

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm start          # Inicia el servidor de desarrollo

# Producción
npm run build      # Crea build optimizado
npm test           # Ejecuta tests
npm run eject      # Expone configuración (irreversible)
```

---

## 🐳 Docker (Opcional)

### Dockerfile
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

### Construir y ejecutar
```bash
docker build -t studybuddy .
docker run -p 3000:3000 studybuddy
```

---

## ⚙️ Variables de Entorno

Crea un archivo `.env` en la raíz (opcional):

```env
# Puerto de desarrollo (opcional)
PORT=3000

# Variables para futuras integraciones
REACT_APP_API_URL=https://api.studybuddy.com
```

---

## 🔒 Seguridad

- Los datos se guardan localmente en localStorage
- No se requiere backend para el funcionamiento básico
- Para producción, considera implementar:
  - Backend con autenticación JWT
  - Base de datos (PostgreSQL/MongoDB)
  - HTTPS obligatorio

---

## 📊 Estructura del Proyecto

```
StudyBuddy/
├── public/                 # Archivos estáticos
│   └── index.html
├── src/
│   ├── components/         # Componentes React
│   │   ├── LoginScreen.js
│   │   ├── Dashboard.js
│   │   ├── PomodoroTimer.js
│   │   ├── StudyRooms.js
│   │   ├── Statistics.js
│   │   ├── Achievements.js
│   │   ├── Settings.js
│   │   └── Help.js
│   ├── App.js             # Componente principal
│   ├── App.css            # Estilos globales
│   └── index.js           # Punto de entrada
├── package.json           # Dependencias
├── README.md             # Documentación
└── .gitignore            # Archivos ignorados
```

---

## 🐛 Solución de Problemas

### Error: "npm ERR! Missing script: start"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Puerto 3000 ocupado
```bash
PORT=3001 npm start
```

### Error de permisos
```bash
sudo npm install -g npm
```

### Build falla
```bash
npm cache clean --force
npm install
npm run build
```

---

## 🤝 Contribuir

1. Fork el proyecto
2. Crea tu rama (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add: AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📝 Licencia

Este proyecto es de código abierto con fines educativos.

---

## 📧 Soporte

- **Issues:** https://github.com/devshouse-learn/StudyBuddy/issues
- **Email:** support@studybuddy.com
- **Docs:** [README.md](./README.md)

---

**Desarrollado con ❤️ por DevHouse**

🌟 Si te gusta el proyecto, ¡danos una estrella en GitHub!
