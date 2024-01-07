import PropTypes from "prop-types";
import  PokemonCard  from "./PokemonCard";
import usePokemonContext  from "../hooks/usePokemonContext";

export const PokemonsList = ({ pokemonData }) => {

  const { showPokemon } = usePokemonContext();

  return (
    <div className="pokemons-main">
      { pokemonData.map((pokemon) => (
        <PokemonCard onClick={showPokemon} key={pokemon.id} pokemon={pokemon} />
      ))} 
    </div>
  );
};

PokemonsList.propTypes = {
    pokemonData: PropTypes.array.isRequired,
};
