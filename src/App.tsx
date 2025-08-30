import { useMemo, useState } from 'react'
import './App.css'
import Button from './components/Button'
import Tag from './components/Tag'
import Answer from './components/Aswer'

function App() {
  type Question = {
    type: string
    difficulty: 'easy' | 'medium' | 'hard'
    category: string
    question: string
    correct_answer: string
    incorrect_answers: string[]
  }

  type QuestionsData = {
    response_code: number
    results: Question[]
  }

  const [game, setGame] = useState(true)
  const [question, setQuestion] = useState(1)
  const [questionData, setQuestionData] = useState<QuestionsData | null>({ "response_code": 0, "results": [{ "type": "multiple", "difficulty": "easy", "category": "Entertainment: Television", "question": "Who played the Waitress in the Spam sketch of &quot;Monty Python&#039;s Flying Circus&quot;?", "correct_answer": "Terry Jones", "incorrect_answers": ["Eric Idle", "Graham Chapman", "John Cleese"] }, { "type": "multiple", "difficulty": "easy", "category": "Entertainment: Video Games", "question": "Which character was introduced to the Super Smash Bros franchise in Super Smash Bros Melee?", "correct_answer": "Sheik", "incorrect_answers": ["Samus", "Lucas", "Mega Man"] }, { "type": "multiple", "difficulty": "easy", "category": "Entertainment: Video Games", "question": "Who is the leader of the Brotherhood of Nod in the Command and Conquer series?", "correct_answer": "Kane", "incorrect_answers": ["Joseph Stalin", "CABAL", "Yuri"] }, { "type": "multiple", "difficulty": "hard", "category": "History", "question": "In the year 1900, what were the most popular first names given to boy and girl babies born in the United States?", "correct_answer": "John and Mary", "incorrect_answers": ["Joseph and Catherine", "William and Elizabeth", "George and Anne"] }, { "type": "multiple", "difficulty": "hard", "category": "Entertainment: Comics", "question": "What are the Three Virtues of Bionicle?", "correct_answer": "Unity, Duty, Destiny", "incorrect_answers": ["Build, Play, Change", "Work, Play, Live", "Forge, Build, Fight"] }, { "type": "multiple", "difficulty": "hard", "category": "Entertainment: Video Games", "question": "In the alternate timeline in Mortal Kombat, which character was the one to slaughter the Shirai Ryu clan?", "correct_answer": "Quan Chi", "incorrect_answers": ["Sub-Zero", "Sektor", "Shang Tsung"] }, { "type": "multiple", "difficulty": "easy", "category": "Entertainment: Video Games", "question": "Who is the main antagonist in the Portal franchise?", "correct_answer": "GLaDOS", "incorrect_answers": ["Chell", "Wheatley", "Rick"] }, { "type": "multiple", "difficulty": "hard", "category": "Geography", "question": "What city is known as the Rose Capital of the World?", "correct_answer": "Tyler, Texas", "incorrect_answers": ["San Diego, California", "Miami, Florida", "Anaheim, California"] }, { "type": "multiple", "difficulty": "easy", "category": "Sports", "question": "This Canadian television sportscaster is known for his &quot;Hockey Night in Canada&quot; role, a commentary show during hockey games.", "correct_answer": "Don Cherry", "incorrect_answers": ["Don McKellar", "Don Taylor ", "Donald Sutherland"] }, { "type": "multiple", "difficulty": "hard", "category": "Sports", "question": "Which of these Russian cities did NOT contain a stadium that was used in the 2018 FIFA World Cup?", "correct_answer": "Vladivostok", "incorrect_answers": ["Rostov-on-Don", "Yekaterinburg", "Kaliningrad"] }] })
  const [answers, setAnswers] = useState<string[]>([])

  async function startGame(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    setGame(true)
  }

  function nextQuestion() {
    setQuestion(question + 1)
  }

  function prevQuestion() {
    setQuestion(question - 1)
  }

  function reset() {
    setQuestion(0)
    setGame(false)
    setQuestionData(null)
  }

  function addAnswer(answer: string) {
    setAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers]
      newAnswers[question - 1] = answer
      return newAnswers
    })
  }

  function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  const shuffledAnswers = useMemo(() => {
    const currentQuestionData = questionData?.results[question - 1];
    if (!currentQuestionData) {
      return [];
    }
    const allAnswers = [
      currentQuestionData.correct_answer,
      ...currentQuestionData.incorrect_answers
    ];
    return shuffleArray(allAnswers);
  }, [question, questionData]);

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
              <p className='xs'>Pregunta {question} de {questionData?.results.length}</p>
            </div>
            <span id='rectangule' className='rounded'>
            </span>
            <div className='question-container'>
              <div>
                <Tag difficulty={questionData?.results[question - 1].difficulty}>
                  {questionData?.results[question - 1].difficulty
                    ? questionData.results[question - 1].difficulty.at(0)?.toUpperCase() +
                    questionData.results[question - 1].difficulty.slice(1)
                    : ''}
                </Tag>
                <Tag>
                  {questionData?.results[question - 1].category}
                </Tag>
              </div>
              <h1 dangerouslySetInnerHTML={{ __html: questionData?.results[question - 1].question ?? '' }}></h1>
            </div>
            <div className='question-answers'>
              {shuffledAnswers.map(function (answer, index) {
                const isSelected = answers[question - 1] === answer;
                return (
                  <Answer isActive={isSelected} onClick={() => addAnswer(answer)} key={index} index={index} answer={answer} />
                )
              })}
            </div>
            <div className='question-buttons'>
              <Button onClick={prevQuestion} type='secondary' state={question > 1 ? "default" : "disabled"}>
                Anterior
              </Button>
              <div>
                <Button onClick={question === questionData?.results.length ? reset : nextQuestion} type='primary' state={answers[question - 1] !== undefined ? "default" : "disabled"}>
                  {question === questionData?.results.length ? "Finalizar" : "Siguiente"}
                </Button>
                <Button onClick={reset} type='danger'>
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
