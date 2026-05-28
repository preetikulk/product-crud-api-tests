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

### Get Product with ID 4
```bash
curl http://localhost:3000/api/products/4
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

### Update Product 3 - Increase Stock
```bash
curl -X PUT http://localhost:3000/api/products/3 \
  -H "Content-Type: application/json" \
  -d '{
    "stock": 150
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

### Test Invalid Update (Product Not Found)
```bash
curl -X PUT http://localhost:3000/api/products/9999 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Non-existent Product"
  }'
```

**Expected Error:**
```json
{
  "error": "Product not found"
}
```

---

### Test Invalid Delete (Product Not Found)
```bash
curl -X DELETE http://localhost:3000/api/products/9999
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
|-----------|-------------|---------|
| GET (Success) | 200 | OK |
| POST (Success) | 201 | Created |
| PUT (Success) | 200 | OK |
| DELETE (Success) | 200 | OK |
| Bad Request | 400 | Missing required fields |
| Not Found | 404 | Product not found |

---

## 💾 Product Data Fields

- **id**: Auto-generated unique identifier (number)
- **name**: Product name (string, required)
- **category**: Product category (string, required)
- **price**: Product price in ₹ (number, required)
- **stock**: Available quantity (number, required)

---

## 🎯 Quick Test Sequence

1. **Create:** Add a new product
2. **Read All:** Get all products
3. **Read One:** Get specific product by ID
4. **Update:** Modify product details
5. **Delete:** Remove the product
6. **Verify:** Confirm product is deleted (404 error)

---

## 📝 Notes

- All requests must include `Content-Type: application/json` header for POST/PUT
- Replace product IDs (1, 2, 3, etc.) with actual IDs from your database
- The API server must be running on `http://localhost:3000`
- Use `curl -v` flag for verbose output to see headers and response codes

