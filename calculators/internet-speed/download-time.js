// Download Time Calculator Logic

document.getElementById('downloadForm').addEventListener('submit', function(e) {
    e.preventDefault();
    calculateDownloadTime();
});

document.getElementById('downloadForm').addEventListener('reset', function() {
    document.getElementById('result').classList.remove('show');
});

function calculateDownloadTime() {
    // Get input values
    const fileSize = parseFloat(document.getElementById('fileSize').value);
    const fileSizeUnit = document.getElementById('fileSizeUnit').value;
    const downloadSpeed = parseFloat(document.getElementById('downloadSpeed').value);
    const speedUnit = document.getElementById('speedUnit').value;
    const efficiency = parseFloat(document.getElementById('efficiency').value) || 80;

    // Validate inputs
    if (fileSize <= 0 || downloadSpeed <= 0) {
        alert('Please enter valid positive numbers for file size and download speed.');
        return;
    }

    // Convert file size to MB
    const fileSizeInMB = convertToMB(fileSize, fileSizeUnit);
    
    // Convert download speed to Mbps
    const speedInMbps = convertToMbps(downloadSpeed, speedUnit);
    
    // Calculate effective speed (accounting for overhead)
    const effectiveSpeedMbps = speedInMbps * (efficiency / 100);
    
    // Convert Mbps to MB/s (1 byte = 8 bits)
    const speedInMBps = effectiveSpeedMbps / 8;
    
    // Calculate time in seconds
    const timeInSeconds = fileSizeInMB / speedInMBps;
    
    // Format time
    const formattedTime = formatTime(timeInSeconds);
    
    // Display results
    displayResults(
        formattedTime,
        fileSize,
        fileSizeUnit,
        downloadSpeed,
        speedUnit,
        effectiveSpeedMbps,
        timeInSeconds
    );
}

function convertToMB(size, unit) {
    const conversions = {
        'KB': size / 1024,
        'MB': size,
        'GB': size * 1024,
        'TB': size * 1024 * 1024
    };
    return conversions[unit];
}

function convertToMbps(speed, unit) {
    const conversions = {
        'Kbps': speed / 1000,
        'Mbps': speed,
        'Gbps': speed * 1000,
        'KBps': (speed * 8) / 1000,
        'MBps': speed * 8,
        'GBps': speed * 8 * 1000
    };
    return conversions[unit];
}

function formatTime(seconds) {
    if (seconds < 1) {
        return `${(seconds * 1000).toFixed(2)} milliseconds`;
    } else if (seconds < 60) {
        return `${seconds.toFixed(2)} seconds`;
    } else if (seconds < 3600) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes} minute${minutes !== 1 ? 's' : ''} ${secs} second${secs !== 1 ? 's' : ''}`;
    } else if (seconds < 86400) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        return `${hours} hour${hours !== 1 ? 's' : ''} ${minutes} minute${minutes !== 1 ? 's' : ''}`;
    } else {
        const days = Math.floor(seconds / 86400);
        const hours = Math.floor((seconds % 86400) / 3600);
        return `${days} day${days !== 1 ? 's' : ''} ${hours} hour${hours !== 1 ? 's' : ''}`;
    }
}

function displayResults(time, fileSize, fileSizeUnit, speed, speedUnit, effectiveSpeed, timeSeconds) {
    document.getElementById('downloadTime').textContent = time;
    document.getElementById('resultFileSize').textContent = `${fileSize} ${fileSizeUnit}`;
    document.getElementById('resultSpeed').textContent = `${speed} ${speedUnit}`;
    document.getElementById('effectiveSpeed').textContent = `${effectiveSpeed.toFixed(2)} Mbps (${(effectiveSpeed / 8).toFixed(2)} MB/s)`;
    document.getElementById('timeSeconds').textContent = `${timeSeconds.toFixed(2)} seconds`;
    
    document.getElementById('result').classList.add('show');
}
