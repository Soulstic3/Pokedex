import React, { use, useEffect, useState } from "react";
import { fetchPokemon } from "../services/pokemonService";
import { fetchAllPokemons } from "../services/pokemonFetcher";
import { useNavigate } from "react-router-dom";
import option_icon from "../assets/icons/option_icon.png";
import search_icon from "../assets/icons/search_icon.png";
import ItemList from "./ItemList";

const Main = () => {
  const [error, setError] = useState(false); // esconde a mensagem de erro
  const [dropdown, setDropdown] = useState(false);
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    const getAllPokemons = async () => {
      try {
        const fetchedPokemons = await fetchAllPokemons();
        console.log(fetchedPokemons);
        setPokemons(fetchedPokemons);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    getAllPokemons();
  }, []); // O array vazio [] significa que o efeito será executado apenas uma vez, após a montagem do componente.

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

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

  // Extraindo id, name e front_default

  const pokemonData = pokemons.map((pokemon) => ({
    id: pokemon.id,

    name: pokemon.name,

    front_default: pokemon.sprites.front_default,

    types: pokemon.types.map((typeInfo) => typeInfo.type.name),
  }));

  const exibirDropdown = () => {
    setDropdown(!dropdown);
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
          <img src={option_icon} alt="opções" onClick={exibirDropdown} />
          {dropdown && (
            <div className="main-header__dropdown">
              <a href="#" className="main-header__dropdown-link">
                Ordem Numerica
              </a>
              <a href="#" className="main-header__dropdown-link">
                Ordem A-Z
              </a>
              <a href="#" className="main-header__dropdown-link">
                1º Gen
              </a>
              <a href="#" className="main-header__dropdown-link">
                2º Gen
              </a>
              <a href="#" className="main-header__dropdown-link">
                3º Gen
              </a>
              <a href="#" className="main-header__dropdown-link">
                4º Gen
              </a>
              <a href="#" className="main-header__dropdown-link">
                5º Gen
              </a>
              <a href="#" className="main-header__dropdown-link">
                6º Gen
              </a>
              <a href="#" className="main-header__dropdown-link">
                7º Gen
              </a>
              <a href="#" className="main-header__dropdown-link">
                8º Gen
              </a>
              <a href="#" className="main-header__dropdown-link">
                9º Gen
              </a>
            </div>
          )}
        </div>
      </div>
      <div>
        <ItemList pokemons={pokemonData} />
      </div>
    </div>
  );
};

export default Main;
