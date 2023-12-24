import { useEffect, useState } from "react";

export const Pokemons = () => {
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      fetch("https://pokeapi.co/api/v2/pokemon")
        .then((response) => response.json())
        .then((data) => {
          const pokemonUrls = data.results.map((pokemon) => pokemon.url);
          Promise.all(
            pokemonUrls.map((url) =>
              fetch(url).then((response) => response.json())
            )
          )
            .then((pokemonDetails) => {
              setPokemonData(pokemonDetails);
            })
            .catch((error) => {
              console.error("Error fetching Pokemon details:", error);
            });
        })
        .catch((error) => {
          console.error("Error fetching Pokemon list:", error);
        });
    };

    fetchData();
  }, []);

  return (
    <div>
      <header className="header">
        <h1>Pokemons</h1>
      </header>
      <main className="main">
        <div className="pokemons">
          {pokemonData.map((pokemon) => (
            <div className="card" key={pokemon.id}>
              <h2>{pokemon.name}</h2>
              <p>Number: {pokemon.id}</p>
              <div className="img">
                <img src={pokemon.sprites.front_default} alt={pokemon.name} />
              </div>
              <p>
                Type: {pokemon.types.map((type) => type.type.name).join(", ")}
              </p>
              <p>Height: {pokemon.height / 10} m</p>
              <p>Weight: {pokemon.weight / 10} kg</p>
              <p>
                Abilities:{" "}
                {pokemon.abilities
                  .map((ability) => ability.ability.name)
                  .join(", ")}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};
