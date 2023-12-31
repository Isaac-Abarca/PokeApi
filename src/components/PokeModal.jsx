import { IconX } from "@tabler/icons-react";

import PropTypes from 'prop-types';

function PokemonModal({showModal, onCloseModal}) {

  return (
    <section className={`modal ${showModal ? "active" : "disabled"} `}>
      <button onClick={onCloseModal} className="close-modal">
        <IconX stroke={4} />
      </button>
      <article className={`modal-content ${showModal ? "visible" : "invisible"}`}>
        <h1>Hola</h1>
      </article>
    </section>
  );
}

PokemonModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};

export default PokemonModal;
