import PropTypes from "prop-types";
import  PokemonCard  from "./PokemonCard";
import usePokemonContext  from "../hooks/usePokemonContext";

export const PokemonsList = ({ pokemonData }) => {

  const { showPokemonById } = usePokemonContext();

  return (
    <div className="pokemons-main">
      { pokemonData.map((pokemon) => (
        <PokemonCard onClick={showPokemonById} key={pokemon.id} pokemon={pokemon} />
      ))} 
    </div>
  );
};

PokemonsList.propTypes = {
    pokemonData: PropTypes.array.isRequired,
};
