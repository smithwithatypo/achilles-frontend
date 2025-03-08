// pages/NotFound.tsx
import React from 'react';
import { Link } from 'react-router';

const NotFound: React.FC = () => {
  return (
    <div className="page not-found-page">
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist or has been moved.</p>
      <div className="action">
        <Link to="/" className="button">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;