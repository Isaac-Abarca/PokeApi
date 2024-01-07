import { createContext, useState } from "react";
import { formatStats, formatTypes, formatAbilities, getPokemonDescription, getEvolutions, getImages } from "../helpers/pokemom";
import PropTypes from "prop-types";
import axios from "axios";

const PokemonContext = createContext();

const PokemonProvider = ({ children }) => {
    const [showDetailPokemos, setShowDetailPokemos] = useState(false);
    const [pokemonDetail, setPokemonDetail] = useState(null);


    const showPokemon = async (pokemonInfo) => {
        const { data: dataSpecies } = await axios.get(pokemonInfo.species.url);
        const { data: dataEvolution } = await axios.get(dataSpecies.evolution_chain.url);
        
        
        const { id, name, height, weight, stats, types, abilities, sprites } = pokemonInfo;
        const evolutions = await getEvolutions(dataEvolution);
        
        setPokemonDetail({
            id,
            name,
            height,
            weight,
            stats: formatStats(stats),
            types: formatTypes(types),
            abilitis: formatAbilities(abilities),
            description: getPokemonDescription(dataSpecies),
            evolutions,
            image: getImages(sprites),
        });
        setShowDetailPokemos(true);
        
    };

    const closePokemonDetail = () => {
        setShowDetailPokemos(false);
    };

    return <PokemonContext.Provider
        value={{
            showDetailPokemos,
            showPokemon,
            closePokemonDetail,
            pokemonDetail,
        }}
    >
        {children}
    </PokemonContext.Provider>;
};

PokemonProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { PokemonProvider, PokemonContext };
