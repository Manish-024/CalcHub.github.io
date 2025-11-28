// Common utility functions used across calculators

/**
 * Format a number with thousand separators
 * @param {number} num - The number to format
 * @returns {string} Formatted number
 */
function formatNumber(num) {
    return num.toLocaleString('en-US');
}

/**
 * Validate if a value is a positive number
 * @param {*} value - Value to validate
 * @returns {boolean}
 */
function isPositiveNumber(value) {
    const num = parseFloat(value);
    return !isNaN(num) && num > 0;
}

/**
 * Show a user-friendly error message
 * @param {string} message - Error message to display
 */
function showError(message) {
    alert(message);
}

/**
 * Get current date in YYYY-MM-DD format
 * @returns {string}
 */
function getCurrentDate() {
    return new Date().toISOString().split('T')[0];
}

/**
 * Get current time in HH:MM format
 * @returns {string}
 */
function getCurrentTime() {
    return new Date().toTimeString().slice(0, 5);
}

/**
 * Debounce function for performance optimization
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function}
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise}
 */
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (err) {
        console.error('Failed to copy:', err);
        return false;
    }
}

/**
 * Add real-time input validation
 * @param {HTMLInputElement} input - Input element to validate
 */
function addInputValidation(input) {
    if (input.type === 'number') {
        input.addEventListener('input', function() {
            const value = parseFloat(this.value);
            const min = parseFloat(this.min);
            const max = parseFloat(this.max);

            if (this.value && !isNaN(value)) {
                if (min !== undefined && !isNaN(min) && value < min) {
                    this.setCustomValidity(`Value must be at least ${min}`);
                } else if (max !== undefined && !isNaN(max) && value > max) {
                    this.setCustomValidity(`Value must be at most ${max}`);
                } else {
                    this.setCustomValidity('');
                }
            } else {
                this.setCustomValidity('');
            }
        });
    }
}

/**
 * Initialize all input validations on page
 */
function initializeValidations() {
    document.querySelectorAll('input[type="number"]').forEach(input => {
        addInputValidation(input);
    });
}

// Auto-initialize when DOM is loaded
if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeValidations);
    } else {
        initializeValidations();
    }
}

/**
 * Check if browser supports local storage
 * @returns {boolean}
 */
function supportsLocalStorage() {
    try {
        const test = '__localStorage_test__';
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch (e) {
        return false;
    }
}

/**
 * Save data to local storage
 * @param {string} key - Storage key
 * @param {*} value - Value to store
 */
function saveToStorage(key, value) {
    if (supportsLocalStorage()) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.error('Storage save failed:', e);
        }
    }
}

/**
 * Load data from local storage
 * @param {string} key - Storage key
 * @returns {*} Stored value or null
 */
function loadFromStorage(key) {
    if (supportsLocalStorage()) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            console.error('Storage load failed:', e);
            return null;
        }
    }
    return null;
}

// Export for use in modules if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        formatNumber,
        isPositiveNumber,
        showError,
        getCurrentDate,
        getCurrentTime,
        debounce,
        copyToClipboard,
        supportsLocalStorage,
        saveToStorage,
        loadFromStorage
    };
}
