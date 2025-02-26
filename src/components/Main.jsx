import React, { useEffect, useState } from "react";
import { fetchPokemon } from "../services/pokemonService";
import { fetchAllPokemons } from "../services/pokemonFetcher";
import { useNavigate } from "react-router-dom";
import option_icon from "../assets/icons/option_icon.png";
import search_icon from "../assets/icons/search_icon.png";
import ItemList from "./ItemList";

const Main = () => {
  const [error, setError] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const [currentList, setCurrentList] = useState([]);
  const [alfaPokemon, setAlfaPokemon] = useState([]);
  const [numPokemon, setNumPokemon] = useState([]);
  const generation = [151, 100, 135, 107, 156, 72, 88, 96, 120];
  const [currentPage, setCurrentPage] = useState(0);

  // FETCH

  useEffect(() => {
    const getAllPokemons = async () => {
      try {
        const fetchedPokemons = await fetchAllPokemons();

        setPokemons(fetchedPokemons);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    getAllPokemons();
  }, []);

  // ORDER

  useEffect(() => {
    const pokemonData = pokemons.map((pokemon) => ({
      id: pokemon.id,

      name: pokemon.name,

      front_default: pokemon.sprites.front_default,

      types: pokemon.types.map((typeInfo) => typeInfo.type.name),
    }));

    const sortAlfa = pokemonData.slice().sort((a, b) => {
      if (a.name < b.name) return -1;

      if (a.name > b.name) return 1;

      return 0;
    });

    setAlfaPokemon(sortAlfa);

    setNumPokemon(pokemonData);
  }, [pokemons]);

  useEffect(() => {
    const itemsPerPage = generation[currentPage];

    const startIndex =
      currentPage === 0
        ? 0
        : generation.slice(0, currentPage).reduce((a, b) => a + b, 0);

    const endIndex = startIndex + itemsPerPage;

    const currentItems = numPokemon.slice(startIndex, endIndex);

    setCurrentList(currentItems);
  }, [currentPage, numPokemon]);

  const handleGeneration = (index) => {
    setCurrentPage(index);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSearch = () => {
    fetchPokemon(inputValue)
      .then((data) => {
        if (data && data.name) {
          navigate("/pokedex", { state: { pokemon: inputValue } });
        } else {
          setError(true);
        }
      })

      .catch(() => {
        setError(true);
      });
  };

  const handleOrdem = (tipo) => {
    if (tipo === "num") {
      setCurrentList(numPokemon);
    }

    if (tipo === "alfa") {
      setCurrentList(alfaPokemon);
    }
  };

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
              <a
                href="#"
                className="main-header__dropdown-link"
                onClick={() => handleOrdem("num")}
              >
                Ordem Numerica
              </a>
              <a
                href="#"
                className="main-header__dropdown-link"
                onClick={() => handleOrdem("alfa")}
              >
                Ordem A-Z
              </a>
              <a
                href="#"
                className="main-header__dropdown-link"
                onClick={() => handleGeneration(0)}
              >
                1º Gen
              </a>
              <a
                href="#"
                className="main-header__dropdown-link"
                onClick={() => handleGeneration(1)}
              >
                2º Gen
              </a>
              <a
                href="#"
                className="main-header__dropdown-link"
                onClick={() => handleGeneration(2)}
              >
                3º Gen
              </a>
              <a
                href="#"
                className="main-header__dropdown-link"
                onClick={() => handleGeneration(3)}
              >
                4º Gen
              </a>
              <a
                href="#"
                className="main-header__dropdown-link"
                onClick={() => handleGeneration(4)}
              >
                5º Gen
              </a>
              <a
                href="#"
                className="main-header__dropdown-link"
                onClick={() => handleGeneration(5)}
              >
                6º Gen
              </a>
              <a
                href="#"
                className="main-header__dropdown-link"
                onClick={() => handleGeneration(6)}
              >
                7º Gen
              </a>
              <a
                href="#"
                className="main-header__dropdown-link"
                onClick={() => handleGeneration(7)}
              >
                8º Gen
              </a>
              <a
                href="#"
                className="main-header__dropdown-link"
                onClick={() => handleGeneration(8)}
              >
                9º Gen
              </a>
            </div>
          )}
        </div>
      </div>
      <div>
        <ItemList pokemons={currentList} />
      </div>
    </div>
  );
};

export default Main;
