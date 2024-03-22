import DifficultySelect from "./DifficultySelect";
import { useQuiz } from "../hooks/useQuiz";

function StartScreen() {
  const { difficultySelected, numQuestions, dispatch, highScore } = useQuiz();

  return (
    <>
      <div className="start">
        <h2>Welcome to the React Quiz!</h2>
        {difficultySelected ? (
          <h3>{numQuestions} questions to test your React mastery</h3>
        ) : (
          <h3>Test your React mastery!</h3>
        )}
      </div>
      <footer className="footer">
        <DifficultySelect />

        <button
          disabled={!difficultySelected}
          style={!difficultySelected ? { color: "gray" } : null}
          className="btn btn-ui"
          onClick={() => dispatch({ type: "start" })}
        >
          Let's start
        </button>
      </footer>
      <p className="highscore highscore-start">
        Score to beat: <strong>{highScore}</strong>
      </p>
    </>
  );
}

export default StartScreen;
