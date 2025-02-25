import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>About Us</h1>
        <p>Making Sustainability a Way of Life</p>
      </div>

      <div className="about-content">
        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            We aim to reduce waste and promote sustainable living by providing a platform 
            where people can recycle, donate, and repurpose their unused items. 
            Together, we can create a cleaner and greener planet.
          </p>
        </section>

        <section className="about-section">
          <h2>What We Do</h2>
          <ul>
            <li><strong>Recycling Programs:</strong> Helping individuals and businesses recycle effectively.</li>
            <li><strong>Clothing & Electronics Reuse:</strong> Donate or sell pre-loved items.</li>
            <li><strong>Community Awareness:</strong> Educating communities on waste management.</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>Why Choose Us?</h2>
          <p>
            Our platform makes recycling simple, rewarding, and impactful. 
            By participating, you contribute to a circular economy and 
            help reduce environmental pollution.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
