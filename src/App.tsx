import { useMemo, useState, type SetStateAction } from 'react'
import './App.css'
import Button from './components/Button'
import Tag from './components/Tag'
import Answer from './components/Aswer'
import Github from '../src/assets/Github.svg'

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

  const [game, setGame] = useState(false)
  const [finish, setFinish] = useState(false)
  const [correctAnswer, setCorrectAnswer] = useState(0)
  const [incorrectAnswer, setIncorrectAnswer] = useState(0)
  const [score, setScore] = useState(0)
  const [question, setQuestion] = useState(1)
  const [questionData, setQuestionData] = useState<QuestionsData | null>()
  const [answers, setAnswers] = useState<string[]>([])
  const [dificultad, setDificultad] = useState('random');

  async function startGame(formData: any) {
    const data = await (await fetch(`https://opentdb.com/api.php?amount=${formData.get("amount")}${formData.get("category") === "any" ? "" : "&category=" + formData.get("category")}${formData.get("difficulty") === "random" ? "" : "&difficulty=" + formData.get("difficulty")}`)).json()
    setQuestionData(data)
    setGame(true)
    console.log(formData.get("amount"))
    console.log(formData.get("category"))
    console.log(formData.get("difficulty"))
    console.log(`https://opentdb.com/api.php?amount=${formData.get("amount")}${formData.get("category") === "any" ? "" : "&category=" + formData.get("category")}${formData.get("difficulty") === "random" ? "" : "&difficulty=" + formData.get("difficulty")}`)
    console.log(data)
  }

  function nextQuestion() {
    setQuestion(question + 1)
  }

  function prevQuestion() {
    setQuestion(question - 1)
  }

  function finishGame() {
    checkAnswers()
    setFinish(true)
  }

  function reset() {
    setGame(false)
    setFinish(false)
    setQuestion(0)
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

  function checkAnswers() {
    if (answers.length === 0) {
      return;
    }

    questionData?.results.map(function (question, index) {
      const isCorrect = answers[index] === question.correct_answer;
      if (isCorrect) {
        setCorrectAnswer((prev) => prev + 1);
        setScore((prev) => prev + 50)
      } else {
        setIncorrectAnswer((prev) => prev + 1);
      }
    })
  }

  const handleDificultadChange = (e: { target: { value: SetStateAction<string> } }) => {
    setDificultad(e.target.value);
  };

  return (
    <>
      {
        !game && !finish && (
          <main className={game && !finish ? 'up' : ''}>
            <h1>Quizzical</h1>
            <p>Answer questions prepared for you. Choose the type , category, and quantity, and enjoy testing your knowledge in a quick and fun way.</p>
            <form className='rounded' action={startGame}>
              <label className='base bold' htmlFor="difficulty">Difficulty:</label>
              <select className={`base bold rounded select-${dificultad}`} id="difficulty" name='difficulty' onChange={handleDificultadChange}>
                <option value="random">Random</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>

              <label className='base bold' htmlFor="category">Category:</label>
              <select className='base bold rounded' id="category" name='category'>
                <option value="any">Any</option>
                <option value="9">General Knowledge</option>
                <option value="10">Entertainment: Books</option>
                <option value="11">Entertainment: Films</option>
                <option value="12">Entertainment: Musics</option>
                <option value="13">Entertainment: Musicals and Theatres</option>
                <option value="14">Entertainment: Television</option>
                <option value="15">Entertainment: VideoGames</option>
                <option value="16">Entertainment: BoardGames</option>
                <option value="29">Entertainment: Comics</option>
                <option value="31">Entertainment: Anime & Manga</option>
                <option value="32">Entertainment: Cartoon & Animations</option>
                <option value="17">Science & Nature</option>
                <option value="18">Science: Computers</option>
                <option value="19">Science: Mathematics</option>
                <option value="30">Science: Gadgets</option>
                <option value="20">Mythology</option>
                <option value="21">Sports</option>
                <option value="22">Geography</option>
                <option value="23">History</option>
                <option value="24">Politics</option>
                <option value="25">Art</option>
                <option value="26">Celebrities</option>
                <option value="27">Animals</option>
                <option value="28">Vehicles</option>
              </select>

              <label className='base bold' htmlFor="amount">Number of questions:</label>
              <input className='base bold' type="number" id="amount" name='amount' min="1" max="50" defaultValue="10" />

              <Button type='primary' htmlType='submit'>
                Start quiz
              </Button>
            </form>
          </main>
        )
      }

      {
        game && !finish && (
          <main className={game && !finish ? 'up' : ''}>

            <div className='question-header'>
              <p className='lg bold'>Quizzical</p>
              <p className='xs'>Question {question} of {questionData?.results.length}</p>
            </div>
            <progress value={answers.length} max={questionData?.results.length} id='rectangule' className='rounded'>
            </progress>
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
                Previous
              </Button>
              <div>
                <Button onClick={question === questionData?.results.length ? finishGame : nextQuestion} type='primary' state={answers[question - 1] !== undefined ? "default" : "disabled"}>
                  {question === questionData?.results.length ? "Finish" : "Next"}
                </Button>
                <Button onClick={finishGame} type='danger'>
                  Reset
                </Button>
              </div>
            </div>
          </main>
        )
      }

      {
        game && finish && (
          <main className={game && !finish ? 'up' : ''}>
            <h1>Quizzical terminado</h1>
            <div className='stats'>
              <div>
                <h2>Score</h2>
                <span className='xl bold'>{score}</span>
              </div>
              <div>
                <h2>Total questions</h2>
                <span className='xl bold'>{questionData?.results.length}</span>
              </div>
              <div>
                <h2>Correct answers</h2>
                <span className='xl bold'>{correctAnswer}</span>
              </div>
              <div>
                <h2>Incorrect answers</h2>
                <span className='xl bold'>{incorrectAnswer}</span>
              </div>
            </div>
            <Button onClick={reset} type='primary'>
              Play again
            </Button>
          </main>
        )
      }
      <footer className='base bold'>
        <p>Creado por <a href='https://brayan-cordova.vercel.app/' target='_blank' rel='noopener noreferrer'>Brayan Cordova</a></p>
        <a href='https://github.com/BrayanCordova1/Quizzical-App' target='_blank' rel='noopener noreferrer'>
          <img src={Github} alt='GitHub' />
        </a>
      </footer>
    </>
  )
}

export default App
