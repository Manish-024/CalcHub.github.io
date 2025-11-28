// Age Calculator Logic

document.addEventListener('DOMContentLoaded', function() {
    setDefaultDates();
});

function setDefaultDates() {
    const today = new Date();
    const defaultBirth = new Date(today.getFullYear() - 25, today.getMonth(), today.getDate());
    
    document.getElementById('birthDate').value = defaultBirth.toISOString().split('T')[0];
    document.getElementById('targetDate').value = today.toISOString().split('T')[0];
    
    const currentTime = today.toTimeString().slice(0, 5);
    document.getElementById('birthTime').value = '08:30';
    document.getElementById('targetTime').value = currentTime;
}

document.getElementById('ageForm').addEventListener('submit', function(e) {
    e.preventDefault();
    calculateAge();
});

document.getElementById('ageForm').addEventListener('reset', function() {
    document.getElementById('result').classList.remove('show');
    setTimeout(setDefaultDates, 100);
});

function calculateAge() {
    const birthDate = document.getElementById('birthDate').value;
    const birthTime = document.getElementById('birthTime').value || '00:00';
    const targetDate = document.getElementById('targetDate').value;
    const targetTime = document.getElementById('targetTime').value || '00:00';

    if (!birthDate || !targetDate) {
        alert('Please fill in the required date fields.');
        return;
    }

    // Create date objects
    const birth = new Date(`${birthDate}T${birthTime}`);
    const target = new Date(`${targetDate}T${targetTime}`);

    // Validate dates
    if (target < birth) {
        alert('Target date must be after birth date.');
        return;
    }

    if (birth > new Date()) {
        alert('Birth date cannot be in the future.');
        return;
    }

    // Calculate age components
    let years = target.getFullYear() - birth.getFullYear();
    let months = target.getMonth() - birth.getMonth();
    let days = target.getDate() - birth.getDate();

    // Adjust for negative days
    if (days < 0) {
        months--;
        const lastMonth = new Date(target.getFullYear(), target.getMonth(), 0);
        days += lastMonth.getDate();
    }

    // Adjust for negative months
    if (months < 0) {
        years--;
        months += 12;
    }

    // Calculate total time lived
    const diffMs = target - birth;
    const totalMinutes = Math.floor(diffMs / (1000 * 60));
    const totalHours = Math.floor(diffMs / (1000 * 60 * 60));
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);

    // Calculate heartbeats (average 70 bpm)
    const heartbeats = totalMinutes * 70;

    // Calculate next birthday
    const nextBirthday = new Date(target.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday < target) {
        nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
    }
    const daysUntilBirthday = Math.ceil((nextBirthday - target) / (1000 * 60 * 60 * 24));

    // Format main age
    const ageParts = [];
    if (years > 0) ageParts.push(`${years} year${years !== 1 ? 's' : ''}`);
    if (months > 0) ageParts.push(`${months} month${months !== 1 ? 's' : ''}`);
    if (days > 0) ageParts.push(`${days} day${days !== 1 ? 's' : ''}`);
    const mainAge = ageParts.join(', ') || '0 days';

    // Birthday message
    let birthdayMsg = '';
    if (daysUntilBirthday === 0) {
        birthdayMsg = '🎉 <strong>Happy Birthday!</strong> Have a wonderful day!';
    } else if (daysUntilBirthday === 1) {
        birthdayMsg = '🎂 Your birthday is <strong>tomorrow</strong>! Get ready to celebrate!';
    } else if (daysUntilBirthday <= 7) {
        birthdayMsg = `🎈 Your birthday is in <strong>${daysUntilBirthday} days</strong>. Celebration is near!`;
    } else {
        birthdayMsg = `Your next birthday is in <strong>${daysUntilBirthday} days</strong>.`;
    }

    const nextBirthdayStr = nextBirthday.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });

    displayResults({
        mainAge,
        nextBirthdayStr,
        years,
        months,
        weeks: totalWeeks,
        days,
        hours: totalHours % 24,
        minutes: totalMinutes % 60,
        totalDays,
        totalHours,
        totalMinutes,
        heartbeats,
        birthdayMsg
    });
}

function formatNumber(num) {
    return num.toLocaleString('en-US');
}

function displayResults(data) {
    document.getElementById('mainAge').textContent = data.mainAge;
    document.getElementById('nextBirthday').textContent = data.nextBirthdayStr;
    document.getElementById('years').textContent = data.years;
    document.getElementById('months').textContent = data.months;
    document.getElementById('weeks').textContent = formatNumber(data.weeks);
    document.getElementById('days').textContent = data.days;
    document.getElementById('hours').textContent = data.hours;
    document.getElementById('minutes').textContent = data.minutes;
    document.getElementById('totalDays').textContent = formatNumber(data.totalDays);
    document.getElementById('totalHours').textContent = formatNumber(data.totalHours);
    document.getElementById('totalMinutes').textContent = formatNumber(data.totalMinutes);
    document.getElementById('heartbeats').textContent = formatNumber(data.heartbeats);
    document.getElementById('birthdayMessage').innerHTML = data.birthdayMsg;
    
    document.getElementById('result').classList.add('show');
}
