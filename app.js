const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// Lista para almacenar los ciudadanos
const ciudadanos = [];

app.post('/api/registro/ciudadanos', (req, res) => {
  const { nombre, apellidos, DPI, fechaNacimiento, estadoCivil } = req.body;
  if (nombre && apellidos && DPI && fechaNacimiento && estadoCivil) {
    const ciudadano = {
      nombre,
      apellidos,
      DPI,
      fechaNacimiento,
      estadoCivil
    };
    ciudadanos.push(ciudadano);
    res.status(201).json({ message: 'Ciudadano registrado exitosamente' });
  } else {
    res.status(400).json({ error: 'Se requieren todos los campos: nombre, apellidos, DPI, fechaNacimiento, estadoCivil' });
  }
});

app.get('/api/registro/ciudadanos', (req, res) => {
  res.json({ ciudadanos });
});

app.get('/api/registro/ciudadanos/:dpi', (req, res) => {
  const DPIToFind = req.params.dpi;
  const ciudadano = ciudadanos.find(ciudadano => ciudadano.DPI === DPIToFind);

  if (ciudadano) {
    res.json({ ciudadano });
  } else {
    res.status(404).json({ error: 'Ciudadano no encontrado' });
  }
});

app.delete('/api/registro/ciudadanos/:dpi', (req, res) => {
  const DPIToDelete = req.params.dpi;
  const index = ciudadanos.findIndex(ciudadano => ciudadano.DPI === DPIToDelete);

  if (index !== -1) {
    ciudadanos.splice(index, 1);
    res.json({ message: 'Ciudadano eliminado exitosamente' });
  } else {
    res.status(404).json({ error: 'Ciudadano no encontrado' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
