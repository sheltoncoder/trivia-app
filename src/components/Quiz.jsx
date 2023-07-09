import { useContext, useEffect } from "react";
import Question from "./Question";
import { QuizContext } from "./Contexts/quiz";

const Quiz = () => {
  const [quizState, dispatch] = useContext(QuizContext);
  const apiUrl =
    "https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple&encode=url3986";

  useEffect(() => {
    if (quizState.questions.length > 0) {
      return;
    }
    console.log("on initialize");
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
        dispatch({ type: "LOADED_QUESTIONS", payload: data.results });
      });
  });
  //   console.log("quizState", quizState);

  //   const [question, setQuestion] = useState([]);
  //   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  //   console.log("currentQuestionIndex", currentQuestionIndex);
  return (
    <div className="quiz">
      {quizState.showResults && (
        <div className="results">
          <div className="congratulations">Congratulations</div>
          <div className="results-info">
            <div> You have completed the quiz</div>
            <div>
              You have {quizState.correctAnswerCount} of{""}
              {quizState.questions.length}
            </div>
          </div>
          <div
            className="next-button"
            onClick={() => dispatch({ type: "RESTART" })}>
            Restart
          </div>
        </div>
      )}
      {!quizState.showResults && quizState.questions.length > 0 && (
        <div>
          <div className="score">
            Question {quizState.currentQuestionIndex + 1}/
            {quizState.questions.length}
          </div>
          <Question />
          <div
            className="next-button"
            onClick={() => dispatch({ type: "NEXT_QUESTION" })}>
            Next Question
          </div>
        </div>
      )}
    </div>
  );
};
export default Quiz;
