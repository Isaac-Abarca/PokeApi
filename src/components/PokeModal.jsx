import { IconX } from "@tabler/icons-react";
//import { colorByType } from "../constants/pokemon";

import PropTypes from 'prop-types';

function PokemonModal({showModal, onCloseModal, pokemon}) {

  return (
    <section className={`modal ${showModal ? "active" : "disabled"} `}>
      <button onClick={onCloseModal} className="close-modal">
        <IconX stroke={4} />
      </button>
      <article className={`modal-content ${showModal ? "visible" : "invisible"}`}>
        <header>
          <img src={pokemon.image} alt={pokemon.name} />
          <span>#{pokemon.id}</span>
          <h2>{pokemon.name}</h2>
          
        </header>

      </article>
    </section>
  );
}

PokemonModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  pokemon: PropTypes.object.isRequired,
};

export default PokemonModal;
