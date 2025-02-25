import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Cloth.css';

const Cloth = () => {
  const navigate = useNavigate();

  return (
    <div className="cloth-container">
      <div className="cloth-content">
        <div className="cards-container">
          <div className="cloth-text">
            <h2 className="cloth-title">Sell Your Old Clothes</h2>
            <p className="cloth-description">
              Give your pre-loved clothes a second life. Make a positive impact on the environment 
              while earning money from your unused wardrobe.
            </p>
          </div>
          
          <div className="card">
            <div className="card-image-wrapper">
              <img 
                src="https://i.pinimg.com/736x/83/ef/23/83ef232d26644cdbc8e4222dd26c95f9.jpg" 
                alt="Thrift Store Clothes"
                className="card-image"
              />
            </div>
            <div className="card-content">
              <h3>Thrift Store Collection</h3>
              <p>Browse through our curated collection of vintage and pre-loved clothing collections</p>
              <button className="card-button" onClick={() => navigate('/collection')}>
                Browse Collection
                <span className="button-icon">→</span>
              </button>
            </div>
          </div>

          <div className="card">
            <div className="card-image-wrapper">
              <img 
                src="https://i.pinimg.com/736x/a3/1b/e1/a31be1e9ca4dd2957c88495c25fcb310.jpg" 
                alt="Sell Clothes"
                className="card-image"
              />
            </div>
            <div className="card-content">
              <h3>Sell Your Clothes</h3>
              <p>Turn your unused clothes into cash. Easy selling process with maximum returns.</p>
              <button className="card-button" onClick={() => navigate('/collection')}>
                Start Selling
                <span className="button-icon">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cloth;
