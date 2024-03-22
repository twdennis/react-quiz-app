import { useQuiz } from "../hooks/useQuiz";

function PreviousButton() {
  const { dispatch, index } = useQuiz();
  const firstQuestion = index === 0;
  return (
    <button
      className="btn btn-prev"
      onClick={() => dispatch({ type: "prevQuestion" })}
      disabled={firstQuestion}
    >
      ⬅︎
    </button>
  );
}

export default PreviousButton;
