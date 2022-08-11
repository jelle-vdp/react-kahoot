import './App.scss';
import { useEffect, useState } from 'react';

import Question from './Question';

function App() {
  const [questions, setQuestions] = useState([]);
  const [APIcalled, setAPIcalled] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [score, setScore] = useState(0);

  const getQuestions = () => {
    fetch('https://opentdb.com/api.php?amount=10&category=23&type=multiple')
      .then(res => res.json())
      .then(data => {
        setQuestions(data.results);
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

  useEffect(() => {
    if (!APIcalled) {
      getQuestions();
    }
  }, []);

  useEffect(() => {
  }, [selectedQuestion, score]);

  if (APIcalled) {
    return <Question key={crypto.randomUUID()} questionData={questions[selectedQuestion]} questionNumber={selectedQuestion + 1} onAnswer={moveToNextQuestion} totalScore={score} onCorrectAnswer={addPoint} />
  } else {
    return <p>Loading...</p>
  }
}

export default App;
