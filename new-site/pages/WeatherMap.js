import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../css/WeatherMap.css'

function WeatherMap({ lat, lon, apiKey }) {
  const tileSize = 512; // Standard tile size
  const layers = [
    'clouds_new',
    'precipitation_new',
    'pressure_new',
    'wind_new',
    'temp_new',
  ];
  const maxZoom = 10; // Maximum zoom level for this example
  const defaultLayer = 'precipitation_new'; // Default layer to show precipitation

  const [zoom, setZoom] = useState(0); // Default zoom level
  const [layer, setLayer] = useState(defaultLayer); // Default layer is precipitation
  const [isSmallScreen, setIsSmallScreen] = useState(false); // To track screen size

  // Check if the screen width is small enough for a dropdown list
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 600); // Change this threshold as needed
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Convert latitude/longitude to tile coordinates
  const calculateTileCoordinates = () => {
    const scale = Math.pow(2, zoom);
    const x = Math.floor(((lon + 180) / 360) * scale); // Normalize longitude to X
    const latRad = (lat * Math.PI) / 180; // Convert latitude to radians
    const y = Math.floor(
      ((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) * scale
    ); // Normalize latitude to Y

    return {
      x: x,
      y: y,
    };
  };

  const { x, y } = calculateTileCoordinates();

  // Tile URL for the calculated tile
  const tileUrl = `https://tile.openweathermap.org/map/${layer}/${zoom}/${x}/${y}.png?appid=${apiKey}`;

  return (
    <div className="weather-map-container">
      <h3>Weather Map</h3>
      <p>
        <strong>Latitude:</strong> {lat}, <strong>Longitude:</strong> {lon}
      </p>

      {/* Select Layer */}
      <div className="layer-control">
        <label htmlFor="layer">Select Layer:</label>
        <select
          id="layer"
          value={layer}
          onChange={(e) => setLayer(e.target.value)}
        >
          {layers.map((option) => (
            <option key={option} value={option}>
              {option.replace('_new', '').toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      {/* Select Zoom Level */}
      <div className="zoom-control">
        <label htmlFor="zoom">Select Zoom Level:</label>
        {isSmallScreen ? (
          <select
            id="zoom"
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
          >
            {[...Array(maxZoom + 1).keys()].map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        ) : (
          <input
            type="range"
            id="zoom"
            min="0"
            max={maxZoom}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
          />
        )}
      </div>

      <p>
        <em>Tile Coordinates:</em> X: {x}, Y: {y}
      </p>
      <p>
        <strong>Selected Layer:</strong> {layer.replace('_new', '').toUpperCase()}
      </p>
      <p>
        <strong>Zoom Level:</strong> {zoom}
      </p>

      {/* Display the tile */}
      <div
        className="tile"
        style={{
          width: tileSize,
          height: tileSize,
          backgroundImage: `url(${tileUrl})`,
          backgroundSize: 'cover',
          border: '1px solid #ccc',
          marginTop: '10px',
        }}
      ></div>


    </div>
  );
}

WeatherMap.propTypes = {
  lat: PropTypes.number.isRequired,
  lon: PropTypes.number.isRequired,
  apiKey: PropTypes.string.isRequired,
};

export default WeatherMap;
