function DifficultySelect({ difficulty, dispatch }) {
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
  );
}

export default DifficultySelect;
