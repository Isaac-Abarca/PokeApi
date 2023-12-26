import { useEffect, useState } from "react";
import PokemonCard from "./PokemonCard";
import { IconSearch } from "@tabler/icons-react";
import { Loader } from "./Loader";

export const Pokemons = () => {
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      fetch("https://pokeapi.co/api/v2/pokemon?limit=50")
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
    <div className="pokemons">
      <header className="header">
        <form>
          <div>
            <input type="text" placeholder="Search your Pokemon" />
            <button type="submit">
              <IconSearch />
            </button>
          </div>
        </form>
      </header>
      <main className="pokemons-main">
        {pokemonData.length > 0 ? (
          pokemonData.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))
        ) : (
          <div className="no-results">
            <Loader />
          </div>
        )}
      </main>
    </div>
  );
};
