import React, { useState, useEffect } from 'react';
import '../css/WeatherComponent.css';

function WeatherComponent({ lat, lon, apiKey }) {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setWeatherData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [lat, lon, apiKey]);

  if (loading) return <p>Loading weather data...</p>;
  if (error) return <p>Error fetching weather data: {error}</p>;

  return (
    <div className="weather-container">
      <div className="weather-header">
        <h1>{weatherData.main.temp}°C</h1>
        <p>{weatherData.weather[0].description}</p>
      </div>

      <div className="weather-summary">
        <div>Feels Like: {weatherData.main.feels_like}°C</div>
        <div>Min Temp: {weatherData.main.temp_min}°C</div>
        <div>Max Temp: {weatherData.main.temp_max}°C</div>
        <div>Pressure: {weatherData.main.pressure} hPa</div>
        <div>Humidity: {weatherData.main.humidity}%</div>
      </div>

      <button className="details-button" onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? 'Hide Additional Details' : 'Additional Details'}
      </button>

      {showDetails && (
        <div className="weather-details">
          <p>Longitude: {weatherData.coord.lon}</p>
          <p>Latitude: {weatherData.coord.lat}</p>
          <p>Base: {weatherData.base}</p>
          <p>Visibility: {weatherData.visibility / 1000} km</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
          <p>Wind Direction: {weatherData.wind.deg}°</p>
          <p>Wind Gust: {weatherData.wind.gust || 'N/A'} m/s</p>
          <p>Sea Level Pressure: {weatherData.main.sea_level || 'N/A'} hPa</p>
          <p>Ground Level Pressure: {weatherData.main.grnd_level || 'N/A'} hPa</p>
          <p>Rain (Last Hour): {weatherData.rain?.['1h'] || 'N/A'} mm</p>
          <p>Cloudiness: {weatherData.clouds.all}%</p>
          <p>Timezone: {weatherData.timezone / 3600} hours</p>
          <p>Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</p>
          <p>Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}</p>
          <p>Country: {weatherData.sys.country}</p>
          <p>Location ID: {weatherData.id}</p>
        </div>
      )}
    </div>
  );
}

export default WeatherComponent;
