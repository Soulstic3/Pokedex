import React, { useState } from "react";
import SingleItem from "./SingleItem";

const ItemList = ({ pokemons }) => {
  return (
    <div className="item-list__container">
      {pokemons.map((pokemon) => (
        <SingleItem
          key={pokemon.id}
          name={pokemon.name}
          id={pokemon.id}
          front_default={pokemon.front_default}
          types={pokemon.types}
        />
      ))}
    </div>
  );
};

export default ItemList;
