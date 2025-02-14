const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const jsonPath = path.join(__dirname, '../DB', 'datos.json'); // Ruta al archivo JSON

// Middleware para parsear JSON
app.use(express.json());
app.use(express.static(path.join(__dirname, '../')));  // Servir archivos estáticos desde la raíz del proyecto

// Ruta para obtener los datos del JSON (Leer)
app.get('/datos', (req, res) => {
    fs.readFile(jsonPath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error al leer el archivo JSON' });
        }
        res.json(JSON.parse(data));  // Enviar datos JSON al cliente
    });
});

// Ruta para guardar nuevos datos en el JSON (Crear)
app.post('/datos', (req, res) => {
    fs.readFile(jsonPath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error al leer el archivo JSON' });
        }

        let jsonData = JSON.parse(data);
        const nuevoDato = req.body;

        // Verificar que los datos sean válidos
        if (!nuevoDato.nombre || !nuevoDato.costo) {
            return res.status(400).json({ error: 'Debe incluir nombre y costo' });
        }

        // Crear un nuevo ID basado en el último elemento
        const nuevoId = jsonData.length > 0 ? jsonData[jsonData.length - 1].id + 1 : 1;
        nuevoDato.id = nuevoId;  // Asignar el nuevo ID al dato

        jsonData.push(nuevoDato);  // Agregar el nuevo dato al array

        // Guardar los datos actualizados en el archivo JSON
        fs.writeFile(jsonPath, JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error al escribir en el archivo JSON' });
            }
            res.json({ mensaje: 'Datos guardados correctamente', data: nuevoDato });
        });
    });
});

// Ruta para actualizar un dato en base al ID (Actualizar)
app.put('/datos/:id', (req, res) => {
    const id = parseInt(req.params.id);

    fs.readFile(jsonPath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error al leer el archivo JSON' });
        }

        let jsonData = JSON.parse(data);
        const index = jsonData.findIndex(dato => dato.id === id);

        if (index === -1) {
            return res.status(404).json({ error: 'Dato no encontrado' });
        }

        const actualizado = { ...jsonData[index], ...req.body };  // Actualizar los datos
        jsonData[index] = actualizado;  // Reemplazar el dato original con el actualizado

        // Guardar los datos actualizados en el archivo JSON
        fs.writeFile(jsonPath, JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error al escribir en el archivo JSON' });
            }
            res.json({ mensaje: 'Dato actualizado correctamente', data: actualizado });
        });
    });
});

// Ruta para eliminar un dato en base al ID (Eliminar)
app.delete('/datos/:id', (req, res) => {
    const id = parseInt(req.params.id);

    fs.readFile(jsonPath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error al leer el archivo JSON' });
        }

        let jsonData = JSON.parse(data);
        const index = jsonData.findIndex(dato => dato.id === id);

        if (index === -1) {
            return res.status(404).json({ error: 'Dato no encontrado' });
        }

        jsonData.splice(index, 1);  // Eliminar el dato

        // Guardar los datos actualizados en el archivo JSON
        fs.writeFile(jsonPath, JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error al escribir en el archivo JSON' });
            }
            res.json({ mensaje: 'Dato eliminado correctamente' });
        });
    });
});

// Configurar el puerto del servidor
const port = 3000;
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
