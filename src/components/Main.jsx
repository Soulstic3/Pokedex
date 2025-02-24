import React, { useEffect, useState } from "react";
import { fetchPokemon } from "../services/pokemonService";
import { useNavigate } from "react-router-dom";
import option_icon from "../assets/icons/option_icon.png";
import search_icon from "../assets/icons/search_icon.png";

const Main = () => {
  const [pokemonSprite, setPokemonSprite] = useState();

  const [error, setError] = useState(false); // esconde a mensagem de erro

  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSearch = () => {
    fetchPokemon(inputValue)
      .then((data) => {
        if (data && data.name) {
          navigate("/pokedex", { state: { pokemon: inputValue } });
        } else {
          setError(true); // mostra a mensagem de erro
        }
      })
      .catch((error) => {
        setError(true);
      });
  };

  return (
    <div className="main">
      <div className="main__header">
        <div className="main__texto">
          <p className="main__pesquisar">
            <input
              type="text"
              placeholder="Digite o nome ou numero da pokédex do seu pokémon"
              className="main__pesquisar__campo"
              value={inputValue}
              onChange={handleInputChange}
            />
            <img
              src={search_icon}
              alt="Pesquisar"
              className="main__pesquisar__button"
              onClick={handleSearch}
              style={{ cursor: "pointer" }} // Adiciona um cursor de ponteiro
            />
          </p>
          {error && (
            <p className="main__error">
              Pokemon não encontrado, tente novamente
            </p>
          )}
          <p className="main__ordem">Pokemons ordenados por numero</p>
        </div>
        <div className="main__header__options">
          <img src={option_icon} alt="opções" />
        </div>
      </div>
      <div>{/*GRID*/}</div>
    </div>
  );
};

export default Main;
