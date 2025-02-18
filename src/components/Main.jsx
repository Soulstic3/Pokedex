import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchPokemon } from "../services/pokemonService";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const [pokemonSprite, setPokemonSprite] = useState();

  const gerarNumeroAleatorio = () => {
    // Gerar número aleatório para buscar um Pokémon aleatório
    const numeroAleatorio = Math.floor(Math.random() * (900 - 1 + 1)) + 1;
    console.log(numeroAleatorio);

    // Usar o serviço para buscar o Pokémon
    fetchPokemon(numeroAleatorio)
      .then((data) => {
        if (data) {
          setPokemonSprite(data.sprites.front_default); // Atualiza o estado com a sprite do Pokémon
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    //Chamar função ao carregar a pagina
    gerarNumeroAleatorio();

    const intervalId = setInterval(gerarNumeroAleatorio, 5000); // Define um intervalo de tempo para chamar a função

    // Limpa o intervalo quando o componente é desmontado
    return () => clearInterval(intervalId);
  }, []);

  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSearch = () => {
    console.log("Valor enviado: ", inputValue);
    navigate("/pokedex", { state: { pokemon: inputValue } });
  };

  return (
    <div className="main">
      <div className="main__text">
        <h2>Bem-vindo à Pokédex Digital!</h2>
        <p>
          Explore o incrível mundo dos Pokémon como nunca antes! Aqui, você
          encontrará informações detalhadas sobre todos os seus Pokémon
          favoritos. Quer saber o tipo, habilidades, evoluções ou curiosidades
          sobre um Pokémon específico? Basta pesquisar pelo nome ou número na
          Pokédex e descobrir tudo o que precisa!
        </p>
        <p>
          Nossa Pokédex foi criada para ser fácil de usar e repleta de dados
          precisos, acompanhados de imagens vibrantes que trazem cada Pokémon à
          vida. Seja você um treinador experiente ou um fã novato, este é o
          lugar perfeito para mergulhar no universo Pokémon e aprender mais
          sobre essas criaturas fascinantes.
        </p>
        <p>
          Comece sua jornada agora mesmo! Pesquise um Pokémon abaixo e descubra
          o que o aguarda. Gotta catch 'em all!
        </p>
        <p>
          <input
            type="text"
            placeholder="Digite o nome ou id do pokemon"
            className="main__pesquisar"
            value={inputValue}
            onChange={handleInputChange}
          />

          <input
            type="button"
            className="main__button"
            value="Pesquisar"
            onClick={handleSearch}
          />
        </p>
      </div>
      <img
        className="main__image"
        alt="Pokemon Sprite"
        id="pokemonSprite"
        src={pokemonSprite} // Usa o estado para exibir a sprite
      />
    </div>
  );
};

export default Main;
