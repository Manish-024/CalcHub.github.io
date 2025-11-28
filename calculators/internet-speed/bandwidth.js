// Bandwidth Calculator Logic

document.getElementById('bandwidthForm').addEventListener('submit', function(e) {
    e.preventDefault();
    calculateBandwidth();
});

document.getElementById('bandwidthForm').addEventListener('reset', function() {
    document.getElementById('result').classList.remove('show');
});

function calculateBandwidth() {
    // Get input values
    const numUsers = parseInt(document.getElementById('numUsers').value);
    const perUserBandwidth = parseFloat(document.getElementById('perUserBandwidth').value);
    const bandwidthUnit = document.getElementById('bandwidthUnit').value;
    const simultaneousUsage = parseFloat(document.getElementById('simultaneousUsage').value);
    const overhead = parseFloat(document.getElementById('overhead').value);

    // Validate inputs
    if (numUsers <= 0 || perUserBandwidth <= 0 || simultaneousUsage <= 0) {
        alert('Please enter valid positive numbers.');
        return;
    }

    // Convert bandwidth to Mbps for calculation
    const perUserMbps = convertToMbps(perUserBandwidth, bandwidthUnit);
    
    // Calculate simultaneous users
    const activeUsers = numUsers * (simultaneousUsage / 100);
    
    // Calculate base bandwidth needed
    const baseBandwidthMbps = activeUsers * perUserMbps;
    
    // Add overhead
    const overheadAmount = baseBandwidthMbps * (overhead / 100);
    const totalBandwidthMbps = baseBandwidthMbps + overheadAmount;
    
    // Calculate peak bandwidth (100% usage + overhead)
    const peakBandwidthMbps = (numUsers * perUserMbps) * (1 + overhead / 100);
    
    // Display results
    displayResults(
        totalBandwidthMbps,
        peakBandwidthMbps,
        numUsers,
        perUserBandwidth,
        bandwidthUnit,
        activeUsers,
        baseBandwidthMbps,
        overheadAmount
    );
}

function convertToMbps(bandwidth, unit) {
    const conversions = {
        'Kbps': bandwidth / 1000,
        'Mbps': bandwidth,
        'Gbps': bandwidth * 1000
    };
    return conversions[unit];
}

function formatBandwidth(mbps) {
    if (mbps >= 1000) {
        return `${(mbps / 1000).toFixed(2)} Gbps`;
    } else if (mbps >= 1) {
        return `${mbps.toFixed(2)} Mbps`;
    } else {
        return `${(mbps * 1000).toFixed(2)} Kbps`;
    }
}

function displayResults(total, peak, users, perUser, unit, activeUsers, base, overheadAmt) {
    document.getElementById('totalBandwidth').textContent = formatBandwidth(total);
    document.getElementById('peakBandwidth').textContent = formatBandwidth(peak);
    document.getElementById('resultUsers').textContent = users;
    document.getElementById('resultPerUser').textContent = `${perUser} ${unit}`;
    document.getElementById('simultaneousUsers').textContent = `${activeUsers.toFixed(1)} users`;
    document.getElementById('baseBandwidth').textContent = formatBandwidth(base);
    document.getElementById('overheadAmount').textContent = formatBandwidth(overheadAmt);
    
    document.getElementById('result').classList.add('show');
}
