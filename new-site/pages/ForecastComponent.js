import React, { useState, useEffect } from 'react';
import '../css/WeatherComponent.css';
import '../css/ForecastComponent.css';

function ForecastComponent({ lat, lon, apiKey }) {
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeDay, setActiveDay] = useState(null);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setForecastData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchForecast();
  }, [lat, lon, apiKey]);

  if (loading) return <p>Loading forecast data...</p>;
  if (error) return <p>Error fetching forecast data: {error}</p>;

  const groupByDay = (list) => {
    return list.reduce((days, item) => {
      const date = item.dt_txt.split(' ')[0];
      if (!days[date]) days[date] = [];
      days[date].push(item);
      return days;
    }, {});
  };

  const forecastByDay = groupByDay(forecastData.list);

  return (
    <div className="forecast-container">
      <h3>Multiple Day Forecast</h3>
      <div className="day-buttons">
        {Object.keys(forecastByDay)
          .sort((a, b) => new Date(a) - new Date(b))
          .map((date, index) => (
            <button
              key={index}
              className={`day-button ${activeDay === date ? 'active' : ''}`}
              onClick={() => setActiveDay(activeDay === date ? null : date)}
            >
              Day {index + 1}
            </button>
          ))}
      </div>
      <div>

      <div id="openweathermap-widget-21"></div>



      </div>

      {activeDay && (
        <div className="forecast-details">
          {forecastByDay[activeDay].map((forecast, index) => (
            <div key={index} className="weather-container">
              <div className="weather-header">
                <div className="temperature-time">
                  <h1>{forecast.main.temp}°C</h1>
                  <p>Time: {forecast.dt_txt.split(' ')[1]}</p>
                </div>
                <p>{forecast.weather[0].description}</p>
              </div>

              <div className="weather-summary">
                <div>Feels Like: {forecast.main.feels_like}°C</div>
                <div>Min Temp: {forecast.main.temp_min}°C</div>
                <div>Max Temp: {forecast.main.temp_max}°C</div>
                <div>Pressure: {forecast.main.pressure} hPa</div>
                <div>Humidity: {forecast.main.humidity}%</div>
              </div>

              <div className="weather-details">
                <p>Cloudiness: {forecast.clouds.all}%</p>
                <p>Wind Speed: {forecast.wind.speed} m/s</p>
                <p>Wind Direction: {forecast.wind.deg}°</p>
                <p>Rain Volume (3h): {forecast.rain?.['3h'] || 'N/A'} mm</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ForecastComponent;
