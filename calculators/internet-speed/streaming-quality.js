// Streaming Quality Calculator Logic

// Streaming quality requirements in Mbps
const streamingQualities = [
    { name: 'SD (480p)', speed: 3, icon: 'fas fa-video', color: '#10b981' },
    { name: 'HD (720p)', speed: 5, icon: 'fas fa-film', color: '#3b82f6' },
    { name: 'Full HD (1080p)', speed: 8, icon: 'fas fa-desktop', color: '#8b5cf6' },
    { name: '4K Ultra HD', speed: 25, icon: 'fas fa-tv', color: '#ef4444' },
    { name: '4K HDR', speed: 35, icon: 'fas fa-photo-video', color: '#f59e0b' },
    { name: '8K', speed: 50, icon: 'fas fa-expand', color: '#ec4899' }
];

document.getElementById('streamingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    checkStreamingCapability();
});

document.getElementById('streamingForm').addEventListener('reset', function() {
    document.getElementById('result').classList.remove('show');
});

function checkStreamingCapability() {
    const internetSpeed = parseFloat(document.getElementById('internetSpeed').value);
    const speedUnit = document.getElementById('speedUnit').value;
    const numDevices = parseInt(document.getElementById('numDevices').value);

    if (internetSpeed <= 0 || numDevices <= 0) {
        alert('Please enter valid positive numbers.');
        return;
    }

    // Convert to Mbps
    const speedInMbps = convertToMbps(internetSpeed, speedUnit);
    
    // Calculate speed per device
    const speedPerDevice = speedInMbps / numDevices;

    displayResults(speedInMbps, speedPerDevice, numDevices, speedUnit, internetSpeed);
}

function convertToMbps(speed, unit) {
    const conversions = {
        'Kbps': speed / 1000,
        'Mbps': speed,
        'Gbps': speed * 1000
    };
    return conversions[unit];
}

function formatSpeed(mbps) {
    if (mbps >= 1000) {
        return `${(mbps / 1000).toFixed(2)} Gbps`;
    } else {
        return `${mbps.toFixed(2)} Mbps`;
    }
}

function displayResults(totalSpeed, perDeviceSpeed, numDevices, unit, originalSpeed) {
    document.getElementById('yourSpeed').textContent = `${originalSpeed} ${unit}`;
    document.getElementById('speedPerDevice').textContent = formatSpeed(perDeviceSpeed);

    // Create streaming quality cards
    const qualitiesContainer = document.getElementById('streamingQualities');
    qualitiesContainer.innerHTML = '';

    streamingQualities.forEach(quality => {
        const canStream = perDeviceSpeed >= quality.speed;
        const maxStreams = Math.floor(totalSpeed / quality.speed);
        
        const qualityCard = document.createElement('div');
        qualityCard.style.cssText = `
            background: ${canStream ? '#f0fdf4' : '#fef2f2'};
            border-left: 4px solid ${canStream ? '#10b981' : '#ef4444'};
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
        `;

        qualityCard.innerHTML = `
            <div style="display: flex; align-items: center; gap: 1rem; flex: 1;">
                <i class="${quality.icon}" style="font-size: 1.5rem; color: ${quality.color};"></i>
                <div>
                    <div style="font-weight: 600; color: var(--text-primary); margin-bottom: 0.25rem;">
                        ${quality.name}
                    </div>
                    <div style="font-size: 0.9rem; color: var(--text-secondary);">
                        Requires ${quality.speed} Mbps per stream
                    </div>
                </div>
            </div>
            <div style="text-align: right;">
                <div style="font-weight: 600; color: ${canStream ? '#10b981' : '#ef4444'}; font-size: 1.1rem;">
                    ${canStream ? '✓ Supported' : '✗ Not Supported'}
                </div>
                ${canStream ? `
                    <div style="font-size: 0.9rem; color: var(--text-secondary); margin-top: 0.25rem;">
                        Max ${maxStreams} simultaneous ${maxStreams === 1 ? 'stream' : 'streams'}
                    </div>
                ` : ''}
            </div>
        `;

        qualitiesContainer.appendChild(qualityCard);
    });

    document.getElementById('result').classList.add('show');
}
