document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('paceForm');
    const resultContainer = document.getElementById('result');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        calculatePace();
    });

    form.addEventListener('reset', function() {
        resultContainer.style.display = 'none';
    });

    function calculatePace() {
        const distance = parseFloat(document.getElementById('distance').value) || 0;
        const distanceUnit = document.getElementById('distanceUnit').value;
        const hours = parseFloat(document.getElementById('hours').value) || 0;
        const minutes = parseFloat(document.getElementById('minutes').value) || 0;
        const seconds = parseFloat(document.getElementById('seconds').value) || 0;
        const paceMin = parseFloat(document.getElementById('paceMin').value) || 0;
        const paceSec = parseFloat(document.getElementById('paceSec').value) || 0;

        // Convert distance to kilometers
        let distanceKm = distance;
        if (distanceUnit === 'miles') {
            distanceKm = distance * 1.60934;
        } else if (distanceUnit === 'meters') {
            distanceKm = distance / 1000;
        }

        // Convert time to total seconds
        const totalTimeSeconds = hours * 3600 + minutes * 60 + seconds;

        // Convert pace to seconds per km
        const paceSecondsPerKm = paceMin * 60 + paceSec;

        // Calculate missing value
        let calculatedDistanceKm = distanceKm;
        let calculatedTimeSeconds = totalTimeSeconds;
        let calculatedPaceSecondsPerKm = paceSecondsPerKm;

        const valuesProvided = [distance > 0, totalTimeSeconds > 0, paceSecondsPerKm > 0].filter(Boolean).length;

        if (valuesProvided < 2) {
            alert('Please provide at least 2 values to calculate the third.');
            return;
        }

        // Calculate based on which values are provided
        if (distance > 0 && totalTimeSeconds > 0) {
            // Calculate pace
            calculatedPaceSecondsPerKm = totalTimeSeconds / distanceKm;
        } else if (distance > 0 && paceSecondsPerKm > 0) {
            // Calculate time
            calculatedTimeSeconds = distanceKm * paceSecondsPerKm;
        } else if (totalTimeSeconds > 0 && paceSecondsPerKm > 0) {
            // Calculate distance
            calculatedDistanceKm = totalTimeSeconds / paceSecondsPerKm;
        }

        // Display results
        const distanceMiles = calculatedDistanceKm / 1.60934;
        document.getElementById('resultDistance').textContent = 
            `${calculatedDistanceKm.toFixed(2)} km (${distanceMiles.toFixed(2)} miles)`;

        const h = Math.floor(calculatedTimeSeconds / 3600);
        const m = Math.floor((calculatedTimeSeconds % 3600) / 60);
        const s = Math.floor(calculatedTimeSeconds % 60);
        document.getElementById('resultTime').textContent = 
            `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;

        const paceKmMin = Math.floor(calculatedPaceSecondsPerKm / 60);
        const paceKmSec = Math.floor(calculatedPaceSecondsPerKm % 60);
        document.getElementById('resultPaceKm').textContent = 
            `${paceKmMin}:${paceKmSec.toString().padStart(2, '0')}`;

        const paceMileSeconds = calculatedPaceSecondsPerKm * 1.60934;
        const paceMileMin = Math.floor(paceMileSeconds / 60);
        const paceMileSec = Math.floor(paceMileSeconds % 60);
        document.getElementById('resultPaceMile').textContent = 
            `${paceMileMin}:${paceMileSec.toString().padStart(2, '0')}`;

        const speedKmh = 3600 / calculatedPaceSecondsPerKm;
        const speedMph = speedKmh / 1.60934;
        document.getElementById('resultSpeedKmh').textContent = speedKmh.toFixed(2);
        document.getElementById('resultSpeedMph').textContent = speedMph.toFixed(2);

        // Calculate common race times
        const time5k = 5 * calculatedPaceSecondsPerKm;
        const time10k = 10 * calculatedPaceSecondsPerKm;
        const timeHalf = 21.0975 * calculatedPaceSecondsPerKm;
        const timeMarathon = 42.195 * calculatedPaceSecondsPerKm;

        document.getElementById('pace5k').textContent = formatTime(time5k);
        document.getElementById('pace10k').textContent = formatTime(time10k);
        document.getElementById('paceHalf').textContent = formatTime(timeHalf);
        document.getElementById('paceMarathon').textContent = formatTime(timeMarathon);

        resultContainer.style.display = 'block';
        resultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    function formatTime(seconds) {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = Math.floor(seconds % 60);
        return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
});
