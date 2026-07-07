const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware para procesar datos del formulario
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Servir archivos estáticos (index.html, form.html, gracias.html)
app.use(express.static(__dirname));

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/formulario')
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch(err => console.error('❌ Error de conexión:', err));

// Definir esquema y modelo
const contactoSchema = new mongoose.Schema({
  nombre: String,
  correo: String,
  mensaje: String
});

const Contacto = mongoose.model('Contacto', contactoSchema);

app.post('/guardar', async (req, res) => {
  try {
    const nuevoContacto = new Contacto(req.body);
    await nuevoContacto.save();

    // Redirige a la página de gracias
    res.redirect('/gracias.html');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al guardar: ' + error);
  }
});

// Arrancar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
