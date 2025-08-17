export default function StarMenu({ onClick }) {
  return (
    <div className="quizStart">
      <h1>Quizzical</h1>
      <p>¿Estás listo para responder algunas preguntas?</p>
      <button onClick={onClick}>Iniciar quiz</button>
    </div>
  )
}