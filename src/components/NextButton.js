import { useQuiz } from "../hooks/useQuiz";

function NextButton() {
  const { answer, dispatch, index, numQuestions } = useQuiz();

  const noAnswer = answer === null;

  if (index < numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
        disabled={noAnswer}
      >
        ➡︎
      </button>
    );

  if (index === numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}
        disabled={noAnswer}
      >
        🏁 Finish
      </button>
    );
}

export default NextButton;
