// ===========================
// Login Page Script
// ===========================

const API_BASE_URL = 'http://localhost:3000/api';
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const errorMessage = document.getElementById('errorMessage');
const loadingSpan = document.querySelector('.loading');
const loginText = document.querySelector('.login-text');

// Check if user is already logged in
window.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('authToken');
    if (token) {
        // User is already logged in, redirect to main app
        window.location.href = 'index.html';
    }
});

// Handle login form submission
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    if (!username || !password) {
        showError('Please enter both username and password');
        return;
    }

    await login(username, password);
});

// Login function
async function login(username, password) {
    try {
        // Show loading state
        loadingSpan.style.display = 'inline';
        loginText.style.display = 'none';
        loginForm.querySelector('button').disabled = true;

        const response = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok && data.token) {
            // Store token in localStorage
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('username', username);
            
            // Show success message briefly before redirect
            showSuccess('Login successful! Redirecting...');
            
            // Redirect to main app after 1 second
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        } else {
            showError(data.message || 'Invalid username or password');
            resetForm();
        }
    } catch (error) {
        console.error('Login error:', error);
        showError('Failed to connect to server. Please try again.');
        resetForm();
    }
}

// Show error message
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add('show');
    setTimeout(() => {
        errorMessage.classList.remove('show');
    }, 5000);
}

// Show success message
function showSuccess(message) {
    errorMessage.textContent = message;
    errorMessage.style.background = '#d4edda';
    errorMessage.style.color = '#155724';
    errorMessage.style.borderColor = '#c3e6cb';
    errorMessage.classList.add('show');
}

// Reset form state
function resetForm() {
    loadingSpan.style.display = 'none';
    loginText.style.display = 'inline';
    loginForm.querySelector('button').disabled = false;
}
