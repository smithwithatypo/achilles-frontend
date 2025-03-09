// pages/About.tsx
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="page about-page">
      <h1>About Us</h1>
      <p>We're dedicated to making education accessible and engaging for everyone.</p>
      
      <section className="mission">
        <h2>Our Mission</h2>
        <p>To transform how people learn by creating intuitive and effective educational experiences.</p>
      </section>
      
      <section className="team">
        <h2>Our Team</h2>
        <div className="team-members">
          <div className="member">
            <h3>Jane Doe</h3>
            <p>Education Specialist</p>
          </div>
          <div className="member">
            <h3>John Smith</h3>
            <p>Technology Lead</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;