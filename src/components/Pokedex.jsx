import React, { useState, useEffect, useRef } from "react";
import { fetchPokemon } from "../services/pokemonService";
import { useLocation } from "react-router-dom";
import ProgressBar from "./ProgressBar";

const Pokedex = () => {
  const location = useLocation();
  const initialPokemon = location.state?.pokemon;

  const [pokemonSprite, setPokemonSprite] = useState("");
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonId, setPokemonId] = useState("");
  const [pokemonAltura, setPokemonAltura] = useState("");
  const [pokemonPeso, setPokemonPeso] = useState("");
  const [pokemonTipo, setPokemonTipo] = useState([]);
  const [pokemonHabilidades, setPokemonHabilidades] = useState([]);
  const [inputValue, setInputValue] = useState(initialPokemon);
  const [pokemonStats, setPokemonStats] = useState([]);

  const inputRef = useRef(null); // Criação da referência para o input

  // Referencia de cores de acordo com o tipo do pokemon
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

  // Função para buscar Pokémon
  const getPokemonData = (pokemon) => {
    fetchPokemon(pokemon)
      .then((data) => {
        if (data) {
          setPokemonSprite(data.sprites.front_default);
          setPokemonName(data.name);
          setPokemonId(data.id);
          setPokemonAltura(data.height);
          setPokemonPeso(data.weight);
          const tipos = data.types.map((tipo) => tipo.type.name);
          setPokemonTipo(tipos);
          const habilidades = data.abilities.map(
            (habilidade) => habilidade.ability.name
          );
          setPokemonHabilidades(habilidades);
          const stats = data.stats.map((stat) => stat.base_stat);
          setPokemonStats(stats);
          setInputValue("");
          console.log(stats);
        }
        if (Number(data.id) < 920) {
          setPokemonSprite(
            data.sprites.other["official-artwork"].front_default
          );
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

  // Mudar a cor do header e do fundo
  useEffect(() => {
    const header = document.querySelector(".header");
    const root = document.querySelector("#root");

    if (header && pokemonTipo.length > 0) {
      const corTipo1 = typeColors[pokemonTipo[0]] || "transparent";
      const corTipo2 = pokemonTipo[1] ? typeColors[pokemonTipo[1]] : corTipo1;
      header.style.background = `linear-gradient(to right, ${corTipo1}, ${corTipo2})`;
    }

    if (root && pokemonTipo.length > 0) {
      const corTipo1 = typeColors[pokemonTipo[0]] || "transparent";
      const corTipo2 = pokemonTipo[1] ? typeColors[pokemonTipo[1]] : corTipo1;
      root.style.background = `linear-gradient(to right, ${corTipo1}, ${corTipo2})`;
    }

    return () => {
      if (header) {
        header.style.background = ""; // Restaura o background original
      }

      if (root) {
        root.style.background = ""; // Restaura o background original
      }
    };
  }, [pokemonTipo]);

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
      <div className="pokedex__header">
        <h2 className="pokedex__name">{pokemonName}</h2>
        <h2 className="pokedex__number">
          #{pokemonId < 1000 ? ("000" + pokemonId).slice(-3) : pokemonId}
        </h2>
      </div>
      <div className="pokedex__divs">
        <div className="pokedex__div__image">
          {pokemonSprite && (
            <img
              src={pokemonSprite}
              alt="pokemon img"
              className="pokedex__image"
            />
          )}
          <div>
            {pokemonTipo.map((tipo) => (
              <span
                key={tipo}
                className="single-item__type"
                style={{ backgroundColor: typeColors[tipo] }}
              >
                {tipo}
              </span>
            ))}
          </div>
        </div>
        <div className="pokedex__div__info">
          <h2 className="pokedex__info__title">Pokédex data:</h2>
          <p>{`Altura: ${pokemonAltura}`}</p>
          <p>{`Peso: ${pokemonPeso}`}</p>
          <p>{`Habilidades: ${pokemonHabilidades[0]}, ${pokemonHabilidades[1]}`}</p>
        </div>
        <div className="pokedex__div__stats">
          <h2>Base stats:</h2>
          <div className="pokedex__stat">
            <p>{`HP: ${pokemonStats[0]}`}</p>
            <ProgressBar value={pokemonStats[0]} />
          </div>
          <div className="pokedex__stat">
            <p>{`Attack: ${pokemonStats[1]}`}</p>
            <ProgressBar value={pokemonStats[1]} />
          </div>
          <div className="pokedex__stat">
            <p>{`Defence: ${pokemonStats[2]}`}</p>
            <ProgressBar value={pokemonStats[2]} />
          </div>
          <div className="pokedex__stat">
            <p>{`Sp. Atk: ${pokemonStats[3]}`}</p>
            <ProgressBar value={pokemonStats[3]} />
          </div>
          <div className="pokedex__stat">
            <p>{`Sp. Def: ${pokemonStats[4]}`}</p>
            <ProgressBar value={pokemonStats[4]} />
          </div>
          <div className="pokedex__stat">
            <p>{`Speed: ${pokemonStats[5]}`}</p>
            <ProgressBar value={pokemonStats[5]} />
          </div>
        </div>
      </div>
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
  );
};

export default Pokedex;
