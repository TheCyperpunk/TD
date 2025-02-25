import React from 'react';
import './Upload.css';
import { useNavigate } from 'react-router-dom';

const Upload = () => {
  const navigate = useNavigate();
  return (
    <div className="upload-container">
      <div className="upload-content">
        <div className="upload-image-container">
          <img 
            src="https://pbs.twimg.com/media/GVWyHPYWMAAYF60?format=jpg&name=small"
            alt="Recycling Process"
            className="upload-image"
          />
        </div>
        <div className="upload-text">
          <h2>Upload Your Recyclables</h2>
          <p>Share your contribution to a greener future. Upload images of your recyclable items and join our community of eco-conscious individuals.</p>
          <button className="upload-button" onClick={() => navigate('/upload')}>
            Upload Image
          </button>
        </div>
      </div>
    </div>
  );
};

export default Upload; 