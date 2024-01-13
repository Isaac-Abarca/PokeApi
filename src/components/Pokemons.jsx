import { useEffect, useRef, useState } from "react";

import { IconSearch } from "@tabler/icons-react";
//import { Loader } from "./Loader";
import { PokemonsList } from "./PokemonsList";
import { useIntersectionObserver } from "../hooks/useintersectionObserver";

const INITIAL_LIMIT = 10;
const ICREASE_LIMIT = 10;

export const Pokemons = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [termToSearch, setTermToSearch] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [limit, setLimit] = useState(INITIAL_LIMIT);

  const targetObserver = useRef(null);
  const entry = useIntersectionObserver(targetObserver, {});
  const isVisible = !!entry?.isIntersecting

  const pokemonByName = pokemonData.filter((pokemon) => {
    return pokemon.name.toLowerCase().includes(termToSearch.toLowerCase());
  });


  const handleChange = (e) => setTermToSearch(e.target.value);

  useEffect(() => {
    const fetchData = () => {
      fetch("https://pokeapi.co/api/v2/pokemon?limit=60")
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

  useEffect(() => {
    const maxPokemons = pokemonByName.length;
    if (isVisible && maxPokemons !== 0) {
      const newLimit = limit + ICREASE_LIMIT;
      newLimit > maxPokemons ? setLimit(maxPokemons) : setLimit(newLimit);
    }
  }, [isVisible]);

  useEffect(() => {
    setLimit(INITIAL_LIMIT);
  }, [termToSearch]);

  return (
    <div className="pokemons">
      <header className="header">
        <form>
          <div>
            <input
              name="pokemonName"
              type="text"
              autoComplete="off"
              placeholder="Search your Pokemon"
              onChange={handleChange}
            />
            <button type="button">
              <IconSearch />
            </button>
          </div>
        </form>
      </header>
      <div className="container">
        <PokemonsList pokemonData={pokemonByName.slice(0, limit)} />
      </div>
      <span ref={targetObserver}></span>
    </div>
  );
};
