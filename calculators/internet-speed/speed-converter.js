// Speed Converter Logic

document.getElementById('speedForm').addEventListener('submit', function(e) {
    e.preventDefault();
    convertSpeed();
});

document.getElementById('speedForm').addEventListener('reset', function() {
    document.getElementById('result').classList.remove('show');
});

function convertSpeed() {
    const speedValue = parseFloat(document.getElementById('speedValue').value);
    const fromUnit = document.getElementById('fromUnit').value;

    if (speedValue < 0) {
        alert('Please enter a valid positive number.');
        return;
    }

    // First convert to bits per second (base unit)
    const bps = convertToBps(speedValue, fromUnit);

    // Convert to all other units
    const conversions = {
        bps: bps,
        Kbps: bps / 1000,
        Mbps: bps / 1000000,
        Gbps: bps / 1000000000,
        Tbps: bps / 1000000000000,
        Bps: bps / 8,
        KBps: bps / 8000,
        MBps: bps / 8000000,
        GBps: bps / 8000000000,
        TBps: bps / 8000000000000
    };

    displayResults(conversions);
}

function convertToBps(value, unit) {
    const conversions = {
        'bps': value,
        'Kbps': value * 1000,
        'Mbps': value * 1000000,
        'Gbps': value * 1000000000,
        'Tbps': value * 1000000000000,
        'Bps': value * 8,
        'KBps': value * 8000,
        'MBps': value * 8000000,
        'GBps': value * 8000000000,
        'TBps': value * 8000000000000
    };
    return conversions[unit];
}

function formatNumber(num) {
    if (num === 0) return '0';
    
    // Use exponential notation for very large or very small numbers
    if (num >= 1e15 || (num < 0.001 && num > 0)) {
        return num.toExponential(3);
    }
    
    // For reasonable numbers, use fixed decimal places
    if (num >= 1000) {
        return num.toLocaleString('en-US', { maximumFractionDigits: 2 });
    } else if (num >= 1) {
        return num.toFixed(3);
    } else {
        return num.toFixed(6);
    }
}

function displayResults(conversions) {
    // Display bits per second units
    document.getElementById('bps').textContent = formatNumber(conversions.bps);
    document.getElementById('Kbps').textContent = formatNumber(conversions.Kbps);
    document.getElementById('Mbps').textContent = formatNumber(conversions.Mbps);
    document.getElementById('Gbps').textContent = formatNumber(conversions.Gbps);
    document.getElementById('Tbps').textContent = formatNumber(conversions.Tbps);

    // Display bytes per second units
    document.getElementById('Bps').textContent = formatNumber(conversions.Bps);
    document.getElementById('KBps').textContent = formatNumber(conversions.KBps);
    document.getElementById('MBps').textContent = formatNumber(conversions.MBps);
    document.getElementById('GBps').textContent = formatNumber(conversions.GBps);
    document.getElementById('TBps').textContent = formatNumber(conversions.TBps);

    document.getElementById('result').classList.add('show');
}
