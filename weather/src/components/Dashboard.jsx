import { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import WeatherCard from './WeatherCard';
import { weatherService, sampleWeatherData } from '../services/weatherApi';
import { getDayName, getWeatherIcon, capitalizeWords } from '../utils/helpers';

const Dashboard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Load default city on component mount
  useEffect(() => {
    handleSearch('London');
  }, []);

  const handleSearch = async (cityName) => {
    setLoading(true);
    setError('');

    try {
      // Try to fetch real data from API
      const weatherResponse = await weatherService.getCurrentWeather(cityName);
      const forecastResponse = await weatherService.getForecast(cityName);
      
      setWeatherData(weatherResponse);
      setForecastData(forecastResponse);
    } catch (err) {
      // Fallback to sample data if API fails
      console.log('API call failed, using sample data:', err.message);
      const sampleKey = cityName.toLowerCase();
      if (sampleWeatherData[sampleKey]) {
        setWeatherData(sampleWeatherData[sampleKey]);
        setForecastData(generateSampleForecast());
      } else {
        setError(`Weather data not found for "${cityName}". Please try another city.`);
      }
    } finally {
      setLoading(false);
    }
  };

  // Generate sample forecast data
  const generateSampleForecast = () => {
    const days = ['Today', 'Tomorrow', 'Thursday', 'Friday', 'Saturday'];
    const weatherTypes = [
      { icon: '01d', desc: 'Sunny', high: 25, low: 18 },
      { icon: '02d', desc: 'Partly Cloudy', high: 23, low: 16 },
      { icon: '10d', desc: 'Light Rain', high: 19, low: 14 },
      { icon: '04d', desc: 'Cloudy', high: 21, low: 15 },
      { icon: '01d', desc: 'Sunny', high: 26, low: 19 }
    ];

    return {
      list: days.map((day, index) => ({
        dt_txt: new Date(Date.now() + index * 24 * 60 * 60 * 1000).toISOString(),
        weather: [{ 
          icon: weatherTypes[index].icon, 
          description: weatherTypes[index].desc 
        }],
        main: {
          temp_max: weatherTypes[index].high,
          temp_min: weatherTypes[index].low
        }
      }))
    };
  };

  const renderForecast = () => {
    if (!forecastData) return null;

    // Group forecast by day and take first entry for each day
    const dailyForecasts = [];
    const processedDates = new Set();

    forecastData.list.forEach(item => {
      const date = new Date(item.dt_txt).toDateString();
      if (!processedDates.has(date) && dailyForecasts.length < 5) {
        dailyForecasts.push(item);
        processedDates.add(date);
      }
    });

    return dailyForecasts.map((day, index) => {
      const date = new Date(day.dt_txt);
      const dayName = index === 0 ? 'Today' : 
                     index === 1 ? 'Tomorrow' : 
                     date.toLocaleDateString('en-US', { weekday: 'long' });
      
      const iconClass = getWeatherIcon(day.weather[0].icon);

      return (
        <div key={index} className="col-lg-2 col-md-4 col-sm-6">
          <div className="forecast-card">
            <h6 className="text-muted mb-2">{dayName}</h6>
            <div className="mb-2">
              <i className={`${iconClass} fa-2x text-primary`}></i>
            </div>
            <div className="mb-2">
              <strong>{Math.round(day.main.temp_max)}°C</strong> / {' '}
              <span className="text-muted">{Math.round(day.main.temp_min)}°C</span>
            </div>
            <small className="text-muted">
              {capitalizeWords(day.weather[0].description)}
            </small>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="container-fluid py-4">
      {/* Header */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="text-center text-white">
            <h1 className="display-4 fw-bold mb-2 shimmer-text">
              <i className="fas fa-cloud-sun me-3"></i>Weather Dashboard
            </h1>
            <p className="lead">Get real-time weather information for any city worldwide</p>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <SearchBar 
        onSearch={handleSearch} 
        loading={loading} 
        error={error} 
      />

      {/* Main Weather Display */}
      {weatherData && (
        <WeatherCard weatherData={weatherData} />
      )}

      {/* 5-Day Forecast */}
      {forecastData && (
        <div className="row mb-4">
          <div className="col-12">
            <div className="weather-card p-4">
              <h3 className="mb-4">
                <i className="fas fa-calendar-alt me-2"></i>5-Day Forecast
              </h3>
              <div className="row g-3">
                {renderForecast()}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;