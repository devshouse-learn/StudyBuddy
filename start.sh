#!/bin/bash

# 📚 StudyBuddy - Script de Inicio
# Este script instala las dependencias e inicia la aplicación

echo "═══════════════════════════════════════════════"
echo "📚 Bienvenido a StudyBuddy"
echo "Tu compañero de estudio inteligente"
echo "═══════════════════════════════════════════════"
echo ""

# Verificar si Node.js está instalado
if ! command -v node &> /dev/null
then
    echo "❌ Error: Node.js no está instalado"
    echo "Por favor instala Node.js desde https://nodejs.org"
    exit 1
fi

echo "✅ Node.js detectado: $(node --version)"
echo ""

# Verificar si npm está instalado
if ! command -v npm &> /dev/null
then
    echo "❌ Error: npm no está instalado"
    exit 1
fi

echo "✅ npm detectado: $(npm --version)"
echo ""

# Verificar si node_modules existe
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependencias..."
    echo "Esto puede tomar unos minutos..."
    echo ""
    npm install
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "✅ Dependencias instaladas correctamente"
    else
        echo ""
        echo "❌ Error al instalar dependencias"
        exit 1
    fi
else
    echo "✅ Dependencias ya instaladas"
fi

echo ""
echo "═══════════════════════════════════════════════"
echo "🚀 Iniciando StudyBuddy..."
echo "═══════════════════════════════════════════════"
echo ""
echo "📝 La aplicación se abrirá en tu navegador"
echo "🌐 URL: http://localhost:3000"
echo ""
echo "💡 Presiona Ctrl+C para detener la aplicación"
echo ""
echo "═══════════════════════════════════════════════"
echo ""

# Iniciar la aplicación
npm start
