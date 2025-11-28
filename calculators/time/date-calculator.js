// Date Calculator Logic

document.addEventListener('DOMContentLoaded', function() {
    setDefaultDate();
    setupEventListeners();
});

function setDefaultDate() {
    const today = new Date();
    document.getElementById('startDate').value = today.toISOString().split('T')[0];
    document.getElementById('startTime').value = today.toTimeString().slice(0, 5);
    document.getElementById('days').value = 30; // Default to adding 30 days
}

function setupEventListeners() {
    document.getElementById('includeTime').addEventListener('change', function() {
        const timeGroup = document.getElementById('timeGroup');
        const hoursGroup = document.getElementById('hoursGroup');
        const minutesGroup = document.getElementById('minutesGroup');
        
        if (this.checked) {
            timeGroup.style.display = 'block';
            hoursGroup.style.display = 'block';
            minutesGroup.style.display = 'block';
        } else {
            timeGroup.style.display = 'none';
            hoursGroup.style.display = 'none';
            minutesGroup.style.display = 'none';
        }
    });
}

document.getElementById('dateForm').addEventListener('submit', function(e) {
    e.preventDefault();
    calculateDate();
});

document.getElementById('dateForm').addEventListener('reset', function() {
    document.getElementById('result').classList.remove('show');
    setTimeout(setDefaultDate, 100);
});

function calculateDate() {
    const startDate = document.getElementById('startDate').value;
    const includeTime = document.getElementById('includeTime').checked;
    const startTime = includeTime ? document.getElementById('startTime').value : '00:00';
    const operation = document.getElementById('operation').value;
    
    const years = parseInt(document.getElementById('years').value) || 0;
    const months = parseInt(document.getElementById('months').value) || 0;
    const weeks = parseInt(document.getElementById('weeks').value) || 0;
    const days = parseInt(document.getElementById('days').value) || 0;
    const hours = includeTime ? (parseInt(document.getElementById('hours').value) || 0) : 0;
    const minutes = includeTime ? (parseInt(document.getElementById('minutes').value) || 0) : 0;

    if (!startDate) {
        alert('Please select a starting date.');
        return;
    }

    // Check if any time period is specified
    if (years === 0 && months === 0 && weeks === 0 && days === 0 && hours === 0 && minutes === 0) {
        alert('Please specify at least one time period to add or subtract.');
        return;
    }

    // Create starting date
    const start = new Date(`${startDate}T${startTime}`);
    
    // Calculate result date
    let result = new Date(start);
    
    const multiplier = operation === 'add' ? 1 : -1;
    
    // Add/subtract years and months
    result.setFullYear(result.getFullYear() + (years * multiplier));
    result.setMonth(result.getMonth() + (months * multiplier));
    
    // Add/subtract days, weeks, hours, minutes
    const totalMinutes = (weeks * 7 * 24 * 60) + (days * 24 * 60) + (hours * 60) + minutes;
    result.setMinutes(result.getMinutes() + (totalMinutes * multiplier));

    // Format change description
    const changeParts = [];
    if (years > 0) changeParts.push(`${years} year${years !== 1 ? 's' : ''}`);
    if (months > 0) changeParts.push(`${months} month${months !== 1 ? 's' : ''}`);
    if (weeks > 0) changeParts.push(`${weeks} week${weeks !== 1 ? 's' : ''}`);
    if (days > 0) changeParts.push(`${days} day${days !== 1 ? 's' : ''}`);
    if (hours > 0) changeParts.push(`${hours} hour${hours !== 1 ? 's' : ''}`);
    if (minutes > 0) changeParts.push(`${minutes} minute${minutes !== 1 ? 's' : ''}`);
    
    const timeChange = changeParts.join(', ');

    // Calculate day difference
    const diffDays = Math.floor((result - start) / (1000 * 60 * 60 * 24));

    // Format dates
    const dateFormatOptions = includeTime ? {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    } : {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    const startFormatted = start.toLocaleDateString('en-US', dateFormatOptions);
    const resultFormatted = result.toLocaleDateString('en-US', dateFormatOptions);
    const dayOfWeek = result.toLocaleDateString('en-US', { weekday: 'long' });
    const weekNumber = getWeekNumber(result);

    displayResults({
        startFormatted,
        resultFormatted,
        operation: operation === 'add' ? 'Added' : 'Subtracted',
        timeChange,
        dayOfWeek,
        weekNumber,
        diffDays: Math.abs(diffDays)
    });
}

function getWeekNumber(date) {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    return weekNo;
}

function displayResults(data) {
    document.getElementById('startingDate').textContent = data.startFormatted;
    document.getElementById('resultDate').textContent = data.resultFormatted;
    document.getElementById('operationText').textContent = data.operation;
    document.getElementById('timeChange').textContent = data.timeChange;
    document.getElementById('dayOfWeek').textContent = data.dayOfWeek;
    document.getElementById('weekNumber').textContent = `Week ${data.weekNumber}`;
    document.getElementById('daysDiff').textContent = `${data.diffDays} days`;
    
    document.getElementById('result').classList.add('show');
}
