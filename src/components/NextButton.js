function NextButton({ answer, dispatch, index, numQuestions }) {
  const noAnswer = answer === null;

  if (index < numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
        disabled={noAnswer}
      >
        Next
      </button>
    );

  if (index === numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}
        disabled={noAnswer}
      >
        Finish
      </button>
    );
}

export default NextButton;
