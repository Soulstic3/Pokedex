import React from "react";
import logoPokedex from "../assets/logo/game.png";

const Main = () => {
  {
    function gerarNumeroAleatorio() {
      var numeroAleatorio = Math.floor(Math.random() * (1000 - 1 + 1)) + 1;
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

    setInterval(gerarNumeroAleatorio, 5000);
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
      </div>
      <img
        className="main__image"
        src=""
        alt="Pokemon Sprite"
        id="pokemonSprite"
      />
    </div>
  );
};

export default Main;
