import { Aside } from './components/Aside'
import { Pokemons } from './components/Pokemons'
import PokeModal from './components/PokeModal'
import './style.scss'
import usePokemonContext from './hooks/usePokemonContext'


function App() {
  const { showDetailPokemos, closePokemonDetail, pokemonDetail } = usePokemonContext();
  return (
    <section>
      <main className='main'>
        <Pokemons />
        <Aside onCloseModal={closePokemonDetail} showData={showDetailPokemos} pokemon={pokemonDetail}/>
        <PokeModal  onCloseModal={closePokemonDetail} showModal={showDetailPokemos} pokemon={pokemonDetail} />
      </main>
    </section>
  )
}

export default App
