
/* eslint-disable no-unused-vars */
import { IconX } from "@tabler/icons-react";
import { colorByTypeBagckground } from "../constants/pokemon";



import PropTypes from 'prop-types';
import  PokemonContent  from "./PokemonContent";

function PokemonModal({ showModal, onCloseModal, pokemon }) {
  if (!pokemon) {
    return null;
  }

  const {types} = pokemon;
  
  return (
    <section style={{ backgroundColor: colorByTypeBagckground[types[0]] }} className={`modal ${showModal ? "active" : "disabled"} `}>
      <button onClick={onCloseModal} className="close-modal">
        <IconX stroke={4} />
      </button>
      <PokemonContent pokemon={pokemon} />
    </section>
  );
}

PokemonModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  pokemon: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    height: PropTypes.number,
    weight: PropTypes.number,
    stats: PropTypes.arrayOf(PropTypes.object),
    types: PropTypes.arrayOf(PropTypes.object),
    abilities: PropTypes.arrayOf(PropTypes.object),
    description: PropTypes.string,
    evolutions: PropTypes.arrayOf(PropTypes.object),
    image: PropTypes.string
  }),
};

export default PokemonModal;
