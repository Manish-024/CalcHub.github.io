// Time Zone Converter Logic

// Common time zones
const timeZones = [
    { value: 'Pacific/Honolulu', label: 'Hawaii (HST, UTC-10)' },
    { value: 'America/Anchorage', label: 'Alaska (AKST, UTC-9)' },
    { value: 'America/Los_Angeles', label: 'Pacific Time (PST/PDT, UTC-8/-7)' },
    { value: 'America/Denver', label: 'Mountain Time (MST/MDT, UTC-7/-6)' },
    { value: 'America/Chicago', label: 'Central Time (CST/CDT, UTC-6/-5)' },
    { value: 'America/New_York', label: 'Eastern Time (EST/EDT, UTC-5/-4)' },
    { value: 'America/Halifax', label: 'Atlantic Time (AST, UTC-4)' },
    { value: 'America/St_Johns', label: 'Newfoundland (NST, UTC-3:30)' },
    { value: 'America/Sao_Paulo', label: 'Brazil (BRT, UTC-3)' },
    { value: 'Atlantic/Azores', label: 'Azores (AZOT, UTC-1)' },
    { value: 'Europe/London', label: 'London (GMT/BST, UTC+0/+1)' },
    { value: 'Europe/Paris', label: 'Central Europe (CET/CEST, UTC+1/+2)' },
    { value: 'Europe/Athens', label: 'Eastern Europe (EET, UTC+2)' },
    { value: 'Europe/Moscow', label: 'Moscow (MSK, UTC+3)' },
    { value: 'Asia/Dubai', label: 'Dubai (GST, UTC+4)' },
    { value: 'Asia/Karachi', label: 'Pakistan (PKT, UTC+5)' },
    { value: 'Asia/Kolkata', label: 'India (IST, UTC+5:30)' },
    { value: 'Asia/Dhaka', label: 'Bangladesh (BST, UTC+6)' },
    { value: 'Asia/Bangkok', label: 'Bangkok (ICT, UTC+7)' },
    { value: 'Asia/Singapore', label: 'Singapore (SGT, UTC+8)' },
    { value: 'Asia/Shanghai', label: 'China (CST, UTC+8)' },
    { value: 'Asia/Tokyo', label: 'Japan (JST, UTC+9)' },
    { value: 'Australia/Sydney', label: 'Sydney (AEDT, UTC+11)' },
    { value: 'Pacific/Auckland', label: 'New Zealand (NZDT, UTC+13)' }
];

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    populateTimezones();
    setDefaultDateTime();
});

function populateTimezones() {
    const sourceSelect = document.getElementById('sourceTimezone');
    const targetSelect = document.getElementById('targetTimezone');

    timeZones.forEach(tz => {
        const option1 = new Option(tz.label, tz.value);
        const option2 = new Option(tz.label, tz.value);
        sourceSelect.add(option1);
        targetSelect.add(option2);
    });

    // Set default to user's timezone and UTC
    const userTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    sourceSelect.value = timeZones.find(tz => tz.value === userTz)?.value || 'America/New_York';
    targetSelect.value = 'Europe/London';
}

function setDefaultDateTime() {
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const timeStr = now.toTimeString().slice(0, 5);
    
    document.getElementById('sourceDate').value = dateStr;
    document.getElementById('sourceTime').value = timeStr;
}

document.getElementById('timezoneForm').addEventListener('submit', function(e) {
    e.preventDefault();
    convertTimeZone();
});

document.getElementById('timezoneForm').addEventListener('reset', function() {
    document.getElementById('result').classList.remove('show');
    setDefaultDateTime();
});

function convertTimeZone() {
    const date = document.getElementById('sourceDate').value;
    const time = document.getElementById('sourceTime').value;
    const sourceTimezone = document.getElementById('sourceTimezone').value;
    const targetTimezone = document.getElementById('targetTimezone').value;

    if (!date || !time || !sourceTimezone || !targetTimezone) {
        alert('Please fill in all fields.');
        return;
    }

    // Create date object in source timezone
    const dateTimeString = `${date}T${time}:00`;
    const sourceDate = new Date(dateTimeString);

    // Format options
    const dateOptions = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: sourceTimezone,
        timeZoneName: 'short'
    };

    const targetOptions = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: targetTimezone,
        timeZoneName: 'short'
    };

    const sourceFormatted = sourceDate.toLocaleString('en-US', dateOptions);
    const targetFormatted = sourceDate.toLocaleString('en-US', targetOptions);

    // Calculate time difference
    const sourceOffset = getTimezoneOffset(sourceDate, sourceTimezone);
    const targetOffset = getTimezoneOffset(sourceDate, targetTimezone);
    const diffMinutes = targetOffset - sourceOffset;
    const diffHours = Math.floor(Math.abs(diffMinutes) / 60);
    const diffMins = Math.abs(diffMinutes) % 60;
    const sign = diffMinutes >= 0 ? '+' : '-';
    
    const timeDiff = `${sign}${diffHours}:${diffMins.toString().padStart(2, '0')} hours`;

    // Check day change
    const sourceDay = new Date(sourceDate.toLocaleString('en-US', { timeZone: sourceTimezone })).getDate();
    const targetDay = new Date(sourceDate.toLocaleString('en-US', { timeZone: targetTimezone })).getDate();
    const dayChange = sourceDay === targetDay ? 'Same day' : (targetDay > sourceDay ? 'Next day' : 'Previous day');

    displayResults(sourceFormatted, targetFormatted, timeDiff, dayChange);
}

function getTimezoneOffset(date, timeZone) {
    const utcDate = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));
    const tzDate = new Date(date.toLocaleString('en-US', { timeZone }));
    return (tzDate.getTime() - utcDate.getTime()) / 60000;
}

function displayResults(source, target, diff, dayChange) {
    document.getElementById('sourceResult').textContent = source;
    document.getElementById('targetResult').textContent = target;
    document.getElementById('timeDiff').textContent = diff;
    document.getElementById('dayChange').textContent = dayChange;
    
    document.getElementById('result').classList.add('show');
}
