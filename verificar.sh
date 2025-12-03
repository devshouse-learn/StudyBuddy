#!/bin/bash

# 🎯 Script de Verificación - StudyBuddy
# Verifica que todo esté correcto antes de comenzar

echo "======================================"
echo "📚 StudyBuddy - Verificación del Setup"
echo "======================================"
echo ""

# Verificar Node.js
echo "🔍 Verificando Node.js..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    echo "✅ Node.js instalado: $NODE_VERSION"
else
    echo "❌ Node.js no está instalado"
    echo "   Instala desde: https://nodejs.org"
    exit 1
fi

# Verificar npm
echo ""
echo "🔍 Verificando npm..."
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    echo "✅ npm instalado: $NPM_VERSION"
else
    echo "❌ npm no está instalado"
    exit 1
fi

# Verificar dependencias
echo ""
echo "🔍 Verificando dependencias..."
if [ -d "node_modules" ]; then
    echo "✅ node_modules existe"
else
    echo "⚠️  node_modules no encontrado"
    echo "   Ejecutando: npm install"
    npm install
fi

# Verificar archivos principales
echo ""
echo "🔍 Verificando archivos principales..."

FILES=(
    "package.json"
    "public/index.html"
    "src/App.js"
    "src/index.js"
    "src/components/LoginScreen.js"
    "src/components/Dashboard.js"
    "src/components/PomodoroTimer.js"
    "src/components/StudyRooms.js"
    "src/components/Statistics.js"
    "src/components/Achievements.js"
    "src/components/Settings.js"
    "src/components/Help.js"
)

ALL_OK=true
for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file - NO ENCONTRADO"
        ALL_OK=false
    fi
done

# Verificar Git
echo ""
echo "🔍 Verificando Git..."
if [ -d ".git" ]; then
    echo "✅ Repositorio Git inicializado"
    REMOTE=$(git remote -v | grep origin | head -1)
    if [ -n "$REMOTE" ]; then
        echo "✅ Remote configurado:"
        echo "   $REMOTE"
    fi
else
    echo "⚠️  No es un repositorio Git"
fi

# Resumen
echo ""
echo "======================================"
if [ "$ALL_OK" = true ]; then
    echo "✅ ¡Todo listo para comenzar!"
    echo ""
    echo "🚀 Para iniciar la aplicación:"
    echo "   npm start"
    echo ""
    echo "🌐 Se abrirá en: http://localhost:3000"
else
    echo "⚠️  Algunos archivos faltan"
    echo "   Revisa los errores arriba"
fi
echo "======================================"
