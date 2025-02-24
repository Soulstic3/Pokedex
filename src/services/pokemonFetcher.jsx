// src/services/pokemonFetcher.js

import { fetchPokemon } from "./pokemonService";

const MAX_POKEMON_ID = 1025;

export const fetchAllPokemons = async () => {
  const promises = [];

  for (let id = 1; id <= MAX_POKEMON_ID; id++) {
    promises.push(fetchPokemon(id));
  }

  try {
    const results = await Promise.all(promises);
    return results.filter((pokemon) => pokemon !== null); // Filtra os resultados nulos
  } catch (error) {
    console.error("Erro ao buscar todos os Pokémons:", error);
    return [];
  }
};
