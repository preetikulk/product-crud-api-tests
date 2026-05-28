// ===========================
// Authentication Check
// ===========================

window.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        // Redirect to login if not authenticated
        window.location.href = 'login.html';
    }
});

// ===========================
// API Configuration
// ===========================

const API_BASE_URL = 'http://localhost:3000/api';

// ===========================
// Helper Functions
// ===========================

function getAuthToken() {
    return localStorage.getItem('authToken');
}

function getUsername() {
    return localStorage.getItem('username') || 'User';
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('username');
        window.location.href = 'login.html';
    }
}

// ===========================
// DOM Elements
// ===========================

const navLinks = document.querySelectorAll('.nav-link');
const tabContents = document.querySelectorAll('.tab-content');
const productsContainer = document.getElementById('productsContainer');
const refreshBtn = document.getElementById('refreshBtn');
const createForm = document.getElementById('createForm');
const updateForm = document.getElementById('updateForm');
const createResponse = document.getElementById('createResponse');
const updateResponse = document.getElementById('updateResponse');
const apiStatus = document.getElementById('apiStatus');
const lastUpdated = document.getElementById('lastUpdated');
const toastContainer = document.getElementById('toastContainer');

// ===========================
// Event Listeners
// ===========================

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        switchTab(link.dataset.tab);
    });
});

refreshBtn.addEventListener('click', loadProducts);
createForm.addEventListener('submit', handleCreateProduct);
updateForm.addEventListener('submit', handleUpdateProduct);

// ===========================
// Tab Switching
// ===========================

function switchTab(tabName) {
    // Remove active class from all tabs and links
    tabContents.forEach(tab => tab.classList.remove('active'));
    navLinks.forEach(link => link.classList.remove('active'));

    // Add active class to selected tab and link
    document.getElementById(tabName).classList.add('active');
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

    // Load products if switching to products tab
    if (tabName === 'products') {
        loadProducts();
    }
}

// ===========================
// Check API Status
// ===========================

async function checkApiStatus() {
    try {
        const response = await fetch(`${API_BASE_URL}/products`);
        if (response.ok) {
            apiStatus.textContent = '✓ API Online';
            apiStatus.className = 'status-badge online';
            return true;
        }
    } catch (error) {
        apiStatus.textContent = '✗ API Offline';
        apiStatus.className = 'status-badge offline';
        return false;
    }
}

// ===========================
// Load Products
// ===========================

async function loadProducts() {
    productsContainer.innerHTML = `
        <div class="loading-spinner">
            <div class="spinner"></div>
            <p>Loading products...</p>
        </div>
    `;

    try {
        const response = await fetch(`${API_BASE_URL}/products`);
        const products = await response.json();

        if (response.ok) {
            displayProducts(products);
            updateLastUpdated();
        } else {
            showError('Failed to load products');
        }
    } catch (error) {
        console.error('Error loading products:', error);
        showError('Failed to connect to API');
        productsContainer.innerHTML = '<p style="text-align: center; color: #e74c3c;">Error loading products. Make sure the API server is running.</p>';
    }
}

// ===========================
// Display Products
// ===========================

function displayProducts(products) {
    if (products.length === 0) {
        productsContainer.innerHTML = '<p style="text-align: center; color: #7f8c8d;">No products available. Create one to get started!</p>';
        return;
    }

    productsContainer.innerHTML = products.map(product => `
        <div class="product-card">
            <h3>${product.name}</h3>
            <div class="product-info">
                <p>
                    <label>ID:</label>
                    <span>${product.id}</span>
                </p>
                <p>
                    <label>Category:</label>
                    <span>${product.category}</span>
                </p>
                <p>
                    <label>Price:</label>
                    <span>₹${product.price.toLocaleString()}</span>
                </p>
                <p>
                    <label>Stock:</label>
                    <span>${product.stock} units</span>
                </p>
            </div>
            <div class="product-actions">
                <button class="btn-small edit" onclick="editProduct(${product.id})">✏️ Edit</button>
                <button class="btn-small delete" onclick="deleteProduct(${product.id})">🗑️ Delete</button>
            </div>
        </div>
    `).join('');
}

// ===========================
// Create Product
// ===========================

async function handleCreateProduct(e) {
    e.preventDefault();

    const productData = {
        name: document.getElementById('createName').value,
        category: document.getElementById('createCategory').value,
        price: parseFloat(document.getElementById('createPrice').value),
        stock: parseInt(document.getElementById('createStock').value)
    };

    try {
        const response = await fetch(`${API_BASE_URL}/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAuthToken()}`
            },
            body: JSON.stringify(productData)
        });

        const result = await response.json();

        if (response.status === 201) {
            showSuccess(`✓ Product "${result.name}" created successfully!`);
            createResponse.className = 'response-message success';
            createResponse.textContent = `✓ Product created with ID: ${result.id}`;
            createForm.reset();
            setTimeout(() => {
                switchTab('products');
            }, 1500);
        } else if (response.status === 401) {
            showError('Session expired. Please login again.');
            setTimeout(() => {
                logout();
            }, 2000);
        } else {
            showError(result.error || 'Failed to create product');
            createResponse.className = 'response-message error';
            createResponse.textContent = `✗ ${result.error}`;
        }
    } catch (error) {
        console.error('Error creating product:', error);
        showError('Error creating product. Check console for details.');
        createResponse.className = 'response-message error';
        createResponse.textContent = '✗ Error: Unable to connect to API';
    }
}

// ===========================
// Update Product
// ===========================

async function handleUpdateProduct(e) {
    e.preventDefault();

    const productId = parseInt(document.getElementById('updateId').value);
    const updateData = {};

    const name = document.getElementById('updateName').value;
    const category = document.getElementById('updateCategory').value;
    const price = document.getElementById('updatePrice').value;
    const stock = document.getElementById('updateStock').value;

    if (name) updateData.name = name;
    if (category) updateData.category = category;
    if (price) updateData.price = parseFloat(price);
    if (stock) updateData.stock = parseInt(stock);

    if (Object.keys(updateData).length === 0) {
        showError('Please enter at least one field to update');
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateData)
        });

        const result = await response.json();

        if (response.ok) {
            showSuccess(`✓ Product updated successfully!`);
            updateResponse.className = 'response-message success';
            updateResponse.textContent = `✓ Product #${productId} updated`;
            updateForm.reset();
            setTimeout(() => {
                switchTab('products');
            }, 1500);
        } else {
            showError(result.error || 'Failed to update product');
            updateResponse.className = 'response-message error';
            updateResponse.textContent = `✗ ${result.error}`;
        }
    } catch (error) {
        console.error('Error updating product:', error);
        showError('Error updating product. Check console for details.');
        updateResponse.className = 'response-message error';
        updateResponse.textContent = '✗ Error: Unable to connect to API';
    }
}

// ===========================
// Edit Product (Pre-fill form)
// ===========================

async function editProduct(productId) {
    try {
        const response = await fetch(`${API_BASE_URL}/products/${productId}`);
        const product = await response.json();

        if (response.ok) {
            document.getElementById('updateId').value = product.id;
            document.getElementById('updateName').value = product.name;
            document.getElementById('updateCategory').value = product.category;
            document.getElementById('updatePrice').value = product.price;
            document.getElementById('updateStock').value = product.stock;
            switchTab('update');
            showSuccess(`Product #${productId} loaded for editing`);
        } else {
            showError('Product not found');
        }
    } catch (error) {
        console.error('Error fetching product:', error);
        showError('Error fetching product details');
    }
}

// ===========================
// Delete Product
// ===========================

async function deleteProduct(productId) {
    if (!confirm(`Are you sure you want to delete product #${productId}?`)) {
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });

        if (response.ok) {
            showSuccess(`✓ Product #${productId} deleted successfully!`);
            loadProducts();
        } else if (response.status === 401) {
            showError('Session expired. Please login again.');
            setTimeout(() => {
                logout();
            }, 2000);
        } else {
            showError('Failed to delete product');
        }
    } catch (error) {
        console.error('Error deleting product:', error);
        showError('Error deleting product');
    }
}

// ===========================
// Toast Notifications
// ===========================

function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 4000);
}

function showSuccess(message) {
    showToast(message, 'success');
}

function showError(message) {
    showToast(message, 'error');
}

// ===========================
// Update Last Updated Time
// ===========================

function updateLastUpdated() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    lastUpdated.textContent = timeString;
}

// ===========================
// Initialize
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    // Update header with username
    const usernameDisplay = document.getElementById('usernameDisplay');
    if (usernameDisplay) {
        usernameDisplay.textContent = getUsername();
    }
    
    checkApiStatus();
    loadProducts();
    
    // Check API status every 30 seconds
    setInterval(checkApiStatus, 30000);
    
    // Update last updated time periodically
    setInterval(updateLastUpdated, 60000);
});
