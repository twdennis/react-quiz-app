import DifficultySelect from "./DifficultySelect";

function StartScreen({ numQuestions, dispatch, difficulty }) {


  return (
    <>
      <div className="start">
        <h2>Welcome to the React Quiz!</h2>
        <h3>{numQuestions} questions to test your React mastery</h3>
      </div>
      <footer className="footer">
        <DifficultySelect difficulty={difficulty} dispatch={dispatch}/>
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "start" })}
        >
          Let's start
        </button>
      </footer>
    </>
  );
}

export default StartScreen;
