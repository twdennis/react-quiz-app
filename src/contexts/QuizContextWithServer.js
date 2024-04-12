import { createContext, useEffect, useReducer } from "react";

const QuizContext = createContext();

const initialState = {
  difficulty: "easy",
  questions: [],
  filteredQuestions: [],
  status: "loading",
  index: 0,
  answer: null,
  answers: [],
  points: 0,
  highScore: JSON.parse(localStorage.getItem("highscore")) ?? 0,
  totalSeconds: null,
  timeRemaining: {},
  difficultySelected: false,
};

function reducer(state, action) {
  const question = state.filteredQuestions.at(state.index);
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        filteredQuestions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "easy":
      return {
        ...state,
        filteredQuestions: state.questions.filter((q) => q.points === 10),
        difficulty: "easy",
      };
    case "normal":
      return {
        ...state,
        filteredQuestions: state.questions.filter((q) => q.points < 30),
        difficulty: "normal",
      };
    case "difficult":
      return {
        ...state,
        filteredQuestions: state.questions,
        difficulty: "difficult",
      };
    case "start":
      const initialTime = question.points * 1.5;
      return {
        ...state,
        status: "active",
        totalSeconds: state.timeRemaining[state.index] || initialTime,
        timeRemaining: {
          ...state.timeRemaining,
          [state.index]: state.timeRemaining[state.index] || initialTime,
        },
      };
    case "newAnswer":
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
        answers: [...state.answers, action.payload],
      };
    case "prevQuestion":
      const prevIndex = state.index - 1 >= 0 ? state.index - 1 : 0;

      const newTime =
        state.timeRemaining[prevIndex] ||
        state.filteredQuestions[prevIndex].points * 1.5;

      // const index = state.index - 1 >= 0 ? state.index - 1 : state.index;

      return {
        ...state,
        index: prevIndex,
        totalSeconds: newTime,
        timeRemaining: {
          ...state.timeRemaining,
          [state.index]: state.totalSeconds,
          [prevIndex]: newTime,
        },
        answer:
          state.answers.at(prevIndex) !== undefined
            ? state.answers.at(prevIndex)
            : null,
      };

    case "nextQuestion":
      const nextIndex =
        state.index + 1 < state.filteredQuestions.length
          ? state.index + 1
          : state.index;

      return {
        ...state,
        index: nextIndex,
        answer:
          state.answers.at(nextIndex) !== undefined
            ? state.answers.at(nextIndex)
            : null,
        totalSeconds: state.timeRemaining[nextIndex] || question.points * 1.5,
      };
    case "finish":
      const highscore =
        state.points > state.highScore ? state.points : state.highScore;

      localStorage.setItem("highscore", JSON.stringify(highscore));

      return {
        ...state,
        status: "finished",
        highScore: highscore,
      };
    case "restart":
      return {
        ...initialState,
        highScore: state.highScore,
        questions: state.questions,
        filteredQuestions: state.questions.filter((q) => q.points === 10),
        status: "ready",
        answers: [],
      };
    case "countDown":
      const updatedTotalSecs = Math.max(0, state.totalSeconds - 1);

      return {
        ...state,
        totalSeconds: updatedTotalSecs,
        timeRemaining: {
          ...state.timeRemaining,
          [state.index]: updatedTotalSecs,
        },
        status: state.totalSeconds === 0 ? "finished" : state.status,
        highScore:
          state.totalSeconds === 0
            ? Math.max(state.points, state.highScore)
            : state.highScore,
      };
    case "difficultySelected":
      return {
        ...state,
        difficultySelected: action.payload,
      };
    default:
      throw new Error("Action unknown");
  }
}

function QuizProvider({ children }) {
  const [
    {
      filteredQuestions,
      status,
      index,
      answer,
      points,
      highScore,
      totalSeconds,
      difficulty,
      difficultySelected,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = filteredQuestions.length;
  const maxPossiblePoints = filteredQuestions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );
  const hasAnswered = answer !== null;
  const question = filteredQuestions[index];

  useEffect(function () {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <QuizContext.Provider
      value={{
        difficulty,
        filteredQuestions,
        status,
        index,
        answer,
        question,
        points,
        highScore,
        totalSeconds,
        numQuestions,
        maxPossiblePoints,
        hasAnswered,
        difficultySelected,

        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export { QuizProvider, QuizContext };
