import { createContext, useReducer } from "react";
// import questions from "/Users/sheltonschool/Desktop/trivia-app/src/data";
import { shuffleAnswers, normalizeQuestions } from "../../helpers";

const initialState = {
  currentQuestionIndex: 0,
  questions: [],
  showResults: false,

  answers: [],
  currentAnswer: "",
  correctAnswerCount: 0,
};

const reducer = (state, action) => {
  //   console.log("reducer", state, action);
  switch (action.type) {
    case "SELECT_ANSWER": {
      const correctAnswerCount =
        action.payload ===
        state.questions[state.currentQuestionIndex].correctAnswer
          ? state.correctAnswer + 1
          : state.correctAnswersCount;
      return {
        ...state,
        currentAnswer: action.payload,
        correctAnswerCount,
      };
    }
    case "NEXT_QUESTION": {
      const showResults =
        state.currentQuestionIndex === state.questions.length - 1;
      const currentQuestionIndex = showResults
        ? state.currentQuestionIndex
        : state.currentQuestionIndex + 1;
      const answers = showResults
        ? []
        : shuffleAnswers(state.questions[currentQuestionIndex]);
      return {
        ...state,
        currentQuestionIndex,
        showResults,
        answers,
        currentAnswer: "",
      };
    }
    case "RESTART": {
      return initialState;
    }
    case "LOADED_QUESTIONS": {
      const normalizedQuestions = normalizeQuestions(action.payload);
      return {
        ...state,
        questions: normalizedQuestions,
        answers: shuffleAnswers(normalizedQuestions[0]),
      };
    }
    default: {
      return state;
    }
  }
};

//   if (action.type === "NEXT_QUESTION") {
//     const showResults =
//       state.currentQuestionIndex === state.questions.length - 1;
//     const currentQuestionIndex = showResults
//       ? state.currentQuestionIndex
//       : state.currentQuestionIndex + 1;
//     const answers = showResults
//       ? []
//       : shuffleAnswers(state.questions[currentQuestionIndex]);
//     return {
//       ...state,
//       currentQuestionIndex,
//       showResults,
//       answers,
//     }
//   };

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const value = useReducer(reducer, initialState);
  console.log("state", value);
  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};
