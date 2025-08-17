export default function Questions({ data }) {
  let elementsData = data.map(function (question) {
    return (
      <div className="question">
        <div>
          <h2>{question.question}</h2>
          <div>
            <p>Dificultad: {question.difficulty} Categoria: {question.category}</p>
          </div>
        </div>
        <div>
        </div>
      </div>
    )
  })

  console.log(data)
  return (
    elementsData
  )
}