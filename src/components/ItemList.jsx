import React, { useState } from "react";
import SingleItem from "./SingleItem";

const ItemList = ({ pokemons }) => {
  const numPokemons = pokemons.slice();
  const alfaPokemons = pokemons.slice().sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });
  return (
    <div className="item-list__container">
      {alfaPokemons.map((pokemon) => (
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
