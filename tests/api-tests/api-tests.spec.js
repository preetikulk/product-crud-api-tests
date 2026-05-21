const { test, expect } = require('@playwright/test');

const BASE_URL = 'http://localhost:3000/api';

test.describe('Products API - CRUD Tests', () => {
  let productId;

  // Test 1: Create a new product
  test('✅ CREATE - Add a new product', async ({ request }) => {
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
    productId = responseBody.id;
    expect(productId).toBeDefined();
    expect(responseBody.name).toBe('Test Laptop');
    expect(responseBody.price).toBe(50000);
  });

  // Test 2: Get all products
  test('📖 READ - Get all products', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/products`);
    expect(response.status()).toBe(200);
    const products = await response.json();
    expect(Array.isArray(products)).toBeTruthy();
    expect(products.length).toBeGreaterThan(0);
  });

  // Test 3: Get a single product by ID
  test('🔍 READ - Get a single product by ID', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/products/${productId}`);
    expect(response.status()).toBe(200);
    const product = await response.json();
    expect(product.id).toBe(productId);
    expect(product.name).toBe('Test Laptop');
  });

  // Test 4: Update an existing product
  test('✏️ UPDATE - Modify an existing product', async ({ request }) => {
    const response = await request.put(`${BASE_URL}/products/${productId}`, {
      data: {
        name: 'Updated Test Laptop',
        price: 55000,
        stock: 5,
      },
    });
    expect(response.status()).toBe(200);
    const updatedProduct = await response.json();
    expect(updatedProduct.name).toBe('Updated Test Laptop');
    expect(updatedProduct.price).toBe(55000);
    expect(updatedProduct.stock).toBe(5);
  });

  // Test 5: Delete a product
  test('🗑️ DELETE - Remove a product', async ({ request }) => {
    const response = await request.delete(`${BASE_URL}/products/${productId}`);
    expect(response.status()).toBe(200);

    const getResponse = await request.get(`${BASE_URL}/products/${productId}`);
    expect(getResponse.status()).toBe(404);
  });

  // Test 6: Error handling - Create product with missing fields
  test('❌ ERROR - Create product with missing fields', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/products`, {
      data: {
        name: 'Incomplete Product',
      },
    });
    expect(response.status()).toBe(400);
  });

  // Test 7: Error handling - Get non-existent product
  test('❌ ERROR - Get non-existent product', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/products/9999`);
    expect(response.status()).toBe(404);
  });
});