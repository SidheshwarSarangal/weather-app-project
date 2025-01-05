import React from 'react';

const WeatherContent = () => {
  return (
    <div className="content">
      <section id="weather-report">
        <div className="weather-city">City: <span id="city-name">City Name</span></div>
        <div className="weather-temp">Temp: <span id="current-temp">25°C</span></div>
        <div className="weather-main">Weather: <span id="weather-type">Clear</span></div>

        <div className="weather-info">
          <div className="weather-description">
            Description: <span id="weather-description">Sunny</span>
          </div>
          <div className="weather-icon">
            <img src="https://openweathermap.org/img/wn/10d@2x.png" alt="Weather Icon" />
          </div>
        </div>

        <div className="weather-stats">
          <div className="stat-item">Temp Min: <span id="temp-min">20°C</span></div>
          <div className="stat-item">Temp Max: <span id="temp-max">30°C</span></div>
          <div className="stat-item">Pressure: <span id="pressure">1013 hPa</span></div>
          <div className="stat-item">Humidity: <span id="humidity">60%</span></div>
          <div className="stat-item">Visibility: <span id="visibility">10 km</span></div>
        </div>

        <ul className="weather-extra">
          <li>Sea Level: <span id="sea-level">1010 hPa</span></li>
          <li>Ground Level: <span id="ground-level">1000 hPa</span></li>
          <li>Wind Speed: <span id="wind-speed">15 km/h</span></li>
          <li>Wind Degree: <span id="wind-degree">90°</span></li>
          <li>Wind Gust: <span id="wind-gust">20 km/h</span></li>
          <li>Rainfall (1h): <span id="rainfall">2 mm</span></li>
          <li>Clouds %: <span id="clouds">20%</span></li>
          <li>Timestamp: <span id="timestamp">12:00 PM</span></li>
          <li>Country Code: <span id="country-code">US</span></li>
          <li>Sunrise: <span id="sunrise">6:30 AM</span></li>
          <li>Sunset: <span id="sunset">5:45 PM</span></li>
          <li>Timezone: <span id="timezone">UTC-5</span></li>
          <li>Location: <span id="location">California</span></li>
        </ul>
      </section>

      <div className="report-container">
        <section id="pollution-report">
          <h2>Pollution Report</h2>
          <ul className="pollution-list">
            <li>Air Quality Index: 1/2/3/4/5 (good, fair, moderate, poor, very poor)</li>
            <li>CO (micro g/m³): <span id="co">10</span></li>
            <li>NO (micro g/m³): <span id="no">5</span></li>
            <li>NO₂ (micro g/m³): <span id="no2">15</span></li>
            <li>O₃ (micro g/m³): <span id="o3">20</span></li>
            <li>SO₂ (micro g/m³): <span id="so2">8</span></li>
            <li>PM2.5 (micro g/m³): <span id="pm25">12</span></li>
            <li>PM10 (micro g/m³): <span id="pm10">18</span></li>
            <li>NH₃ (micro g/m³): <span id="nh3">3</span></li>
          </ul>
        </section>

        <section id="maps">
          <div className="map">
            <img src="https://via.placeholder.com/450" alt="Map Layer" />
          </div>
          <div className="map">
            <img src="https://via.placeholder.com/450" alt="Map Layer" />
          </div>
        </section>
      </div>
    </div>
  );
};

export default WeatherContent;
