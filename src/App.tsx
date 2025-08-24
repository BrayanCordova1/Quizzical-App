import { useState } from 'react'
import './App.css'
import Button from './components/Button'

function App() {
  const [game, setGame] = useState(false)
  const [questionsData, setQuestionsData] = useState()

  async function startGame() {
    const res = await fetch("https://opentdb.com/api.php?amount=10&type=multiple")
    const data = await res.json()
    setGame(true)
    setQuestionsData(data.results)
  }

  return (
    <main>
      <h1>Quizzical</h1>
      <p>Responde preguntas listas para ti. Elige el tipo, categoría y cantidad, y disfruta  poniendo a prueba tus conocimientos de forma rápida y divertida.</p>
      <form className='rounded'>
        <label className='base bold' htmlFor="difficulty">Dificultad:</label>
        <select className='base bold rounded' id="difficulty">
          <option value="random">Random</option>
          <option value="easy">Easy</option>
          <option value="normal">Normal</option>
          <option value="hard">Hard</option>
        </select>

        <label className='base bold' htmlFor="category">Categoría:</label>
        <select className='base bold rounded' id="category">
          <option value="any">Cualquiera</option>
          <option value="general">General</option>
          <option value="science">Ciencia</option>
          <option value="history">Historia</option>
        </select>

        <label className='base bold' htmlFor="amount">Cantidad de preguntas:</label>
        <input className='base bold' type="number" id="amount" min="1" max="50" defaultValue="10" />

        <Button type='primary' onClick={startGame}>
          Iniciar quiz
        </Button>
      </form>
    </main>
  )
}

export default App
