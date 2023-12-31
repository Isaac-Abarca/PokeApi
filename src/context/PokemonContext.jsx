import { createContext, useState } from "react";
import PropTypes from "prop-types";

const PokemonContext = createContext();

const PokemonProvider = ({ children }) => {
    const [showDetailPokemos, setShowDetailPokemos] = useState(false);

    const showPokemonById = () => {
        setShowDetailPokemos(true);
    };

    const closePokemonDetail = () => {
        setShowDetailPokemos(false);
    };

    return <PokemonContext.Provider
        value={{
            showDetailPokemos,
            showPokemonById,
            closePokemonDetail
        }}
    >
        {children}
    </PokemonContext.Provider>;
};

PokemonProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { PokemonProvider, PokemonContext };
