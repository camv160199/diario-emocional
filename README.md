Diario Emocional — Plataforma de Análisis Emocional

Aplicación web completa que permite escribir entradas de diario, analizar emociones automáticamente y visualizar estadísticas del estado emocional a lo largo del tiempo.

Incluye:

Backend con Node.js + Express

Base de datos SQLite (local)

Frontend con React + Vite

Análisis emocional con IA (sentiment.js)

Autenticación JWT

Gráficas con Chart.js

🎯 Objetivo del proyecto

Crear una plataforma donde los usuarios puedan:

Registrar entradas de diario.

Recibir análisis emocional del texto (positivo, negativo o neutral).

Visualizar estadísticas dinámicas.

Consultar un historial filtrable.

Autenticarse mediante JSON Web Tokens.

Este proyecto cumple con los requisitos del Proyecto Nivel 3.

🧩 Tecnologías utilizadas

Frontend:

React

Vite

Chart.js

CSS personalizado

Backend:

Node.js + Express

SQLite3

JWT (jsonwebtoken)

bcrypt

CORS

sentiment

🛠 Instalación y ejecución local

El proyecto está dividido en dos carpetas principales:

/backend
/frontend

Sigue estos pasos para ejecutarlo:

1. Clonar el repositorio

git clone https://github.com/camv160199/diario-emocional.git

cd diario-emocional

⚙️ 2. Backend — Instalación

cd backend
npm install

▶️ 3. Backend — Ejecutar el servidor

node index.js

Debería aparecer:

Servidor ejecutándose en http://localhost:4000

🎨 4. Frontend — Instalación

cd ../frontend
npm install

🚀 5. Frontend — Ejecutar la aplicación

npm run dev

Entrar en el link que aparece, por ejemplo:

http://localhost:5173

🔐 Autenticación

El sistema utiliza JWT.
Cada usuario debe:

Registrarse

Iniciar sesión

Recibir su token

Acceder al dashboard

Sin token no puede entrar.

✨ Funcionalidades del sistema

Registro e inicio de sesión

Editor para escribir entradas

Análisis emocional automático

Guardado de entradas con fecha y emoción

Historial filtrable por:

Emoción

Fecha (hoy, semana, mes)

Texto buscado

Estadísticas:

Total de entradas

Positivas

Negativas

Neutrales

Gráfica de barras

Dashboard limpio y responsivo

Código organizado

📊 Estructura del repositorio

diario-emocional/
├── backend/
│ ├── index.js
│ ├── db.js
│ ├── sentiment.js
│ ├── database.sqlite
│ └── routes/
│ ├── auth.js
│ └── entries.js
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── App.jsx
│ │ └── index.css
│ └── vite.config.js
└── README.md

⚠️ Nota sobre despliegue

SQLite funciona únicamente en modo local.
Plataformas como Railway, Render y Vercel no permiten SQLite, por lo que el proyecto solo puede ejecutarse localmente.

Para desplegarlo en la nube es necesario migrar a PostgreSQL o Supabase (opcional para este proyecto).

👤 Autor

Carlos Munguía
Proyecto académico — Desarrollo Web Nivel 3
2025

🎉 ¡Gracias por revisar este proyecto!

Mejoras futuras recomendadas:

Migración a PostgreSQL para permitir despliegue online

PWA para funcionamiento offline

Modo oscuro

Análisis emocional avanzado usando APIs de IA
