type AnswerProps = {
  onClick?: () => void;
  index: number;
  answer: string;
  isActive?: boolean;
};

export default function Answer({ index, answer, onClick, isActive = false }: AnswerProps) {
  return (
    <button className={`answer rounded sm ${isActive ? 'answeractive' : ''}`} onClick={onClick}>
      <p><span>{index + 1}.</span> {answer}</p>
    </button>
  )
}