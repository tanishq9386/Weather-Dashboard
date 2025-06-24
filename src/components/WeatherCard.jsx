import { formatDate, getWeatherIcon, windSpeedToKmh, visibilityToKm, capitalizeWords } from 'utils/helpers';

const WeatherCard = ({ weatherData }) => {
  if (!weatherData) return null;

  const {
    name,
    sys: { country },
    main: { temp, feels_like, humidity, pressure },
    weather,
    wind,
    visibility
  } = weatherData;

  const weatherInfo = weather[0];
  const iconClass = getWeatherIcon(weatherInfo.icon);

  return (
    <div className="row mb-4">
      {/* Current Weather */}
      <div className="col-lg-6 mb-4">
        <div className="current-weather h-100">
          <div className="row align-items-center">
            <div className="col-md-12">
              <h2 className="mb-1">{name}, {country}</h2>
              <p className="mb-3 opacity-75">{formatDate(new Date())}</p>
              
              <div className="d-flex align-items-center mb-3">
                <div className="temp-display me-3">{Math.round(temp)}°C</div>
                <div>
                  <div className="weather-icon">
                    <i className={iconClass}></i>
                  </div>
                  <p className="mb-0 h5">{capitalizeWords(weatherInfo.description)}</p>
                </div>
              </div>
              
              <div className="weather-detail">
                <span><i className="fas fa-eye me-2"></i>Feels like</span>
                <span>{Math.round(feels_like)}°C</span>
              </div>
              <div className="weather-detail">
                <span><i className="fas fa-wind me-2"></i>Wind Speed</span>
                <span>{windSpeedToKmh(wind.speed)} km/h</span>
              </div>
              <div className="weather-detail">
                <span><i className="fas fa-tint me-2"></i>Humidity</span>
                <span>{humidity}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Weather Stats */}
      <div className="col-lg-6">
        <div className="row g-3">
          <div className="col-md-6">
            <div className="stats-card">
              <div className="text-primary mb-2">
                <i className="fas fa-thermometer-half fa-2x"></i>
              </div>
              <h6 className="text-muted mb-1">Pressure</h6>
              <h4 className="mb-0">{pressure} hPa</h4>
            </div>
          </div>
          <div className="col-md-6">
            <div className="stats-card">
              <div className="text-warning mb-2">
                <i className="fas fa-eye fa-2x"></i>
              </div>
              <h6 className="text-muted mb-1">Visibility</h6>
              <h4 className="mb-0">{visibilityToKm(visibility)} km</h4>
            </div>
          </div>
          <div className="col-md-6">
            <div className="stats-card">
              <div className="text-info mb-2">
                <i className="fas fa-sun fa-2x"></i>
              </div>
              <h6 className="text-muted mb-1">UV Index</h6>
              <h4 className="mb-0">5</h4>
            </div>
          </div>
          <div className="col-md-6">
            <div className="stats-card">
              <div className="text-success mb-2">
                <i className="fas fa-cloud-rain fa-2x"></i>
              </div>
              <h6 className="text-muted mb-1">Chance of Rain</h6>
              <h4 className="mb-0">20%</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;