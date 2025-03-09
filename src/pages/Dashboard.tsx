// pages/Dashboard.tsx
import React from 'react';

const Dashboard: React.FC = () => {
  // Normally you'd fetch this data from your API
  const courses = [
    { id: 1, title: 'Introduction to Web Development', progress: 65 },
    { id: 2, title: 'Mobile App Design', progress: 23 },
    { id: 3, title: 'Data Science Fundamentals', progress: 0 }
  ];

  return (
    <div className="page dashboard-page">
      <h1>Your Learning Dashboard</h1>
      
      <section className="user-stats">
        <div className="stat-card">
          <h3>Courses</h3>
          <p className="stat">{courses.length}</p>
        </div>
        <div className="stat-card">
          <h3>Completed</h3>
          <p className="stat">0</p>
        </div>
        <div className="stat-card">
          <h3>Certificates</h3>
          <p className="stat">0</p>
        </div>
      </section>
      
      <section className="your-courses">
        <h2>Your Courses</h2>
        <div className="course-list">
          {courses.map(course => (
            <div key={course.id} className="course-card">
              <h3>{course.title}</h3>
              <div className="progress-bar">
                <div 
                  className="progress" 
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
              <p>{course.progress}% complete</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;