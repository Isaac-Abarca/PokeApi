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
            <article className="card" key={pokemon.id}>
              {/* <div className="card-circulo"></div> */}
              <header className="card-header">
                <p>#{pokemon.id}</p>
              </header>
              <figure className="img">
                <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                <h2>{pokemon.name}</h2>
              </figure>

              <section className="card-body">
                <div className="type">
                  {pokemon.types.map((type) => (
                    <span key={type.name}>{type.type.name}</span>
                  ))}
                </div>
              </section>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
};
