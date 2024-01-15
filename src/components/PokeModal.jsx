
/* eslint-disable no-unused-vars */
import { IconX } from "@tabler/icons-react";
import { colorByType, colorByStat, colorByTypeBagckground } from "../constants/pokemon";
import usePokemonContext from "../hooks/usePokemonContext";


import PropTypes from 'prop-types';

function PokemonModal({ showModal, onCloseModal, pokemon }) {
  const {showPokemon} = usePokemonContext();
  
  if (!pokemon) {
    return null;
  }

  const { id, name, height, weight, stats, types, abilities, description, evolutions, image } = pokemon;
  
  return (
    <section style={{ backgroundColor: colorByTypeBagckground[types[0]] }} className={`modal ${showModal ? "active" : "disabled"} `}>
      <button onClick={onCloseModal} className="close-modal">
        <IconX stroke={4} />
      </button>
      <article className={`modal-content ${showModal ? "visible" : "invisible"} `}>
        <div className="modal-container">
          <header className="modal-header">
            <div className="img-modal">
              <img src={image} alt={name} />
            </div>

            <span>#{id}</span>
            <h2>{name}</h2>
          </header>
          <section className="modal-body">
            <div className="type">
              {types.map((type) => (
                <span
                  style={{ backgroundColor: colorByType[type] }}
                  key={type}
                >
                  {type}
                </span>
              ))}
            </div>
            <div className="text">
              <h4>Pokedex entry</h4>
              <span>{description}</span>
            </div>
            <div className="details">
              <div className="detail">
                <h3>Height:</h3>
                <p>{height}m</p>
              </div>
              <div className="detail">
                <h3>Weight:</h3>
                <p>{weight * 0.10}kg</p>
              </div>
            </div>
            <div className="abilities">
              <h3>Abilities:</h3>
              <div className="abilities-list">
                {abilities.map((ability, index) => (
                  <span className="abilities" key={index}>{ability}</span>
                ))}
              </div>
            </div>
            <div className="stats">
              <h3>Stats:</h3>
              <div className="stats-list">
                {stats.map((stat, index) => (
                  <div className="stats-container" key={index}>
                    <span style={{ backgroundColor: colorByStat[stat.name] }} className="stats-name">{`${stat.name}`}</span>
                    <span className="stats-value">{`${stat.base_stat}`}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="evolutions">
              <h3>Evolutions:</h3>
              <section className="evolutions-list">
                {evolutions.map((evolution, index) => (
                  <article className="evolutions-container" key={index}>
                    {index !== 0 &&
                      <span>Lv {evolution.min_level}</span>
                    }
                    <button onClick={() => showPokemon(evolution.pokemonInfo)}>
                      <img src={evolution.image} alt={evolution.name} />
                    </button>
                  </article>
                ))}
              </section>
            </div>
          </section>

        </div>

      </article>
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
