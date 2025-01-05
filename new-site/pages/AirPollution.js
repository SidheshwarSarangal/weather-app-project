import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import "../css/AirPollution.css"

function AirPollution({ lat, lon, apiKey }) {
  const [airData, setAirData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAirPollutionData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch air pollution data');
        }

        const data = await response.json();
        setAirData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAirPollutionData();
  }, [lat, lon, apiKey]);

  const aqiDescriptions = {
    1: 'Good',
    2: 'Fair',
    3: 'Moderate',
    4: 'Poor',
    5: 'Very Poor',
  };

  if (loading) return <p>Loading air pollution data...</p>;
  if (error) return <p>Error: {error}</p>;

  const airInfo = airData?.list[0];
  if (!airInfo) return <p>No air pollution data available.</p>;

  const { aqi } = airInfo.main;
  const { co, no, no2, o3, so2, pm2_5, pm10, nh3 } = airInfo.components;

  return (
    <div className="air-pollution-container">
      <h3>Air Pollution Data</h3>
      <p className="aqi-description">
        <strong>Air Quality Index (AQI):</strong> {aqi} (
        <span>{aqiDescriptions[aqi]}</span>)
      </p>
      <table>
        <thead>
          <tr>
            <th>Component</th>
            <th>Concentration (μg/m³)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>CO (Carbon Monoxide)</td>
            <td>{co.toFixed(2)}</td>
          </tr>
          <tr>
            <td>NO (Nitric Oxide)</td>
            <td>{no.toFixed(2)}</td>
          </tr>
          <tr>
            <td>NO2 (Nitrogen Dioxide)</td>
            <td>{no2.toFixed(2)}</td>
          </tr>
          <tr>
            <td>O3 (Ozone)</td>
            <td>{o3.toFixed(2)}</td>
          </tr>
          <tr>
            <td>SO2 (Sulfur Dioxide)</td>
            <td>{so2.toFixed(2)}</td>
          </tr>
          <tr>
            <td>PM2.5 (Fine Particulate Matter)</td>
            <td>{pm2_5.toFixed(2)}</td>
          </tr>
          <tr>
            <td>PM10 (Particulate Matter)</td>
            <td>{pm10.toFixed(2)}</td>
          </tr>
          <tr>
            <td>NH3 (Ammonia)</td>
            <td>{nh3.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

AirPollution.propTypes = {
  lat: PropTypes.number.isRequired,
  lon: PropTypes.number.isRequired,
  apiKey: PropTypes.string.isRequired,
};

export default AirPollution;
