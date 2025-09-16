const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

// Initialize database
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
});

// Get all users
function getAllUsers() {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM users ORDER BY created_at DESC", (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

// Add a new user
function addUser(name, email) {
    return new Promise((resolve, reject) => {
        db.run("INSERT INTO users (name, email) VALUES (?, ?)", [name, email], function(err) {
            if (err) {
                reject(err);
            } else {
                resolve({ id: this.lastID });
            }
        });
    });
}

// Delete a user
function deleteUser(id) {
    return new Promise((resolve, reject) => {
        db.run("DELETE FROM users WHERE id = ?", [id], function(err) {
            if (err) {
                reject(err);
            } else {
                resolve({ changes: this.changes });
            }
        });
    });
}

module.exports = {
    getAllUsers,
    addUser,
    deleteUser
};