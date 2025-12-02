const express = require('express');
const cors = require('cors');
const db = require('./db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const analizarTexto = require('./sentiment');

const app = express();
const PORT = process.env.PORT || 4000;
const JWT_SECRET = "superclave123";

app.use(cors());
app.use(express.json());

// MIDDLEWARE DE AUTENTICACIÓN (para rutas protegidas)
function authMiddleware(req, res, next) {
  const auth = req.headers['authorization'];
  const token = auth && auth.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Token requerido" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Token inválido" });
    req.user = user;
    next();
  });
}

// Ruta pública de prueba
app.get('/', (req, res) => {
  res.json({ message: 'API funcionando' });
});

// RUTAS DE AUTENTICACIÓN (REGISTER / LOGIN)
const authRoutes = require('./routes/auth');
app.use('/api', authRoutes);

const entriesRoutes = require('./routes/entries');
app.use('/api', authMiddleware, entriesRoutes);


// Ruta privada de prueba (requiere token)
app.get('/api/privado', authMiddleware, (req, res) => {
  res.json({
    message: "Acceso permitido a ruta privada",
    usuario: req.user
  });
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
