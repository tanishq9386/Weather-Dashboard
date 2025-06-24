import axios from 'axios';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Create axios instance
const weatherAPI = axios.create({
  baseURL: BASE_URL,
  params: {
    appid: API_KEY,
    units: 'metric'
  }
});

export const weatherService = {
  // Get current weather by city name
  getCurrentWeather: async (cityName) => {
    try {
      const response = await weatherAPI.get('/weather', {
        params: { q: cityName }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch weather data');
    }
  },

  // Get 5-day forecast
  getForecast: async (cityName) => {
    try {
      const response = await weatherAPI.get('/forecast', {
        params: { q: cityName }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch forecast data');
    }
  },

  // Get weather by coordinates
  getWeatherByCoords: async (lat, lon) => {
    try {
      const response = await weatherAPI.get('/weather', {
        params: { lat, lon }
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch weather data');
    }
  }
};

// Sample data for development/fallback
export const sampleWeatherData = {
  'london': {
    name: 'London',
    country: 'GB',
    main: {
      temp: 22,
      feels_like: 25,
      humidity: 65,
      pressure: 1013
    },
    weather: [{
      main: 'Clear',
      description: 'clear sky',
      icon: '01d'
    }],
    wind: {
      speed: 4.2
    },
    visibility: 10000,
    sys: {
      country: 'GB'
    }
  },
  'new york': {
    name: 'New York',
    country: 'US',
    main: {
      temp: 28,
      feels_like: 31,
      humidity: 58,
      pressure: 1015
    },
    weather: [{
      main: 'Clouds',
      description: 'partly cloudy',
      icon: '02d'
    }],
    wind: {
      speed: 3.3
    },
    visibility: 12000,
    sys: {
      country: 'US'
    }
  }
};