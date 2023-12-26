import  { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function PokemonModal({ pokemonId, closeModal }) {
  const [pokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        const data = await response.json();
        setPokemonData(data);
      } catch (error) {
        console.error('Error fetching Pokemon data', error);
      }
    };

    fetchPokemonData();
  }, [pokemonId]);

  return (
    <div className="modal">
      {pokemonData && (
        <div className="modal-content">
          <span className="close" onClick={closeModal}>
            &times;
          </span>
          <article className="card">
            {/* ... (tu código existente) */}
            <section className="card-body">
              {/* Tipo y más información */}
              <div className="type">
                {pokemonData.types.map((type) => (
                  <span key={type.type.name}>{type.type.name}</span>
                ))}
              </div>
              <div className="stats">
                {/* Estadísticas */}
                {pokemonData.stats.map((stat) => (
                  <div key={stat.stat.name}>
                    <p>{stat.stat.name}:</p>
                    <p>{stat.base_stat}</p>
                  </div>
                ))}
              </div>
              <div className="abilities">
                {/* Habilidades */}
                <p>Abilities:</p>
                {pokemonData.abilities.map((ability) => (
                  <span key={ability.ability.name}>{ability.ability.name}</span>
                ))}
              </div>
              <div className="moves">
                {/* Movimientos */}
                <p>Moves:</p>
                {pokemonData.moves.map((move) => (
                  <span key={move.move.name}>{move.move.name}</span>
                ))}
              </div>
              <div className="height-weight">
                {/* Altura y peso */}
                <p>Height: {pokemonData.height / 10} m</p>
                <p>Weight: {pokemonData.weight / 10} kg</p>
              </div>
              {/* Puedes seguir agregando más secciones según tus necesidades */}
            </section>
          </article>
        </div>
      )}
    </div>
  );
}

PokemonModal.propTypes = {
    pokemonId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    closeModal: PropTypes.func.isRequired,
  };

export default PokemonModal;