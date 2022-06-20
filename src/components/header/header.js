import React from 'react';
import { Link } from 'react-router-dom';

import './header.css';

const Header = () => {
  return (
    <div className="header d-flex">
      <h3>
        <a href="#/">
          StarDB
        </a>
      </h3>
      <ul className="d-flex">
        <li><Link to={`/`}> People </Link></li>
        <li><Link to={`/planet-page`}> Planets </Link></li>
        <li><Link to={`/starship-page`}> Starships </Link></li>
      </ul>
    </div>
  );
};

export default Header;