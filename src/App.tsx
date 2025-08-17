import { useState } from 'react'
import './App.css'
import StarMenu from './components/StartMenu'
import Questions from "./components/Questions"

function App() {
  const [game, setGame] = useState(false)
  const [questionsData, setQuestionsData] = useState()

  async function startGame() {
    const res = await fetch(import.meta.env.url)
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
