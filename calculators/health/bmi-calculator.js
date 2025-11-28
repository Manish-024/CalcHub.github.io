document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('bmiForm');
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
        calculateBMI();
    });

    form.addEventListener('reset', function() {
        resultContainer.style.display = 'none';
    });

    function calculateBMI() {
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

        // Calculate BMI
        const heightM = heightCm / 100;
        const bmi = weightKg / (heightM * heightM);

        // Determine category
        let category, categoryColor;
        if (bmi < 18.5) {
            category = 'Underweight';
            categoryColor = '#3498db';
        } else if (bmi < 25) {
            category = 'Normal Weight';
            categoryColor = '#2ecc71';
        } else if (bmi < 30) {
            category = 'Overweight';
            categoryColor = '#f39c12';
        } else {
            category = 'Obese';
            categoryColor = '#e74c3c';
        }

        // Calculate healthy weight range
        const minHealthyWeight = 18.5 * heightM * heightM;
        const maxHealthyWeight = 24.9 * heightM * heightM;
        const idealWeight = 22 * heightM * heightM;
        const weightDiff = weightKg - idealWeight;

        // Display results
        document.getElementById('bmiValue').textContent = bmi.toFixed(1);
        document.getElementById('bmiCategory').textContent = category;
        document.getElementById('bmiCategory').style.color = categoryColor;

        let healthyRangeText;
        if (weightSystem.value === 'metric') {
            healthyRangeText = `${minHealthyWeight.toFixed(1)} - ${maxHealthyWeight.toFixed(1)} kg`;
        } else {
            healthyRangeText = `${(minHealthyWeight * 2.20462).toFixed(1)} - ${(maxHealthyWeight * 2.20462).toFixed(1)} lbs`;
        }
        document.getElementById('healthyRange').textContent = healthyRangeText;

        let weightDiffText;
        const absDiff = Math.abs(weightDiff);
        if (weightSystem.value === 'metric') {
            weightDiffText = weightDiff > 0 
                ? `${absDiff.toFixed(1)} kg above ideal` 
                : weightDiff < 0 
                    ? `${absDiff.toFixed(1)} kg below ideal` 
                    : 'At ideal weight';
        } else {
            const diffLbs = absDiff * 2.20462;
            weightDiffText = weightDiff > 0 
                ? `${diffLbs.toFixed(1)} lbs above ideal` 
                : weightDiff < 0 
                    ? `${diffLbs.toFixed(1)} lbs below ideal` 
                    : 'At ideal weight';
        }
        document.getElementById('weightDiff').textContent = weightDiffText;

        resultContainer.style.display = 'block';
        resultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
});
