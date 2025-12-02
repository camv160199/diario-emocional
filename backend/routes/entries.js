const express = require('express');
const router = express.Router();
const db = require('../db');
const analizarTexto = require('../sentiment');

// ==========================
//   LISTAR ENTRADAS
// ==========================
router.get('/entries', (req, res) => {
    const user_id = req.user.id;

    db.all(`SELECT * FROM entries WHERE user_id = ? ORDER BY created_at DESC`,
        [user_id],
        (err, rows) => {
            if (err) return res.status(500).json({ message: "Error al obtener entradas" });

            return res.json(rows);
        }
    );
});

// ==========================
//   ESTADÍSTICAS (ANTES DE :id !!!!!)
// ==========================
router.get('/entries/stats', (req, res) => {
    const user_id = req.user.id;

    const queryTotal = `SELECT COUNT(*) AS total FROM entries WHERE user_id = ?`;

    const queryByEmotion = `
        SELECT sentiment_label, COUNT(*) AS count
        FROM entries
        WHERE user_id = ?
        GROUP BY sentiment_label
    `;

    db.get(queryTotal, [user_id], (err, totalRow) => {
        if (err) return res.status(500).json({ message: "Error en estadísticas TOTAL" });

        db.all(queryByEmotion, [user_id], (err2, emotionRows) => {
            if (err2) return res.status(500).json({ message: "Error en estadísticas EMOCIÓN" });

            const byEmotion = {
                positiva: 0,
                negativa: 0,
                neutral: 0
            };

            emotionRows.forEach(row => {
                if (row.sentiment_label === 'positiva') byEmotion.positiva = row.count;
                if (row.sentiment_label === 'negativa') byEmotion.negativa = row.count;
                if (row.sentiment_label === 'neutral') byEmotion.neutral = row.count;
            });

            return res.json({
                total_entries: totalRow.total,
                by_emotion: byEmotion
            });
        });
    });
});

// ==========================
//    CREAR ENTRADA
// ==========================
router.post('/entries', (req, res) => {
    const user_id = req.user.id;
    const { content } = req.body;

    if (!content) {
        return res.status(400).json({ message: "El contenido es requerido" });
    }

    const analisis = analizarTexto(content);
    const label = analisis.label;
    const score = analisis.score;

    const query = `
        INSERT INTO entries (user_id, content, sentiment_label, sentiment_score)
        VALUES (?, ?, ?, ?)
    `;

    db.run(query, [user_id, content, label, score], function (err) {
        if (err) {
            console.error("Error al guardar entrada:", err);
            return res.status(500).json({ message: "Error al guardar entrada" });
        }

        return res.json({
            message: "Entrada creada",
            entry_id: this.lastID,
            sentiment: { label, score }
        });
    });
});

// ==========================
//   OBTENER UNA ENTRADA
// ==========================
router.get('/entries/:id', (req, res) => {
    const user_id = req.user.id;
    const id = req.params.id;

    db.get(`SELECT * FROM entries WHERE id = ? AND user_id = ?`,
        [id, user_id],
        (err, row) => {
            if (err) return res.status(500).json({ message: "Error en la base de datos" });
            if (!row) return res.status(404).json({ message: "Entrada no encontrada" });

            return res.json(row);
        }
    );
});

// ==========================
//   ACTUALIZAR ENTRADA
// ==========================
router.put('/entries/:id', (req, res) => {
    const user_id = req.user.id;
    const id = req.params.id;
    const { content } = req.body;

    if (!content) return res.status(400).json({ message: "Contenido requerido" });

    const analisis = analizarTexto(content);
    const label = analisis.label;
    const score = analisis.score;

    const query = `
        UPDATE entries 
        SET content = ?, sentiment_label = ?, sentiment_score = ?
        WHERE id = ? AND user_id = ?
    `;

    db.run(query, [content, label, score, id, user_id], function (err) {
        if (err) return res.status(500).json({ message: "Error al actualizar" });
        if (this.changes === 0) return res.status(404).json({ message: "Entrada no encontrada" });

        return res.json({ message: "Entrada actualizada", sentiment: { label, score } });
    });
});

// ==========================
//   ELIMINAR ENTRADA
// ==========================
router.delete('/entries/:id', (req, res) => {
    const user_id = req.user.id;
    const id = req.params.id;

    db.run(`DELETE FROM entries WHERE id = ? AND user_id = ?`,
        [id, user_id],
        function (err) {
            if (err) return res.status(500).json({ message: "Error al eliminar" });
            if (this.changes === 0) return res.status(404).json({ message: "Entrada no encontrada" });

            return res.json({ message: "Entrada eliminada" });
        }
    );
});

module.exports = router;
