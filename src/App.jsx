import { Aside } from './components/Aside'
import { Pokemons } from './components/Pokemons'
import './style.scss'
function App() {

  return (
    <section>
      <main className='main'>
        <Pokemons />
        <Aside/>
      </main>
    </section>
  )
}

export default App
