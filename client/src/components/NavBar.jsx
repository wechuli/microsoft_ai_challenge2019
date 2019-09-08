import React from 'react';
import {NavLink} from 'react-router-dom';
import logo from '../images/logo.jpg';

const NavBar = () => {
    return (
<nav className="navbar is-dark" role="navigation" aria-label="main navigation">
  <div className="navbar-brand">
    <NavLink className="navbar-item" to ="/">
      <img src={logo}  alt="logo"/>
    </NavLink>

    <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" className="navbar-menu">
    <div className="navbar-start">
      <NavLink to="/" className="navbar-item">
        Home
      </NavLink>
      
    </div>

    <div className="navbar-end">
      <div className="navbar-item">
        <div className="buttons">
          <NavLink to="/upload" className="button is-primary">
            <strong>Upload Photo</strong>
          </NavLink>
       
        </div>
      </div>
    </div>
  </div>
</nav>
    )
}

export default NavBar
