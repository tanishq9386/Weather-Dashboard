// Convert temperature from Celsius to Fahrenheit
export const celsiusToFahrenheit = (celsius) => {
  return Math.round((celsius * 9/5) + 32);
};

// Format date for display
export const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

// Format time
export const formatTime = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Get weather icon class based on weather condition
export const getWeatherIcon = (weatherCode, isDay = true) => {
  const iconMap = {
    '01d': 'fas fa-sun', // clear sky day
    '01n': 'fas fa-moon', // clear sky night
    '02d': 'fas fa-cloud-sun', // few clouds day
    '02n': 'fas fa-cloud-moon', // few clouds night
    '03d': 'fas fa-cloud', // scattered clouds
    '03n': 'fas fa-cloud',
    '04d': 'fas fa-cloud', // broken clouds
    '04n': 'fas fa-cloud',
    '09d': 'fas fa-cloud-rain', // shower rain
    '09n': 'fas fa-cloud-rain',
    '10d': 'fas fa-cloud-sun-rain', // rain day
    '10n': 'fas fa-cloud-moon-rain', // rain night
    '11d': 'fas fa-bolt', // thunderstorm
    '11n': 'fas fa-bolt',
    '13d': 'fas fa-snowflake', // snow
    '13n': 'fas fa-snowflake',
    '50d': 'fas fa-smog', // mist
    '50n': 'fas fa-smog'
  };
  
  return iconMap[weatherCode] || 'fas fa-cloud';
};

// Get day name from timestamp
export const getDayName = (timestamp) => {
  const date = new Date(timestamp * 1000);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  } else if (date.toDateString() === tomorrow.toDateString()) {
    return 'Tomorrow';
  } else {
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  }
};

// Convert wind speed from m/s to km/h
export const windSpeedToKmh = (windSpeed) => {
  return Math.round(windSpeed * 3.6);
};

// Convert visibility from meters to kilometers
export const visibilityToKm = (visibility) => {
  return Math.round(visibility / 1000);
};

// Get UV index description
export const getUVDescription = (uvIndex) => {
  if (uvIndex <= 2) return 'Low';
  if (uvIndex <= 5) return 'Moderate';
  if (uvIndex <= 7) return 'High';
  if (uvIndex <= 10) return 'Very High';
  return 'Extreme';
};

// Capitalize first letter of each word
export const capitalizeWords = (str) => {
  return str.replace(/\b\w/g, char => char.toUpperCase());
};