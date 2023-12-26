import PropTypes from "prop-types";
import { useState} from "react";
import PokemonModal from "./PokeModal";
import { colorByType } from "../constants/pokemon";

export default function PokemonCard({ pokemon }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dynamicClass = pokemon.types[0].type.name;



  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <article className={`card ${dynamicClass}`} onClick={openModal} >
        <header className="card-header">
          <p>#{pokemon.id}</p>
        </header>
        <figure className="img">
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <h2>{pokemon.name}</h2>
        </figure>
        <section className="card-body">
          <div className="type">
            {pokemon.types.map((type) => (
              <span
                style={{ backgroundColor: colorByType[type.type.name] }}
                key={type.type.name}
              >
                {type.type.name}
              </span>
            ))}
          </div>
        </section>
      </article>
      {isModalOpen && (
        <PokemonModal pokemonId={pokemon.id} closeModal={closeModal} />
      )}
    </>
  );
}

PokemonCard.propTypes = {
  pokemon: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    sprites: PropTypes.shape({
      front_default: PropTypes.string.isRequired,
    }).isRequired,
    types: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.shape({
          name: PropTypes.string.isRequired,
        }).isRequired,
      })
    ).isRequired,
  }).isRequired,
};
