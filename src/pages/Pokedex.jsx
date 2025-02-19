import React, { useState, useEffect, useRef } from "react";
import { fetchPokemon } from "../services/pokemonService";
import { useLocation } from "react-router-dom";

const Pokedex = () => {
  const location = useLocation();
  const initialPokemon = location.state?.pokemon;

  const [pokemonSprite, setPokemonSprite] = useState();
  const [pokemonName, setPokemonName] = useState();
  const [pokemonId, setPokemonId] = useState();
  const [inputValue, setInputValue] = useState(initialPokemon);

  const inputRef = useRef(null); // Criação da referência para o input

  // Função para buscar Pokémon
  const getPokemonData = (pokemon) => {
    fetchPokemon(pokemon)
      .then((data) => {
        if (data) {
          setPokemonSprite(data.sprites.front_default);
          setPokemonName(data.name);
          setPokemonId(data.id);
          setInputValue("");
          console.log(data);
        }
        if (Number(data.id) < 920) {
          setPokemonSprite(data.sprites.other.showdown.front_default);
        }
      })
      .catch((error) => console.error(error));
  };

  // Efeito para buscar Pokémon inicial
  useEffect(() => {
    if (initialPokemon) {
      getPokemonData(initialPokemon);
    }
    inputRef.current.focus();
  }, [initialPokemon]);

  // Função para trocar pokémon
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSearch = () => {
    getPokemonData(inputValue);
    inputRef.current.focus();
  };

  return (
    <div className="pokedex__container">
      <div className="pokedex">
        <h2>{pokemonName}</h2>
        {pokemonSprite && (
          <img
            src={pokemonSprite}
            alt="pokemon img"
            className="pokedex__image"
          />
        )}
        <h2>#{pokemonId}</h2>
        <p className="pokedex__buscar">
          <input
            type="text"
            placeholder="Digite o nome ou id do pokemon"
            className="pokedex__pesquisar"
            value={inputValue}
            onChange={handleInputChange}
            ref={inputRef}
          />
          <input
            type="button"
            className="pokedex__button"
            value="Pesquisar"
            onClick={handleSearch}
          />
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
