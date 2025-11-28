document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('bmrForm');
    const resultContainer = document.getElementById('result');
    const heightSystem = document.getElementById('heightSystem');
    const weightSystem = document.getElementById('weightSystem');

    // Toggle height input fields
    heightSystem.addEventListener('change', function() {
        const heightMetricGroup = document.getElementById('heightMetricGroup');
        const heightImperialGroup = document.getElementById('heightImperialGroup');
        
        if (this.value === 'metric') {
            heightMetricGroup.style.display = 'block';
            heightImperialGroup.style.display = 'none';
            document.getElementById('heightCm').required = true;
            document.getElementById('heightFeet').required = false;
            document.getElementById('heightInches').required = false;
        } else {
            heightMetricGroup.style.display = 'none';
            heightImperialGroup.style.display = 'block';
            document.getElementById('heightCm').required = false;
            document.getElementById('heightFeet').required = true;
            document.getElementById('heightInches').required = true;
        }
    });

    // Toggle weight input fields
    weightSystem.addEventListener('change', function() {
        const weightMetricGroup = document.getElementById('weightMetricGroup');
        const weightImperialGroup = document.getElementById('weightImperialGroup');
        
        if (this.value === 'metric') {
            weightMetricGroup.style.display = 'block';
            weightImperialGroup.style.display = 'none';
            document.getElementById('weightKg').required = true;
            document.getElementById('weightLbs').required = false;
        } else {
            weightMetricGroup.style.display = 'none';
            weightImperialGroup.style.display = 'block';
            document.getElementById('weightKg').required = false;
            document.getElementById('weightLbs').required = true;
        }
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        calculateBMR();
    });

    form.addEventListener('reset', function() {
        resultContainer.style.display = 'none';
    });

    function calculateBMR() {
        // Get inputs
        const age = parseFloat(document.getElementById('age').value);
        const gender = document.getElementById('gender').value;
        const activityLevel = parseFloat(document.getElementById('activityLevel').value);

        // Get height in centimeters
        let heightCm;
        if (heightSystem.value === 'metric') {
            heightCm = parseFloat(document.getElementById('heightCm').value);
        } else {
            const feet = parseFloat(document.getElementById('heightFeet').value) || 0;
            const inches = parseFloat(document.getElementById('heightInches').value) || 0;
            heightCm = (feet * 12 + inches) * 2.54;
        }

        // Get weight in kilograms
        let weightKg;
        if (weightSystem.value === 'metric') {
            weightKg = parseFloat(document.getElementById('weightKg').value);
        } else {
            weightKg = parseFloat(document.getElementById('weightLbs').value) * 0.453592;
        }

        // Calculate BMR using Mifflin-St Jeor Equation
        let bmr;
        if (gender === 'male') {
            bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age) + 5;
        } else {
            bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age) - 161;
        }

        // Calculate TDEE
        const tdee = bmr * activityLevel;

        // Calculate weight goal calories
        // 1 kg = 7700 calories approximately
        const mildLoss = tdee - 250;        // ~0.25 kg/week
        const moderateLoss = tdee - 500;    // ~0.5 kg/week
        const extremeLoss = tdee - 1000;    // ~1 kg/week
        const mildGain = tdee + 250;        // ~0.25 kg/week
        const moderateGain = tdee + 500;    // ~0.5 kg/week
        const extremeGain = tdee + 1000;    // ~1 kg/week

        // Display results
        document.getElementById('bmrValue').textContent = Math.round(bmr) + ' cal/day';
        document.getElementById('tdeeValue').textContent = Math.round(tdee) + ' cal/day';

        document.getElementById('mildLoss').textContent = Math.round(mildLoss) + ' cal/day';
        document.getElementById('moderateLoss').textContent = Math.round(moderateLoss) + ' cal/day';
        document.getElementById('extremeLoss').textContent = Math.max(1200, Math.round(extremeLoss)) + ' cal/day';
        
        document.getElementById('mildGain').textContent = Math.round(mildGain) + ' cal/day';
        document.getElementById('moderateGain').textContent = Math.round(moderateGain) + ' cal/day';
        document.getElementById('extremeGain').textContent = Math.round(extremeGain) + ' cal/day';

        resultContainer.style.display = 'block';
        resultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
});
