const express = require('express');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// In-memory data storage
let products = [
  { id: 1, name: 'Laptop', category: 'Electronics', price: 75000, stock: 15 },
  { id: 2, name: 'Wireless Mouse', category: 'Accessories', price: 1200, stock: 50 },
  { id: 3, name: 'Keyboard', category: 'Accessories', price: 2500, stock: 30 }
];

let nextId = 4;

// API Routes

// GET all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// GET single product by ID
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(product);
});

// POST - Create new product
app.post('/api/products', (req, res) => {
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

// PUT - Update existing product
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

// DELETE - Delete product
app.delete('/api/products/:id', (req, res) => {
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
});