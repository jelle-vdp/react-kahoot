import './App.scss';
import { useEffect, useState } from 'react';

import Question from './components/Question';
import NewGame from './components/NewGame';

function App() {
  const [questions, setQuestions] = useState([]);
  const [APIcalled, setAPIcalled] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [newGameComponent, setNewGameComponent] = useState(true);
  const [faultyFetch, setFaultyFetch] = useState(false);
  const [resetGame, setResetGame] = useState(false);
  const [totalAmountOfQuestions, setTotalAmountOfQuestions] = useState(10);

  const getQuestions = (amountOfQuestions, categoryOfQuestions, difficultyOfQuestions) => {
    let url = "https://opentdb.com/api.php?amount=" + amountOfQuestions;
    if (categoryOfQuestions) {
      url += "&category=" + categoryOfQuestions;
    }
    if (difficultyOfQuestions) {
      url += "&difficulty=" + difficultyOfQuestions;
    }
    url += "&type=multiple";

    fetch(url)
      .then(res => res.json())
      .then(data => {
        if(data.results.length !== 0) {
          setQuestions(data.results);
          setFaultyFetch(false);
          setNewGameComponent(false);
        } else {
          setFaultyFetch(true);
          setNewGameComponent(true);
        }
        setAPIcalled(true);
      })
      .catch(err => console.log(err));
  }

  const moveToNextQuestion = () => {
    setSelectedQuestion(selectedQuestion + 1);
  }

  const addPoint = () => {
    setScore(score + 1);
  }

  const startNewGame = (amountOfQuestions, categoryOfQuestions, difficultyOfQuestions) => {
    setResetGame(false);
    
    if (!amountOfQuestions) {
      amountOfQuestions = 10;
    }
    if (categoryOfQuestions === "any"){
      categoryOfQuestions = false
    }   
    if (difficultyOfQuestions === "any"){
      difficultyOfQuestions = false
    }
    setTotalAmountOfQuestions(amountOfQuestions);
    getQuestions(amountOfQuestions, categoryOfQuestions, difficultyOfQuestions);
    console.log("triggerrrrrrr");
  }

  const doResetGame = () => {
    setResetGame(true);
    setScore(0);
    setSelectedQuestion(0);
    setAPIcalled(false);
    getQuestions();
    setFaultyFetch(false);
    setNewGameComponent(true);
  }

  useEffect(() => {
  }, [selectedQuestion, score, newGameComponent]);


  if (newGameComponent) {
    return <NewGame onStartQuiz={startNewGame} faultyFetch={faultyFetch} resetGame={resetGame} />
  } else if (APIcalled && !faultyFetch) {
    return <Question key={crypto.randomUUID()} questionData={questions[selectedQuestion]} questionNumber={selectedQuestion + 1} onAnswer={moveToNextQuestion} totalScore={score} totalQuestions={totalAmountOfQuestions} onCorrectAnswer={addPoint} onFinished={doResetGame} />
  } else {
    return <p>Loading...</p>
  }
}

export default App;