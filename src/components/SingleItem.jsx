import React from "react";
import { Link } from "react-router-dom";

const SingleItem = ({ name, id, front_default, types }) => {
  const typeColors = {
    normal: "var(--cor-normal)",
    fire: "var(--cor-fire)",
    water: "var(--cor-water)",
    electric: "var(--cor-eletric)",
    grass: "var(--cor-grass)",
    ice: "var(--cor-ice)",
    fighting: "var(--cor-fighting)",
    poison: "var(--cor-poison)",
    ground: "var(--cor-ground)",
    flying: "var(--cor-flying)",
    psychic: "var(--cor-psychic)",
    bug: "var(--cor-bug)",
    rock: "var(--cor-rock)",
    ghost: "var(--cor-ghost)",
    dragon: "var(--cor-dragon)",
    dark: "var(--cor-dark)",
    steel: "var(--cor-steel)",
    fairy: "var(--cor-fairy)",
  };
  return (
    <Link to={"/"} className="single-item">
      <div className="single-item__div-image">
        <img className="single-item__img" src={front_default} alt="" />
      </div>

      <div className="single-item__texts">
        <p className="single-item__id">#{id}</p>
        <p className="single-item__name">{name}</p>
        <div className="single-item__types">
          {types.map((type) => (
            <span
              key={type}
              className="single-item__type"
              style={{ backgroundColor: typeColors[type] }} // Aplicando a cor
            >
              {type}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default SingleItem;
