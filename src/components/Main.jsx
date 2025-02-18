import React, { useEffect } from "react";

const Main = () => {
  {
    gerarNumeroAleatorio();

    function gerarNumeroAleatorio() {
      // Gerar numero aleatorio para buscar um pokemon aleatorio

      var numeroAleatorio = Math.floor(Math.random() * (900 - 1 + 1)) + 1;
      console.log(numeroAleatorio);

      fetch(`https://pokeapi.co/api/v2/pokemon/${numeroAleatorio.toString()}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Could not fetch resource");
          }
          return response.json();
        })
        .then((data) => {
          const pokemonSprite = data.sprites.front_default;
          const imgElement = document.getElementById("pokemonSprite");

          imgElement.src = pokemonSprite;
        })
        .catch((error) => console.error(error));
    }

    useEffect(() => {
      const intervalId = setInterval(gerarNumeroAleatorio, 5000); // Define um intervalo de tempo para chamar a função gerar numero

      // Limpa o intervalo quando o componente é desmontado
      return () => clearInterval(intervalId);
    }, []);
  }

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
          />
          <input type="button" className="main__button" value="Pesquisar" />
        </p>
      </div>
      <img
        className="main__image"
        alt="Pokemon Sprite"
        id="pokemonSprite"
        src="https://pokeapi.co/api/v2/pokemon/1"
      />
    </div>
  );
};

export default Main;
