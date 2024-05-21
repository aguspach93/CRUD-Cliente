const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Almacenamiento en memoria
let users = [];
let currentId = 1;

// Crear (Create)
app.post('/users', (req, res) => {
    const newUser = { id: currentId++, ...req.body };
    users.push(newUser);
    res.status(201).json(newUser);
});

// Leer (Read) - Obtener todos los usuarios
app.get('/users', (req, res) => {
    res.json(users);
});

// Leer (Read) - Obtener un usuario por ID
app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id == req.params.id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).send('User not found');
    }
});

// Actualizar (Update)
app.put('/users/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id == req.params.id);
    if (userIndex !== -1) {
        users[userIndex] = { id: req.params.id, ...req.body };
        res.json(users[userIndex]);
    } else {
        res.status(404).send('User not found');
    }
});

// Borrar (Delete)
app.delete('/users/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id == req.params.id);
    if (userIndex !== -1) {
        users.splice(userIndex, 1);
        res.status(204).send();
    } else {
        res.status(404).send('User not found');
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
