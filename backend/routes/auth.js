const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = "superclave123"; // misma clave que en index.js

// REGISTRO
router.post('/register', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email y contraseña requeridos" });
  }

  const password_hash = bcrypt.hashSync(password, 10);

  const query = `INSERT INTO users (email, password_hash) VALUES (?, ?)`;

  db.run(query, [email, password_hash], function (err) {
    if (err) {
      console.error("Error al registrar usuario:", err);
      return res.status(400).json({ message: "El usuario ya existe o error en la base de datos" });
    }

    return res.json({ message: "Usuario registrado correctamente" });
  });
});

// LOGIN
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email y contraseña requeridos" });
  }

  db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, user) => {
    if (err) {
      console.error("Error en la base de datos:", err);
      return res.status(500).json({ message: "Error en la base de datos" });
    }

    if (!user) {
      return res.status(400).json({ message: "Usuario o contraseña incorrectos" });
    }

    const esValida = bcrypt.compareSync(password, user.password_hash);

    if (!esValida) {
      return res.status(400).json({ message: "Usuario o contraseña incorrectos" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({ message: "Login exitoso", token });
  });
});

module.exports = router;
