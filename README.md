Diario Emocional

Aplicación web que permite a los usuarios escribir entradas de diario y obtener análisis emocional automático del texto. El sistema identifica si la entrada es positiva, negativa o neutral y muestra estadísticas generales. Incluye autenticación mediante JWT, editor de entradas, historial con filtros y una gráfica emocional.

Objetivo del proyecto

Desarrollar una aplicación web funcional donde los usuarios puedan:

Crear una cuenta e iniciar sesión.

Escribir entradas de diario con análisis emocional automático.

Visualizar un historial filtrable por emoción, fecha o texto.

Consultar estadísticas generales mediante una gráfica.

Mantener sus datos protegidos mediante autenticación JWT.

Este proyecto corresponde al Proyecto Nivel 3.

Tecnologías utilizadas

Backend:

Node.js

Express

SQLite3

JSON Web Tokens (jsonwebtoken)

bcrypt

sentiment

CORS

Frontend:

React

Vite

Chart.js

CSS

Instalación y ejecución local

El proyecto está dividido en dos carpetas: backend y frontend.

Clonar el repositorio:
git clone https://github.com/camv160199/diario-emocional.git

cd diario-emocional

Instalar dependencias del backend:
cd backend
npm install

Ejecutar el servidor del backend:
node index.js
El servidor se ejecutará en http://localhost:4000

Instalar dependencias del frontend:
cd ../frontend
npm install

Ejecutar el frontend:
npm run dev
Acceder al enlace que muestra Vite (ej. http://localhost:5173
)

Autenticación

El sistema utiliza JWT. Para acceder al dashboard es necesario iniciar sesión. Las rutas protegidas requieren enviar el token en el encabezado Authorization con el formato:
Bearer TOKEN

Funcionalidades incluidas

Registro e inicio de sesión de usuarios

Editor para escribir entradas

Análisis emocional del texto

Guardado automático de la emoción y puntaje

Historial de entradas filtrable por emoción, fechas y búsqueda por texto

Estadísticas generales del usuario

Gráfica emocional generada con Chart.js

Interfaz limpia y fácil de usar

Nota importante sobre despliegue

El proyecto utiliza SQLite, por lo que solo funciona en modo local. Plataformas como Railway, Render o Vercel no soportan SQLite. Para desplegar la aplicación sería necesario migrar la base de datos a PostgreSQL o Supabase.

Autor

Carlos Munguía
Proyecto académico — Desarrollo Web Nivel 3
2025
