import React from 'react';
import './Banner.css';

const Banner = ({ nextSectionRef }) => {
  const handleScroll = () => {
    if (nextSectionRef && nextSectionRef.current) {
      nextSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="banner">
      <div className="banner-overlay">
        <div className="banner-content">
          <div className="banner-badge">Sustainable Future</div>
          <h1 className="banner-title">
            Transform Your <br></br><span className="banner-highlight">Waste into Value</span>
          </h1>
          <p className="banner-text">
            Join our eco-conscious community and make a positive impact on the environment while earning from your recyclables.
          </p>
          <div className="banner-buttons">
            <button className="banner-button primary" onClick={handleScroll}>
              Get Started
              <span className="button-icon">→</span>
            </button>
            <button className="banner-button secondary">
              Learn More
              <span className="button-icon">↓</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
