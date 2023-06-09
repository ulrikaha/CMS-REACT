import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from '../styles/images/Logo.svg';

const Navbar = ({ user, setUser }) => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link to ='/' className="navbar-brand"> 
        <img src={Logo} alt="Logo" className="logo-img" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                HOME
              </NavLink>
            </li>
            {!user && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                  LOGIN
                </NavLink>
              </li>
            )}
            {user && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/admin">
                    ADMIN / PRODUCT LIST
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/addProduct"> 
                    ADD NEW PRODUCT
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/orderList"> 
                    ORDER LIST
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login" onClick={() => setUser(null)}>
                    LOGOUT
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


