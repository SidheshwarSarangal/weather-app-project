import React, { useState, useEffect } from 'react';
import '../css/style.css';
import WeatherComponent from './WeatherComponent';
import ForecastComponent from './ForecastComponent';
import WeatherMap from './WeatherMap';
import AirPollution from './AirPollution';

function Home() {
  const [city, setCity] = useState('');
  const [locations, setLocations] = useState([]);
  const [locationerror, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedPane, setSelectedPane] = useState(null);

  const API_KEY = "35d9c7252de277bc6e2cd50ea634d190";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!city) {
      setError('Please enter a city name.');
      return;
    }

    try {
      setError('');
      setLoading(true);

      const response = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch location data!');
      }

      const data = await response.json();
      if (data.length === 0) {

        setError('No locations found for the entered city.');
      } else {
        setLocations(data);
        setError('');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (locations.length > 0 && selectedLocation) {
      setSelectedLocation(null); // Ensure no location is selected when new city is searched
    }
  }, [locations]);


  useEffect(() => {
    if (locationerror) {
      // Apply error styles to body
      const element = document.getElementById('content');
      // document.body.style.backgroundColor = 'black';
      element.style.display = 'none'
      // document.body.style.color = 'white';
    } else {
      // Reset to default styles
      document.body.style.backgroundColor = 'white';
      document.body.style.color = 'black';
    }
  }, [locationerror]);

  const handleLocationClick = (location) => {
    setSelectedLocation({
      name: location.name,
      state: location.state,
      country: location.country,
      lat: location.lat,
      lon: location.lon,
    }); // Set selected location to display details
    setSelectedPane(null);
  };

  const handleBackClick = () => {
    setSelectedLocation(null); // Reset selected location to go back to the list
  };

  const handlePanelClick = (pane) => {
    setSelectedPane(pane);
  }
  const handlePanelBackClick = () => {
    setSelectedPane(null);
  }



  return (
    <div id="main-page">
      <header>
        <h1 id="app-title">Weather Application</h1>
      </header>

      <section id="location-form">
        <form id="location-form-part" onSubmit={handleSubmit}>
          <label htmlFor="location" className="form-label">
            Location (City):
          </label>
          <br />
          <input
            type="text"
            id="location"
            name="location"
            className="form-input"
            placeholder="Enter the City Name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <br />
          <button type="submit" id="handler" disabled={loading}>
            {loading ? 'Loading...' : 'Submit'}
          </button>
        </form>
      </section>

      {locationerror && <p style={{ color: 'red' }}>{locationerror}</p>}


      <div id='content'>
        {/* Show results or content based on selectedLocation */}
        {selectedLocation ? (
          selectedPane ? (
            <div id="pane-content">
              <button className="last-button" onClick={handlePanelBackClick}>Back to Location Details</button>
              {selectedPane === "currentWeather" && (
                <div>
                  <WeatherComponent lat={selectedLocation.lat} lon={selectedLocation.lon} apiKey={API_KEY} />
                </div>
              )}
              {selectedPane === "forecast" && (
                <div>

                  <ForecastComponent lat={selectedLocation.lat} lon={selectedLocation.lon} apiKey={API_KEY} />
                </div>
              )}
              {selectedPane === "basicWeatherMap" && (
                <div>
                  <WeatherMap lat={selectedLocation.lat} lon={selectedLocation.lon} apiKey={API_KEY} />
                </div>
              )}
              {selectedPane === "airPollution" && (
                <AirPollution lat={selectedLocation.lat} lon={selectedLocation.lon} apiKey={API_KEY} />
              )}
            </div>
          ) : (
            <div id="location-details">
              <h2>SELECT AN OPTION</h2>
              <p><strong>Details for {selectedLocation.name}</strong></p>
              <p><strong>State:</strong> {selectedLocation.state}</p>
              <p><strong>Country:</strong> {selectedLocation.country}</p>
              <p><strong>Latitude:</strong> {selectedLocation.lat}</p>
              <p><strong>Longitude:</strong> {selectedLocation.lon}</p>

              <div className="pane-options">
                <button onClick={() => handlePanelClick('currentWeather')}>
                  Current Weather
                </button>
                <button onClick={() => handlePanelClick('forecast')}>
                  Forecast
                </button>
                <button onClick={() => handlePanelClick('basicWeatherMap')}>
                  Basic Weather Maps
                </button>
                <button onClick={() => handlePanelClick('airPollution')}>
                  Air Pollution
                </button>
              </div>

              <button className="last-button" onClick={handleBackClick}>Back to Results</button>
            </div>

          )
        ) : (
          locations.length > 0 && (
            <div id="results-container">
              <h2>Results:</h2>
              <ul>
                {locations.map((location, index) => (
                  <li
                    key={index}
                    style={{ marginBottom: '15px', cursor: 'pointer' }}
                    onClick={() => handleLocationClick(location)}
                  >
                    <strong>{location.name}</strong>
                    {location.state && `, ${location.state}`}
                    {location.country && ` (${location.country})`}
                    <br />
                    <em>Latitude:</em> {location.lat}, <em>Longitude:</em> {location.lon}
                  </li>
                ))}
              </ul>
            </div>
          )
        )}
      </div>

    </div>
  );
}

export default Home;
