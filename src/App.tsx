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
      <p>¿Estás listo para responder algunas preguntas?</p>
      <Button type='primary'>
        Iniciar quiz
      </Button>
    </main>
  )
}

export default App
