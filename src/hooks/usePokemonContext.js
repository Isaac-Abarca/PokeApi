import { useContext } from "react";
import { PokemonContext } from "../context/PokemonContext";

const usePokemonContext = () => {
    const context = useContext(PokemonContext);
    if (context === undefined) {
        throw new Error(
        "usePokemonContext must be used within a PokemonContextProvider"
        );
    }
    return context;
}

export default usePokemonContext;