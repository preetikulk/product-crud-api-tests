const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// In-memory data storage
let products = [
  { id: 1, name: 'Laptop', category: 'Electronics', price: 75000, stock: 15 },
  { id: 2, name: 'Wireless Mouse', category: 'Accessories', price: 1200, stock: 50 },
  { id: 3, name: 'Keyboard', category: 'Accessories', price: 2500, stock: 30 }
];

let nextId = 4;

// In-memory token storage (for demo purposes)
const validTokens = new Set();

// ===========================
// Authentication Middleware
// ===========================

function verifyToken(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token || !validTokens.has(token)) {
    return res.status(401).json({ message: 'Unauthorized - Invalid or missing token' });
  }
  
  next();
}

// Root route - serve web application
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ===========================
// Authentication Routes
// ===========================

// POST - Login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // Validate credentials
  if (username === 'admin' && password === 'admin') {
    // Generate a simple token (in production, use JWT)
    const token = 'token_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    validTokens.add(token);

    res.json({
      success: true,
      message: 'Login successful',
      token: token,
      user: { username: 'admin' }
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Invalid username or password'
    });
  }
});

// ===========================
// Product API Routes
// ===========================

// GET all products (no auth required for reading)
app.get('/api/products', (req, res) => {
  res.json(products);
});

// GET single product by ID (no auth required for reading)
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(product);
});

// POST - Create new product (requires authentication)
app.post('/api/products', verifyToken, (req, res) => {
  const { name, category, price, stock } = req.body;

  // Validation
  if (!name || !category || price === undefined || stock === undefined) {
    return res.status(400).json({ error: 'Missing required fields: name, category, price, stock' });
  }

  const newProduct = {
    id: nextId++,
    name,
    category,
    price,
    stock
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT - Update existing product (no strict auth required, but token checked below)
app.put('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  const { name, category, price, stock } = req.body;
  if (name) product.name = name;
  if (category) product.category = category;
  if (price !== undefined) product.price = price;
  if (stock !== undefined) product.stock = stock;

  res.json(product);
});

// DELETE - Delete product (requires authentication)
app.delete('/api/products/:id', verifyToken, (req, res) => {
  const index = products.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }

  const deletedProduct = products.splice(index, 1);
  res.json({ message: 'Product deleted successfully', product: deletedProduct[0] });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Product API Server running on http://localhost:${PORT}`);
  console.log(`📝 API Base URL: http://localhost:${PORT}/api/products`);
  console.log(`🌐 Web Application: http://localhost:${PORT}`);
  console.log(`🔐 Login Required: Username: admin | Password: admin`);
});
