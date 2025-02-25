import React from 'react';
import './Electronics.css';
import { useNavigate } from 'react-router-dom';

const Electronics = () => {
  const navigate = useNavigate();
  const cards = [
    {
      title: "Computers & Laptops",
      description: "Recycle your old computers, laptops, and accessories",
      image: "https://i.pinimg.com/736x/06/f0/f7/06f0f79b035ae18ccecf5add1689ed20.jpg"
    },
    {
      title: "Mobile Devices",
      description: "Smartphones, tablets, and other portable electronics",
      image: "https://i.pinimg.com/736x/55/c1/14/55c114072d3ad1e284e75a991548bd52.jpg"
    },
    {
      title: "Home Electronics",
      description: "TVs, gaming consoles, and home entertainment systems",
      image: "https://i.pinimg.com/736x/66/89/31/668931894dcf468809a7388c3abd3018.jpg"
    }
  ];

  return (
    <div className="electronics-container">
      <div className="electronics-content">
        <div className="electronics-text">
          <h2 className="animate-title">Electronic Waste Recycling</h2>
          <p className="animate-text">Give your old electronics a new purpose. Proper disposal of electronic waste helps protect our environment and recovers valuable materials.</p>
          
          <div className="stats-container">
            <div className="stat-card">
              <span className="stat-number">85%</span>
              <p>E-waste Recyclable</p>
            </div>
            <div className="stat-card">
              <span className="stat-number">50M</span>
              <p>Tons Annually</p>
            </div>
            <div className="stat-card">
              <span className="stat-number">40%</span>
              <p>Recovery Rate</p>
            </div>
          </div>

          <div className="action-buttons">
            <button className="electronics-button primary-btn" onClick={() => navigate('/mp')}>
              Find Your Missing Piece
              <span className="btn-icon">→</span>
            </button>
            <button className="electronics-button secondary-btn" onClick={() => navigate('/mp')}>
              Learn More
              <span className="btn-icon">↗</span>
            </button>
          </div>
        </div>

        <div className="electronics-cards">
          {cards.map((card, index) => (
            <div key={index} className="electronics-card">
              <div className="card-image-container">
                <img src={card.image} alt={card.title} className="card-image" />
              </div>
              <div className="card-content">
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                <button className="card-button" onClick={() => navigate('/mp')}>
                  Recycle Now
                  <span className="btn-icon">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Electronics; 