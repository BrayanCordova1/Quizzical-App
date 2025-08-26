import { useState } from 'react'
import './App.css'
import Button from './components/Button'
import Tag from './components/Tag'
import Answer from './components/Aswer'

function App() {
  type Question = {
    type: string
    difficulty: string
    category: string
    question: string
    correct_answer: string
    incorrect_answers: string[]
  }

  type QuestionsData = {
    results: Question[]
  }

  const [game, setGame] = useState(false)
  const [questionsData, setQuestionsData] = useState<QuestionsData | undefined>()

  async function startGame(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    const data = { "results": [{ "type": "multiple", "difficulty": "easy", "category": "Entertainment: Video Games", "question": "What is the name of Team Fortress 2&#039;s Heavy Weapons Guy&#039;s minigun?", "correct_answer": "Sasha", "incorrect_answers": ["Betty", "Anna", "Diana"] }, { "type": "multiple", "difficulty": "hard", "category": "Geography", "question": "What is the name of the formerly rich fishing grounds off the island of Newfoundland, Canada?", "correct_answer": "Grand Banks", "incorrect_answers": ["Great Barrier Reef", "Mariana Trench", "Hudson Bay"] }, { "type": "multiple", "difficulty": "medium", "category": "Entertainment: Books", "question": "In the &quot;The Hobbit&quot;, who kills Smaug?", "correct_answer": "Bard", "incorrect_answers": ["Bilbo Baggins", "Gandalf the Grey", "Frodo"] }, { "type": "multiple", "difficulty": "medium", "category": "Entertainment: Music", "question": "According to a Beatles song, who kept her face in a jar by the door?", "correct_answer": "Eleanor Rigby", "incorrect_answers": ["Loretta Martin", "Molly Jones", "Lady Madonna"] }, { "type": "multiple", "difficulty": "easy", "category": "Entertainment: Music", "question": "Who is the lead singer of the band Coldplay?", "correct_answer": "Chris Martin", "incorrect_answers": ["Chris Isaak", "Chris Wallace", "Chris Connelly"] }, { "type": "multiple", "difficulty": "medium", "category": "Entertainment: Video Games", "question": "What was the main currency in Club Penguin?", "correct_answer": "Coins", "incorrect_answers": ["Stamps", "Tickets", "Gems"] }, { "type": "multiple", "difficulty": "hard", "category": "Geography", "question": "What is the second-largest city in Lithuania?", "correct_answer": "Kaunas", "incorrect_answers": ["Panev\u0117\u017eys", "Vilnius", "Klaip\u0117da"] }, { "type": "multiple", "difficulty": "medium", "category": "Geography", "question": "Where are the Nazca Lines located?", "correct_answer": "Peru", "incorrect_answers": ["Brazil", "Colombia", "Ecuador"] }, { "type": "multiple", "difficulty": "medium", "category": "Entertainment: Japanese Anime &amp; Manga", "question": "In the ADV (English) Dub of the anime &quot;Ghost Stories&quot;, which character is portrayed as a Pentacostal Christian?", "correct_answer": "Momoko Koigakubo", "incorrect_answers": ["Hajime Aoyama", "Satsuki Miyanoshita", "Mio Itai"] }, { "type": "multiple", "difficulty": "hard", "category": "Entertainment: Video Games", "question": "In the &quot;Devil May Cry&quot; franchise, which game is chronologically first?", "correct_answer": "Devil May Cry 3: Dante&#039;s Awakening ", "incorrect_answers": ["Devil May Cry 4", "Devil May Cry", "Devil May Cry 2"] }] }
    setGame(true)
    setQuestionsData(data)

  }

  return (
    <main className={game ? 'up' : ''}>
      {
        !game && (
          <>
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

              <Button type='primary' htmlType='submit' onClick={startGame}>
                Iniciar quiz
              </Button>
            </form>
          </>
        )
      }

      {
        game && (
          <>

            <div className='question-header'>
              <p className='lg bold'>Quizzical</p>
              <p className='xs'>Pregunta 1 de 3</p>
            </div>
            <div id='rectangule' className='rounded'>
            </div>
            <div className='question-container'>
              <div>
                <Tag difficulty='normal'>
                  Normal
                </Tag>
                <Tag>
                  Historia
                </Tag>
              </div>
              <h1>Which painting was not made by Vincent Van Gogh?</h1>
            </div>
            <div className='question-answers'>
              <Answer index={0} answer="The Starry Night" />
              <Answer index={1} answer="The Sunflowers" />
              <Answer index={2} answer="The Bedroom" />
              <Answer index={3} answer="The Persistence of Memory" />
            </div>
            <div className='question-buttons'>
              <Button type='secondary'>
                Anterior
              </Button>
              <div>
                <Button type='primary'>
                  Siguiente
                </Button>
                <Button type='danger'>
                  Reiniciar
                </Button>
              </div>
            </div>
          </>
        )
      }
    </main>
  )
}

export default App
