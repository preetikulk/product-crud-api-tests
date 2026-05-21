# 🔗 Curl Commands for API Testing

## Base URL
```
http://localhost:3000/api/products
```

---

## 1️⃣ CREATE - Add a New Product

### Create Product 1 - Test Laptop
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Laptop",
    "category": "Electronics",
    "price": 50000,
    "stock": 10
  }'
```

### Create Product 2 - Gaming Mouse
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Gaming Mouse",
    "category": "Accessories",
    "price": 2500,
    "stock": 25
  }'
```

### Create Product 3 - USB-C Cable
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "USB-C Cable",
    "category": "Accessories",
    "price": 500,
    "stock": 100
  }'
```

---

## 2️⃣ READ - Get All Products

```bash
curl http://localhost:3000/api/products
```

**Pretty print JSON output:**
```bash
curl http://localhost:3000/api/products | json_pp
```

---

## 3️⃣ READ - Get Specific Product by ID

### Get Product with ID 1
```bash
curl http://localhost:3000/api/products/1
```

### Get Product with ID 2
```bash
curl http://localhost:3000/api/products/2
```

---

## 4️⃣ UPDATE - Modify Existing Product

### Update Product 1 - Change Price and Stock
```bash
curl -X PUT http://localhost:3000/api/products/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Laptop",
    "price": 60000,
    "stock": 8
  }'
```

### Update Product 2 - Change Category and Price
```bash
curl -X PUT http://localhost:3000/api/products/2 \
  -H "Content-Type: application/json" \
  -d '{
    "category": "Premium Accessories",
    "price": 3000
  }'
```

---

## 5️⃣ DELETE - Remove Product

### Delete Product with ID 4
```bash
curl -X DELETE http://localhost:3000/api/products/4
```

### Delete Product with ID 5
```bash
curl -X DELETE http://localhost:3000/api/products/5
```

---

## ❌ ERROR HANDLING TESTS

### Test Missing Required Fields
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Incomplete Product"
  }'
```

**Expected Error:**
```json
{
  "error": "Missing required fields: name, category, price, stock"
}
```

---

### Test Non-existent Product
```bash
curl http://localhost:3000/api/products/9999
```

**Expected Error:**
```json
{
  "error": "Product not found"
}
```

---

## 📊 Expected Response Codes

| Operation | Status Code | Meaning |
|-----------|-------------|----------|
| GET (Success) | 200 | OK |
| POST (Success) | 201 | Created |
| PUT (Success) | 200 | OK |
| DELETE (Success) | 200 | OK |
| Bad Request | 400 | Missing required fields |
| Not Found | 404 | Product not found |
