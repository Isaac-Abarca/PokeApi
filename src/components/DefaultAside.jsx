import PokemonNoSeledted from '../assets/no-pokemon-selected-image.png'

export default function DefaultAside ()  {
    return (
        <div className="aside">
            <div className="pokemon-no-selected">
                <img src={PokemonNoSeledted} alt="" />
            </div>
            <div className="current-pokemon">
                <span>Select a Pokemon to display</span>
            </div>
        </div>
    )
}
