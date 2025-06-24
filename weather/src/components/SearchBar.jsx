import { useState } from 'react';

const SearchBar = ({ onSearch, loading, error }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  const favoriteCities = [
    'New York', 'Tokyo', 'Paris', 'Sydney', 
    'Dubai', 'Mumbai', 'Singapore', 'Barcelona'
  ];

  return (
    <div className="row mb-4">
      <div className="col-lg-8 mx-auto">
        <div className="search-container">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-8">
                <div className="input-group">
                  <span className="input-group-text bg-white border-end-0">
                    <i className="fas fa-search text-muted"></i>
                  </span>
                  <input 
                    type="text" 
                    className="form-control border-start-0" 
                    placeholder="Enter city name..."
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    disabled={loading}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <button 
                  type="submit" 
                  className="btn btn-weather w-100"
                  disabled={loading || !city.trim()}
                >
                  {loading ? (
                    <>
                      <div className="spinner-border spinner-border-sm me-2" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                      Searching...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-search me-2"></i>
                      Search Weather
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
          
          {error && (
            <div className="error-message">
              <i className="fas fa-exclamation-triangle me-2"></i>
              {error}
            </div>
          )}
          
          {/* Favorite Cities */}
          <div className="mt-4">
            <h6 className="mb-3">
              <i className="fas fa-heart me-2"></i>
              Quick Search
            </h6>
            <div className="d-flex flex-wrap">
              {favoriteCities.map((cityName) => (
                <button
                  key={cityName}
                  className="btn city-btn"
                  onClick={() => onSearch(cityName)}
                  disabled={loading}
                >
                  {cityName}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;