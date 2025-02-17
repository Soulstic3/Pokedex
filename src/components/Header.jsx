import React from "react";
import logoPokeball from "../assets/logo/game.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <div className="header__logo">
        <img className="logo" src={logoPokeball} alt="logo" />
        <a href="/" className="header__link">
          <h1>Pokedex</h1>
        </a>
      </div>
    </div>
  );
};

export default Header;
