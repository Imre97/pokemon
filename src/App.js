import { useState, useEffect } from 'react'
import './App.css';
import DragAndDrop from './dnd/DragAndDrop';

function App() {

  const [pokemons, setPokemons] = useState([])
  const [pokeApi, setPokeApi] = useState('https://pokeapi.co/api/v2/pokemon?limit=20')  




  const getPokemons = async () => {
    const res = await fetch(pokeApi)
    const data = await res.json()

    setPokeApi(data.next)



    function getPokeObj(results) {
      results.forEach(async (result) => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${result.name}`)
        const data = await res.json()
        let currentPokemon = { name: data.forms[0].name, thumbnail: data.sprites.other.dream_world.front_default }
        setPokemons(prev => [...prev, currentPokemon])
      })
      
    }
    getPokeObj(data.results)
    
  }

  useEffect(() => {
    getPokemons()
  }, [])


  return (
    <div className="App">
      
      <DragAndDrop data={pokemons} getPokemons={getPokemons} />

    </div>
  );
}

export default App;
