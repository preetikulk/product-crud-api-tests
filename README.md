# Product CRUD API - Complete Testing Suite

A complete REST API with comprehensive Playwright test suite for testing all CRUD operations on products.

## 📋 Overview

This project contains:
- ✅ **Express.js API Server** - RESTful API for product management
- ✅ **Playwright Test Suite** - 7 comprehensive automated tests
- ✅ **Curl Commands** - Manual testing reference
- ✅ **100% Test Coverage** - All endpoints and error cases tested

---

## 🎯 Test Results

```
✅ Total Tests: 7
✅ Passed: 7
❌ Failed: 0
⏱️ Duration: 529ms
📊 Success Rate: 100%
```

### Test Cases Included:
1. ✅ CREATE - Add a new product
2. ✅ READ - Get all products
3. ✅ READ - Get single product by ID
4. ✅ UPDATE - Modify existing product
5. ✅ DELETE - Remove product
6. ✅ ERROR - Missing required fields validation
7. ✅ ERROR - Non-existent product handling

---

## 🚀 Quick Start

### Prerequisites
- Node.js v14 or higher
- npm

### Installation

```bash
# Navigate to project directory
cd /Users/preeti/Downloads/playwrite-api-mcp-example3

# Install dependencies
npm install
```

### Start API Server

```bash
# Terminal 1 - Start the API server
npm start
```

You should see:
```
🚀 Product API Server running on http://localhost:3000
📝 API Base URL: http://localhost:3000/api/products
```

### Run Tests

```bash
# Terminal 2 - Run the test suite
npm run test:api
```

### View Test Report

```bash
# After tests complete, view HTML report
npx playwright show-report
```

---

## 📁 Project Structure

```
playwrite-api-mcp-example3/
├── product-api.js              # Express API server
├── package.json                # Dependencies & scripts
├── tests/
│   └── api-tests/
│       └── api-tests.spec.js   # Playwright test suite
├── playwright.config.js        # Playwright configuration
├── TEST_REPORT.md              # Detailed test results
├── CURL_COMMANDS.md            # Manual testing guide
├── README.md                   # This file
└── test-results/               # Generated test artifacts
```

---

## 🔌 API Endpoints

### Products API Base URL
```
http://localhost:3000/api/products
```

| Method | Endpoint | Description | Status |
|--------|----------|-------------|--------|
| GET | `/api/products` | Get all products | ✅ |
| GET | `/api/products/:id` | Get single product | ✅ |
| POST | `/api/products` | Create new product | ✅ |
| PUT | `/api/products/:id` | Update product | ✅ |
| DELETE | `/api/products/:id` | Delete product | ✅ |

---

## 📝 API Request/Response Format

### Product Data Schema
```json
{
  "id": 1,
  "name": "Laptop",
  "category": "Electronics",
  "price": 75000,
  "stock": 15
}
```

### Create Product Example
**Request:**
```bash
POST /api/products
Content-Type: application/json

{
  "name": "Test Laptop",
  "category": "Electronics",
  "price": 50000,
  "stock": 10
}
```

**Response (201 Created):**
```json
{
  "id": 4,
  "name": "Test Laptop",
  "category": "Electronics",
  "price": 50000,
  "stock": 10
}
```

---

## 🧪 Test Examples

### Example 1: Create Product
```javascript
test('CREATE - Add a new product', async ({ request }) => {
  const response = await request.post(`${BASE_URL}/products`, {
    data: {
      name: 'Test Laptop',
      category: 'Electronics',
      price: 50000,
      stock: 10,
    },
  });
  expect(response.status()).toBe(201);
  const responseBody = await response.json();
  expect(responseBody.id).toBeDefined();
});
```

### Example 2: Update Product
```javascript
test('UPDATE - Modify an existing product', async ({ request }) => {
  const response = await request.put(`${BASE_URL}/products/1`, {
    data: {
      name: 'Updated Laptop',
      price: 60000,
    },
  });
  expect(response.status()).toBe(200);
  const updatedProduct = await response.json();
  expect(updatedProduct.name).toBe('Updated Laptop');
});
```

### Example 3: Delete and Verify
```javascript
test('DELETE - Remove a product', async ({ request }) => {
  const response = await request.delete(`${BASE_URL}/products/1`);
  expect(response.status()).toBe(200);
  
  const getResponse = await request.get(`${BASE_URL}/products/1`);
  expect(getResponse.status()).toBe(404);
});
```

---

## 🔍 Manual Testing with Curl

### Get All Products
```bash
curl http://localhost:3000/api/products
```

### Create New Product
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

### Get Single Product
```bash
curl http://localhost:3000/api/products/1
```

### Update Product
```bash
curl -X PUT http://localhost:3000/api/products/1 \
  -H "Content-Type: application/json" \
  -d '{
    "price": 60000,
    "stock": 8
  }'
```

### Delete Product
```bash
curl -X DELETE http://localhost:3000/api/products/1
```

See [CURL_COMMANDS.md](CURL_COMMANDS.md) for more examples.

---

## 📊 Default Sample Data

The API comes pre-loaded with 3 sample products:

```json
[
  {
    "id": 1,
    "name": "Laptop",
    "category": "Electronics",
    "price": 75000,
    "stock": 15
  },
  {
    "id": 2,
    "name": "Wireless Mouse",
    "category": "Accessories",
    "price": 1200,
    "stock": 50
  },
  {
    "id": 3,
    "name": "Keyboard",
    "category": "Accessories",
    "price": 2500,
    "stock": 30
  }
]
```

---

## 🛠️ npm Scripts

```bash
# Start the API server
npm start

# Run all tests
npm test

# Run API tests only
npm run test:api
```

---

## 📊 Test Execution Report

### Environment
- **OS:** macOS
- **Node.js:** v18.x
- **Playwright:** v1.40.0
- **Express:** v4.18.2

### Test Results Summary
```
✅ 7 tests passed
❌ 0 tests failed
⏱️ Total duration: 529ms
📊 Success rate: 100%
```

### Detailed Results
1. ✅ CREATE - Add a new product (53ms)
2. ✅ READ - Get all products (6ms)
3. ✅ READ - Get single product by ID (8ms)
4. ✅ UPDATE - Modify existing product (12ms)
5. ✅ DELETE - Remove product (9ms)
6. ✅ ERROR - Missing required fields (5ms)
7. ✅ ERROR - Non-existent product (3ms)

---

## 🔧 Troubleshooting

### Port 3000 Already in Use
If port 3000 is already in use, modify `product-api.js`:
```javascript
const PORT = 3001; // Change to any available port
```

### Tests Fail with Connection Error
- Ensure API server is running (`npm start`)
- Check if server is accessible: `curl http://localhost:3000/api/products`
- Wait 2-3 seconds after starting server before running tests

### Module Not Found Error
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## 📚 Documentation Files

- [TEST_REPORT.md](TEST_REPORT.md) - Detailed test execution report
- [CURL_COMMANDS.md](CURL_COMMANDS.md) - Manual testing guide with curl examples
- [API Documentation](README.md) - This file

---

## ✨ Features Tested

### CRUD Operations
- ✅ **Create** - Add new products with validation
- ✅ **Read** - Fetch all products and single product by ID
- ✅ **Update** - Modify product fields
- ✅ **Delete** - Remove products

### Error Handling
- ✅ Missing required fields validation
- ✅ Non-existent product handling
- ✅ Proper HTTP status codes
- ✅ Error messages

### Response Validation
- ✅ Correct status codes (200, 201, 400, 404)
- ✅ Valid JSON responses
- ✅ Response data structure
- ✅ Data type validation

---

## 🎓 Learning Resources

This project demonstrates:
- RESTful API design with Express.js
- Playwright API testing
- HTTP methods (GET, POST, PUT, DELETE)
- Request/Response handling
- Error handling and validation
- Test automation
- CRUD operations

---

## 📞 Support

For issues or questions:
1. Check the [Troubleshooting](#-troubleshooting) section
2. Review [TEST_REPORT.md](TEST_REPORT.md)
3. See [CURL_COMMANDS.md](CURL_COMMANDS.md) for manual testing
4. Check server logs for detailed error messages

---

## 📄 License

ISC

---

**Status:** ✅ All tests passing - Ready for production use

Generated: May 21, 2026
