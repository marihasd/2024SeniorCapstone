const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost', // Change if needed
    user: 'your_username', // Your MySQL username
    password: 'your_password', // Your MySQL password
    database: 'your_database_name', // Your MySQL database name
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL connected...');
});

// Route to insert product
app.post('/api/products', (req, res) => {
    const productData = req.body;
    const query = 'INSERT INTO products SET ?'; // Make sure your table is named 'products'
    
    db.query(query, productData, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Product added', id: result.insertId });
    });
});

// Route to search product by ID
app.get('/api/products/:id', (req, res) => {
    const productId = req.params.id;
    const query = 'SELECT * FROM products WHERE id = ?'; // Adjust based on your column names

    db.query(query, [productId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
