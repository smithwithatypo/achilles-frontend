// pages/Home.tsx
import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="page home-page">
      <h1>Welcome to Our Education App</h1>
      <p>Learn at your own pace with our interactive lessons.</p>
      
      <div className="feature-cards">
        <div className="card">
          <h2>Interactive Lessons</h2>
          <p>Engage with content that adapts to your learning style.</p>
        </div>
        
        <div className="card">
          <h2>Track Progress</h2>
          <p>See your achievements and stay motivated.</p>
        </div>
        
        <div className="card">
          <h2>Learn Anywhere</h2>
          <p>Access your courses on any device, anytime.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;