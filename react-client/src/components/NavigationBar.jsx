import React from 'react';
import PropTypes from 'prop-types';

const NavigationBar = ({ children }) => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active" />
        <li className="nav-item" />
        <li className="nav-item" />
      </ul>
    </div>
    {children}
  </nav>
);

NavigationBar.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NavigationBar;
