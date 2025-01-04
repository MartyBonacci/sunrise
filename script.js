function getSkyColor(hour, minute = 0) {
    const totalMinutes = hour * 60 + minute;

    // Display current time and RGB value
    const timeDisplay = document.createElement('div');
    timeDisplay.style.position = 'fixed';
    timeDisplay.style.top = '20px';
    timeDisplay.style.right = '20px';
    timeDisplay.style.background = 'rgba(255, 255, 255, 0.2)';
    timeDisplay.style.padding = '10px';
    timeDisplay.style.borderRadius = '8px';
    timeDisplay.style.color = 'black';
    timeDisplay.id = 'timeDisplay';
    if (!document.getElementById('timeDisplay')) {
        document.body.appendChild(timeDisplay);
    }

    // Night (20:00-04:59) - Midnight Blue to darker Midnight Blue
    if (hour >= 20 || hour <= 4) {
        const darkBlue = {r: 25, g: 25, b: 112}; // Midnight Blue
        const darkerBlue = {r: 5, g: 5, b: 40}; // Darker Midnight Blue
        let progress;
        if (hour >= 20 && hour < 21) {
            // 20:00-20:59 - getting darker
            progress = (totalMinutes - 20 * 60) / (1 * 60);
        } else {
            // 21:00-04:59 - staying dark
            progress = 1;
        }
        
        const r = Math.round(darkBlue.r + (darkerBlue.r - darkBlue.r) * progress);
        const g = Math.round(darkBlue.g + (darkerBlue.g - darkBlue.g) * progress);
        const b = Math.round(darkBlue.b + (darkerBlue.b - darkBlue.b) * progress);
        
        document.getElementById('timeDisplay').textContent = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} - rgb(${r}, ${g}, ${b})`;
        return `rgb(${r}, ${g}, ${b})`;
    }
    
    // Sunrise (05:00-07:59)
    if (hour >= 5 && hour < 8) {
        const colors = [
            // {r: 25, g: 25, b: 112},  // Midnight Blue
            {r: 10, g: 10, b: 40},   // Darker Midnight Blue
            {r: 255, g: 0, b: 0},    // Red
            {r: 255, g: 165, b: 0},  // Orange
            {r: 255, g: 255, b: 0},  // Yellow
            {r: 135, g: 206, b: 235} // Sky Blue
        ];
        
        const progress = (totalMinutes - 5 * 60) / (3 * 60); // 0 to 1 over 3 hours
        const index = Math.min(Math.floor(progress * (colors.length - 1)), colors.length - 2);
        
        const colorProgress = (progress * (colors.length - 1)) % 1;
        
        const startColor = colors[index];
        const endColor = colors[index + 1];
        
        const r = Math.round(startColor.r + (endColor.r - startColor.r) * colorProgress);
        const g = Math.round(startColor.g + (endColor.g - startColor.g) * colorProgress);
        const b = Math.round(startColor.b + (endColor.b - startColor.b) * colorProgress);
        
        document.getElementById('timeDisplay').textContent = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} - rgb(${r}, ${g}, ${b})`;
        return `rgb(${r}, ${g}, ${b})`;
    }
    
    // Day (08:00-16:59)
    if (hour >= 8 && hour < 17) {
        document.getElementById('timeDisplay').textContent = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} - rgb(135, 206, 235)`;
        return 'rgb(135, 206, 235)'; // Sky Blue
    }
    
    // Sunset (17:00-19:59)
    const colors = [
        {r: 135, g: 206, b: 235}, // Sky Blue
        {r: 255, g: 255, b: 0},   // Yellow
        {r: 255, g: 165, b: 0},   // Orange
        {r: 255, g: 0, b: 0},     // Red
        {r: 25, g: 25, b: 112}    // Midnight Blue
    ];
    
    const progress = (totalMinutes - 17 * 60) / (3 * 60); // 0 to 1 over 3 hours
    const index = Math.min(Math.floor(progress * (colors.length - 1)), colors.length - 2);
    const colorProgress = (progress * (colors.length - 1)) % 1;
    
    const startColor = colors[index];
    const endColor = colors[index + 1];
    
    const r = Math.round(startColor.r + (endColor.r - startColor.r) * colorProgress);
    const g = Math.round(startColor.g + (endColor.g - startColor.g) * colorProgress);
    const b = Math.round(startColor.b + (endColor.b - startColor.b) * colorProgress);
    
    document.getElementById('timeDisplay').textContent = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} - rgb(${r}, ${g}, ${b})`;
    return `rgb(${r}, ${g}, ${b})`;
}

function updateBackgroundColor(time = new Date()) {
    const hour = typeof time === 'number' ? time : time.getHours();
    const minute = typeof time === 'number' ? 0 : time.getMinutes();
    document.body.style.backgroundColor = getSkyColor(hour, minute);
}

// Initialize with current time
updateBackgroundColor();

// Update every minute
setInterval(() => updateBackgroundColor(), 30000);

// Handle manual time input
const timeInput = document.getElementById('timeInput');
timeInput.addEventListener('change', (e) => {
    const [hours, minutes] = e.target.value.split(':');
    updateBackgroundColor(parseInt(hours) + parseInt(minutes)/60);
});
