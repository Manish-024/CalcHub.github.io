document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('bodyFatForm');
    const resultContainer = document.getElementById('result');
    const genderSelect = document.getElementById('gender');
    const unitSystem = document.getElementById('unitSystem');
    const hipGroup = document.getElementById('hipGroup');

    // Show/hide hip measurement for females
    genderSelect.addEventListener('change', function() {
        if (this.value === 'female') {
            hipGroup.style.display = 'block';
            document.getElementById('hip').required = true;
        } else {
            hipGroup.style.display = 'none';
            document.getElementById('hip').required = false;
        }
    });

    // Update unit labels
    unitSystem.addEventListener('change', function() {
        const unit = this.value === 'metric' ? 'cm' : 'inches';
        document.getElementById('heightUnit').textContent = `(${unit})`;
        document.getElementById('neckUnit').textContent = `(${unit})`;
        document.getElementById('waistUnit').textContent = `(${unit})`;
        document.getElementById('hipUnit').textContent = `(${unit})`;
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        calculateBodyFat();
    });

    form.addEventListener('reset', function() {
        resultContainer.style.display = 'none';
        hipGroup.style.display = 'none';
    });

    function calculateBodyFat() {
        const gender = genderSelect.value;
        const age = parseFloat(document.getElementById('age').value);
        
        // Get measurements (convert to cm if imperial)
        let height = parseFloat(document.getElementById('height').value);
        let neck = parseFloat(document.getElementById('neck').value);
        let waist = parseFloat(document.getElementById('waist').value);
        let hip = gender === 'female' ? parseFloat(document.getElementById('hip').value) : 0;

        if (unitSystem.value === 'imperial') {
            height *= 2.54;
            neck *= 2.54;
            waist *= 2.54;
            hip *= 2.54;
        }

        // Calculate body fat percentage using Navy Method
        let bodyFatPercent;
        if (gender === 'male') {
            bodyFatPercent = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
        } else {
            bodyFatPercent = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(height)) - 450;
        }

        // Determine category
        let category, categoryColor;
        const categories = gender === 'male' ? {
            essential: 5,
            athletes: 13,
            fitness: 17,
            average: 24,
            obese: 100
        } : {
            essential: 14,
            athletes: 20,
            fitness: 24,
            average: 31,
            obese: 100
        };

        if (bodyFatPercent < categories.essential) {
            category = 'Essential Fat';
            categoryColor = '#e74c3c';
        } else if (bodyFatPercent < categories.athletes) {
            category = 'Athletes';
            categoryColor = '#3498db';
        } else if (bodyFatPercent < categories.fitness) {
            category = 'Fitness';
            categoryColor = '#2ecc71';
        } else if (bodyFatPercent < categories.average) {
            category = 'Average';
            categoryColor = '#f39c12';
        } else {
            category = 'Obese';
            categoryColor = '#e74c3c';
        }

        // Calculate body composition (assuming weight from BMI calculation, or use typical values)
        // For demo purposes, we'll estimate weight from measurements
        const estimatedWeight = gender === 'male' 
            ? (height / 100) * (height / 100) * 24  // Assuming average BMI
            : (height / 100) * (height / 100) * 22;
        
        const fatMass = estimatedWeight * (bodyFatPercent / 100);
        const leanMass = estimatedWeight - fatMass;

        // Display results
        document.getElementById('bodyFatValue').textContent = bodyFatPercent.toFixed(1) + '%';
        document.getElementById('bodyFatCategory').textContent = category;
        document.getElementById('bodyFatCategory').style.color = categoryColor;

        document.getElementById('fatMass').textContent = fatMass.toFixed(1) + ' kg (estimated)';
        document.getElementById('leanMass').textContent = leanMass.toFixed(1) + ' kg (estimated)';

        // Display category table
        const categoryTable = document.getElementById('categoryTable');
        if (gender === 'male') {
            categoryTable.innerHTML = `
                <ul style="margin: 0; padding-left: 1.5rem;">
                    <li><strong>Essential Fat:</strong> 2-5%</li>
                    <li><strong>Athletes:</strong> 6-13%</li>
                    <li><strong>Fitness:</strong> 14-17%</li>
                    <li><strong>Average:</strong> 18-24%</li>
                    <li><strong>Obese:</strong> 25%+</li>
                </ul>
            `;
        } else {
            categoryTable.innerHTML = `
                <ul style="margin: 0; padding-left: 1.5rem;">
                    <li><strong>Essential Fat:</strong> 10-13%</li>
                    <li><strong>Athletes:</strong> 14-20%</li>
                    <li><strong>Fitness:</strong> 21-24%</li>
                    <li><strong>Average:</strong> 25-31%</li>
                    <li><strong>Obese:</strong> 32%+</li>
                </ul>
            `;
        }

        resultContainer.style.display = 'block';
        resultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
});
