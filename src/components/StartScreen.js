import { useState } from "react";
import DifficultySelect from "./DifficultySelect";

function StartScreen({ numQuestions, dispatch, difficulty, highScore }) {
  const [difficultySelected, setDifficultySelected] = useState(false);

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
        <DifficultySelect
          difficulty={difficulty}
          dispatch={dispatch}
          difficultySelected={difficultySelected}
          setDifficultySelected={setDifficultySelected}
        />
        {difficultySelected && (
          <button
            className="btn btn-ui"
            onClick={() => dispatch({ type: "start" })}
          >
            Let's start
          </button>
        )}
      </footer>
      <p className="highscore highscore-start">Score to beat: {highScore}</p>
    </>
  );
}

export default StartScreen;
