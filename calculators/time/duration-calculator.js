// Duration Calculator Logic

document.addEventListener('DOMContentLoaded', function() {
    setDefaultDates();
});

function setDefaultDates() {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    document.getElementById('startDate').value = now.toISOString().split('T')[0];
    document.getElementById('startTime').value = '09:00';
    document.getElementById('endDate').value = tomorrow.toISOString().split('T')[0];
    document.getElementById('endTime').value = '17:00';
}

document.getElementById('durationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    calculateDuration();
});

document.getElementById('durationForm').addEventListener('reset', function() {
    document.getElementById('result').classList.remove('show');
    setTimeout(setDefaultDates, 100);
});

function calculateDuration() {
    const startDate = document.getElementById('startDate').value;
    const startTime = document.getElementById('startTime').value;
    const endDate = document.getElementById('endDate').value;
    const endTime = document.getElementById('endTime').value;

    if (!startDate || !startTime || !endDate || !endTime) {
        alert('Please fill in all fields.');
        return;
    }

    // Create date objects
    const start = new Date(`${startDate}T${startTime}`);
    const end = new Date(`${endDate}T${endTime}`);

    // Check if end is after start
    if (end <= start) {
        alert('End date/time must be after start date/time.');
        return;
    }

    // Calculate difference in milliseconds
    const diffMs = end - start;
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = getMonthsDifference(start, end);
    const diffYears = Math.floor(diffMonths / 12);

    // Calculate detailed breakdown
    let tempDate = new Date(start);
    
    // Calculate years
    let years = 0;
    while (true) {
        const nextYear = new Date(tempDate);
        nextYear.setFullYear(nextYear.getFullYear() + 1);
        if (nextYear <= end) {
            years++;
            tempDate = nextYear;
        } else {
            break;
        }
    }

    // Calculate months
    let months = 0;
    while (true) {
        const nextMonth = new Date(tempDate);
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        if (nextMonth <= end) {
            months++;
            tempDate = nextMonth;
        } else {
            break;
        }
    }

    // Calculate remaining time
    const remainingMs = end - tempDate;
    const remainingSeconds = Math.floor(remainingMs / 1000);
    const remainingMinutes = Math.floor(remainingSeconds / 60);
    const remainingHours = Math.floor(remainingMinutes / 60);
    const remainingDays = Math.floor(remainingHours / 24);

    const finalSeconds = remainingSeconds % 60;
    const finalMinutes = remainingMinutes % 60;
    const finalHours = remainingHours % 24;

    // Format main duration string
    const durationParts = [];
    if (years > 0) durationParts.push(`${years} year${years !== 1 ? 's' : ''}`);
    if (months > 0) durationParts.push(`${months} month${months !== 1 ? 's' : ''}`);
    if (remainingDays > 0) durationParts.push(`${remainingDays} day${remainingDays !== 1 ? 's' : ''}`);
    if (finalHours > 0) durationParts.push(`${finalHours} hour${finalHours !== 1 ? 's' : ''}`);
    if (finalMinutes > 0) durationParts.push(`${finalMinutes} minute${finalMinutes !== 1 ? 's' : ''}`);
    if (finalSeconds > 0 || durationParts.length === 0) {
        durationParts.push(`${finalSeconds} second${finalSeconds !== 1 ? 's' : ''}`);
    }

    const mainDuration = durationParts.join(', ');

    displayResults(mainDuration, {
        years,
        months,
        weeks: diffWeeks,
        days: remainingDays,
        hours: finalHours,
        minutes: finalMinutes,
        seconds: finalSeconds,
        totalDays: diffDays,
        totalHours: diffHours,
        totalMinutes: diffMinutes,
        totalSeconds: diffSeconds
    });
}

function getMonthsDifference(start, end) {
    return (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
}

function formatNumber(num) {
    return num.toLocaleString('en-US');
}

function displayResults(mainDuration, breakdown) {
    document.getElementById('totalDuration').textContent = mainDuration;
    document.getElementById('years').textContent = breakdown.years;
    document.getElementById('months').textContent = breakdown.months;
    document.getElementById('weeks').textContent = formatNumber(breakdown.weeks);
    document.getElementById('days').textContent = breakdown.days;
    document.getElementById('hours').textContent = breakdown.hours;
    document.getElementById('minutes').textContent = breakdown.minutes;
    document.getElementById('seconds').textContent = breakdown.seconds;
    document.getElementById('totalDays').textContent = formatNumber(breakdown.totalDays);
    document.getElementById('totalHours').textContent = formatNumber(breakdown.totalHours);
    document.getElementById('totalMinutes').textContent = formatNumber(breakdown.totalMinutes);
    document.getElementById('totalSeconds').textContent = formatNumber(breakdown.totalSeconds);
    
    document.getElementById('result').classList.add('show');
}
