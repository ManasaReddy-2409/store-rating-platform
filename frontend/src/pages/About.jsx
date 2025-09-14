import React from 'react';
import '../pages/About.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-card">
        <h1>About the Store Rating Platform</h1>
        <p>
          Welcome to the premier platform for unbiased and community-driven store reviews and ratings. Our mission is to
          empower consumers with transparent information, helping them make informed decisions and discover the best
          local and online stores.
        </p>
        <p>
          We believe that every customer experience counts. By providing a space for honest feedback, we foster a community
          where store owners can listen to their customers and continuously improve their services.
        </p>
        <div className="features">
          <h3>Key Features:</h3>
          <ul>
            <li>📝 Unbiased and verified reviews from real customers.</li>
            <li>⭐ A comprehensive rating system to quickly assess store quality.</li>
            <li>🔍 Powerful search and filtering to find stores that meet your needs.</li>
            <li>🤝 A community-driven approach to highlight both good and bad experiences.</li>
          </ul>
        </div>
        <p className="closing-statement">
          Join our community today and start sharing your valuable insights. Your voice helps shape a better shopping
          experience for everyone!
        </p>
      </div>
    </div>
  );
};

export default About;
