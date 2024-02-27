function StartScreen({ numQuestions, dispatch, difficulty }) {
  function handleDifficulty(e) {
    const difficulty = e.target.value;

    switch (difficulty) {
      case "easy":
        dispatch({ type: "easy" });
        break;
      case "normal":
        dispatch({ type: "normal" });
        break;
      case "difficult":
        dispatch({ type: "difficult" });
        break;
      default:
        throw new Error("Action unknown");
    }
  }

  return (
    <>
      <div className="start">
        <h2>Welcome to the React Quiz!</h2>
        <h3>{numQuestions} questions to test your React mastery</h3>
      </div>
      <footer className="footer">
        <select
          className={`select-difficulty ${
            difficulty === "easy"
              ? "easy"
              : difficulty === "normal"
              ? "normal"
              : "difficult"
          }`}
          onChange={handleDifficulty}
        >
          <option value={"easy"}>Easy</option>
          <option value={"normal"}>Normal</option>
          <option value={"difficult"}>Difficult</option>
        </select>
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
