import Options from "./Options";

function Question({ question, dispatch, answer, hasAnswered }) {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch} answer={answer} hasAnswered={hasAnswered} />
    </div>
  );
}

export default Question;
