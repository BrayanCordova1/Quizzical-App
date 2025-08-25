type AnswerProps = {
  index: number;
  answer: string;
};

export default function Answer({ index, answer }: AnswerProps) {
  return (
    <button className="answer rounded sm">
      <p><span>{index + 1}.</span> {answer}</p>
    </button>
  )
}