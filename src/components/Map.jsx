import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Map.css';

const Map = () => {
  const navigate = useNavigate();

  const handleMapClick = () => {
    navigate('/map'); // Navigate to the map page
  };

  return (
    <div className="map-section">
      <h2 className="map-title">Track Your Nearest Waste Bin</h2>
      <div className="map-container" onClick={handleMapClick}>
        <img 
          src="https://images.unsplash.com/photo-1558677976-54b5a5bac6d7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Click to view map" 
          className="map-placeholder"
        />
        <div className="map-overlay">
          <p>Click to find nearby waste bins</p>
        </div>
      </div>
    </div>
  );
};

export default Map;
