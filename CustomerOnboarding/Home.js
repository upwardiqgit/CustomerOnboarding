import React from 'react';
import './Home.css';
import imageSrc from './upwardiq_logo.png';
import { Link, Outlet, useLocation } from 'react-router-dom';

const Home = () => {
  const location = useLocation();

  const generateBreadcrumbs = () => {
    const path = location.pathname.split('/').filter(Boolean);
    const breadcrumbPaths = [
      <Link to="/" key="home">Home</Link>,
    ];

    if (path.length > 0) {
      path.forEach((segment, index) => {
        breadcrumbPaths.push(' > ');
        breadcrumbPaths.push(segment); 
      });
    }

    return breadcrumbPaths;
  };

  return (
    <div>
      <div className="top-section">
        <img src={imageSrc} alt="Top Section Image" />
      </div>

      <div className="container">
        <div className="sidenav">
          <ul>
            <li>
              <Link to="/customer-save"><h2>Customer Save</h2></Link>
            </li>
            <li>
              <Link to="/customer-search"><h2>CustomerSearch</h2></Link>
            </li>
          </ul>
        </div>
        <div className="content">
          <div className="breadcrumb">
            {generateBreadcrumbs()}
          </div>
          {location.pathname === '/' && (
            <h2 className="welcome">
              Welcome to UpwardIQ Customer Data Application
            </h2>
          )}
          
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Home;
