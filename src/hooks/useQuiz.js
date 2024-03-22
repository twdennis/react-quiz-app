import { useContext } from "react";
import { QuizContext } from "../contexts/QuizContext";

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) throw new Error("Context error...");
  return context;
}

export { useQuiz };
