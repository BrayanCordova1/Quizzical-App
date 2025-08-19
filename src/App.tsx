import { useState } from 'react'
import './App.css'
import StarMenu from './components/StartMenu'
import Questions from "./components/Questions"

function App() {
  const [game, setGame] = useState(false)
  const [questionsData, setQuestionsData] = useState()
  const url = import.meta.env.url

  async function startGame() {
    const res = await fetch("https://opentdb.com/api.php?amount=10&type=multiple")
    const data = await res.json()
    setGame(true)
    setQuestionsData(data.results)
  }

  return (
    <main>
      {!game && <StarMenu onClick={startGame} />}
      {game && <Questions data={questionsData} />}
    </main>
  )
}

export default App
