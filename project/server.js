const express = require('express');
const path = require('path');
const db = require('./database');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Routes
// Get all users
app.get('/users', async (req, res) => {
    try {
        const users = await db.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add a new user
app.post('/users', async (req, res) => {
    try {
        const { name, email } = req.body;
        if (!name || !email) {
            return res.status(400).json({ success: false, message: 'Name and email are required' });
        }
        
        const result = await db.addUser(name, email);
        res.json({ success: true, id: result.id });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Delete a user
app.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await db.deleteUser(id);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});