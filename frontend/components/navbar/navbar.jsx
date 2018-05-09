import React from "react";
import { Link } from "react-router-dom";

export default ({ loggedIn, currentUser, openModal, login, logout, history }) => {

  const logoDiv = (
      <div>
        <Link to="/" className="navbar-logo">
          <img src={ window.images.table42Logo } className="logo-img" alt="table-42-logo"/>
          <h1>Table42</h1>
        </Link>
      </div>
  );

  const handleLogout = () => {
    logout().then(() => history.push("/"));
  };

  let buttonDiv;
  if (loggedIn) {
    // once user profile page is created add Link here

    buttonDiv = (
      <div className="navbar-button-container">
        <h2 className="navbar-greeting">Hi, { currentUser.fname }</h2>
        <button className="navbar-button logout"
          onClick={ handleLogout }>Log Out</button>
      </div>
    );
  } else {
    buttonDiv = (
      <div className="navbar-button-container">
        <button className="navbar-button" onClick={ () => openModal("signup") }>Sign Up</button>
        <button className="navbar-button" onClick={ () => openModal("login") }>Log In</button>
      </div>
    );
  }

  return (
    <nav className="navbar-container">
      { logoDiv }
      { buttonDiv }
    </nav>
  );
};
