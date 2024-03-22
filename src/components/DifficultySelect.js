import { useQuiz } from "../hooks/useQuiz";

function DifficultySelect() {
  const { dispatch, difficulty, difficultySelected } = useQuiz();

  function handleDifficulty(e) {
    const difficulty = e.target.value;
    dispatch({ type: "difficultySelected", payload: true });

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
      id="select-difficulty"
      className={`select-difficulty ${
        difficulty === "easy" && difficultySelected
          ? "easy"
          : difficulty === "normal" && difficultySelected
          ? "normal"
          : difficulty === "difficult" && difficultySelected
          ? "difficult"
          : ""
      }`}
      onChange={handleDifficulty}
    >
      <option value={""} disabled={difficultySelected}>
        Select difficulty
      </option>
      <option value={"easy"}>Easy</option>
      <option value={"normal"}>Normal</option>
      <option value={"difficult"}>Difficult</option>
    </select>
  );
}

export default DifficultySelect;
