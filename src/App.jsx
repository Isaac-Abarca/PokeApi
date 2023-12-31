import { Aside } from './components/Aside'
import { Pokemons } from './components/Pokemons'
import PokeModal  from './components/PokeModal'
import './style.scss'
import usePokemonContext from './hooks/usePokemonContext'


function App() {
  const { showDetailPokemos, closePokemonDetail } = usePokemonContext();
  return (
    <section>
      <main className='main'>
        <Pokemons />
        <Aside/>
        <PokeModal onCloseModal={closePokemonDetail} showModal={showDetailPokemos}/>
      </main>
    </section>
  )
}

export default App
