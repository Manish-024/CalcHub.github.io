// Currency Converter - Indian Rupee Default
// File: /js/calculators/basic/currency-converter.js

// Exchange rates (base: INR - Indian Rupee)
const exchangeRates = {
    INR: 1,        // Indian Rupee (base)
    USD: 0.012,    // US Dollar
    EUR: 0.011,    // Euro
    GBP: 0.0095,   // British Pound
    JPY: 1.80,     // Japanese Yen
    AUD: 0.018,    // Australian Dollar
    CAD: 0.016,    // Canadian Dollar
    CHF: 0.011,    // Swiss Franc
    CNY: 0.087,    // Chinese Yuan
    MXN: 0.21,     // Mexican Peso
    AED: 0.044,    // UAE Dirham
    SAR: 0.045     // Saudi Riyal
};

function initCurrencyConverter() {
    const form = document.getElementById('currencyForm');
    if (!form) {
        console.error('Currency form not found');
        return;
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        calculateCurrency();
    });

    // Set INR as default
    document.getElementById('from').value = 'INR';
}

function calculateCurrency() {
    const amount = parseFloat(document.getElementById('amount').value);
    const fromCurrency = document.getElementById('from').value;
    const toCurrency = document.getElementById('to').value;
    
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount');
        return;
    }
    
    // Convert to INR first, then to target currency
    const amountInINR = amount / exchangeRates[fromCurrency];
    const convertedAmount = amountInINR * exchangeRates[toCurrency];
    const rate = exchangeRates[toCurrency] / exchangeRates[fromCurrency];
    const inverseRate = exchangeRates[fromCurrency] / exchangeRates[toCurrency];
    
    // Display results
    document.getElementById('converted').textContent = convertedAmount.toFixed(2) + ' ' + toCurrency;
    document.getElementById('rate').textContent = '1 ' + fromCurrency + ' = ' + rate.toFixed(4) + ' ' + toCurrency;
    document.getElementById('inverseRate').textContent = '1 ' + toCurrency + ' = ' + inverseRate.toFixed(4) + ' ' + fromCurrency;
    document.getElementById('result').style.display = 'block';
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCurrencyConverter);
} else {
    initCurrencyConverter();
}
