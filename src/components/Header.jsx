import React from "react";
import logoPokeball from "../assets/logo/game.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <div className="header__logo">
        <Link to="/">
          <img className="logo" src={logoPokeball} alt="logo" />
        </Link>
        <Link to="/" className="header__link">
          <h1>Pokedex</h1>
        </Link>
      </div>
    </div>
  );
};

export default Header;
