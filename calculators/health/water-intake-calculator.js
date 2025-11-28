document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('waterForm');
    const resultContainer = document.getElementById('result');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        calculateWaterIntake();
    });

    form.addEventListener('reset', function() {
        resultContainer.style.display = 'none';
    });

    function calculateWaterIntake() {
        // Get weight in kilograms (metric-only)
        const weightKg = parseFloat(document.getElementById('weightKg').value);

        const activityLevel = document.getElementById('activityLevel').value;
        const exerciseDuration = parseFloat(document.getElementById('exerciseDuration').value) || 0;
        const climate = document.getElementById('climate').value;
        const pregnant = document.getElementById('pregnant').value;

        // Base calculation: 30-35 ml per kg body weight
        let waterIntakeMl = weightKg * 33;

        // Adjust for activity level
        const activityMultipliers = {
            'sedentary': 1.0,
            'light': 1.1,
            'moderate': 1.2,
            'active': 1.3,
            'very_active': 1.4
        };
        waterIntakeMl *= activityMultipliers[activityLevel];

        // Add for exercise duration (12 oz or ~350ml per 30 minutes)
        waterIntakeMl += (exerciseDuration / 30) * 350;

        // Adjust for climate
        const climateMultipliers = {
            'cool': 1.0,
            'moderate': 1.1,
            'hot': 1.2
        };
        waterIntakeMl *= climateMultipliers[climate];

        // Adjust for pregnancy/breastfeeding
        if (pregnant === 'pregnant') {
            waterIntakeMl += 300; // Additional 300ml for pregnancy
        } else if (pregnant === 'breastfeeding') {
            waterIntakeMl += 700; // Additional 700ml for breastfeeding
        }

        // Calculate different measurements
        const liters = waterIntakeMl / 1000;
        const fluidOunces = waterIntakeMl / 29.5735;
        const cups = fluidOunces / 8;
        const glasses = waterIntakeMl / 250;

        // Display results
        document.getElementById('waterValue').textContent = liters.toFixed(2) + ' liters';
        document.getElementById('liters').textContent = liters.toFixed(2) + ' L';
        document.getElementById('milliliters').textContent = Math.round(waterIntakeMl) + ' ml';
        document.getElementById('fluidOunces').textContent = Math.round(fluidOunces) + ' fl oz';
        document.getElementById('cups').textContent = cups.toFixed(1) + ' cups';
        document.getElementById('glasses').textContent = Math.round(glasses) + ' glasses';

        resultContainer.style.display = 'block';
        resultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
});
