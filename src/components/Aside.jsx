
import PropTypes from 'prop-types';
import  DefaultAside  from './DefaultAside';
import PokemonContent from './PokemonContent';

export const Aside = ({showData, pokemon }) => {
  return (
    <>
      {!showData ? (
        <DefaultAside />
      ) : (
        <PokemonContent pokemon={pokemon} />
      )}
    </>
    
  );
};

Aside.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
  showData: PropTypes.bool.isRequired,
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
