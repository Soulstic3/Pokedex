import React, { useState } from "react";
import { fetchPokemon } from "../services/pokemonService";
import { useLocation } from "react-router-dom";

const Pokedex = () => {
  const location = useLocation();

  const pokemon = location.state?.pokemon;

  console.log("Valor recebido: ", pokemon);

  const [pokemonSprite, setPokemonSprite] = useState();

  fetchPokemon(pokemon)
    .then((data) => {
      if (data) {
        setPokemonSprite(data.sprites.front_default);
      }
    })
    .catch((error) => console.error(error));

  return (
    <div className="pokedex__container">
      <div className="pokedex">
        <h2>Nome</h2>
        <img src={pokemonSprite} alt="pokemon img" />
        <h2>#ID</h2>
        <p className="pokedex__buscar">
          <input
            type="text"
            placeholder="Digite o nome ou id do pokemon"
            className="pokedex__pesquisar"
          />
          <input type="button" className="pokedex__button" value="Pesquisar" />
        </p>
      </div>
      <div className="pokedex__info">
        <h2>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis
          enim illo temporibus deserunt modi voluptate vel mollitia! Ex amet
          iusto velit quae quia ipsam fugiat consequuntur, sint, tempora,
          deserunt dolores?
        </h2>
      </div>
    </div>
  );
};

export default Pokedex;
