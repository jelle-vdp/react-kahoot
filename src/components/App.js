import './App.scss';
import { useEffect, useState } from 'react';

import Question from './Question';

function App() {
  const [questions, setQuestions] = useState([]);
  const [APIcalled, setAPIcalled] = useState(false);

  const getQuestions = () => {
    fetch('https://opentdb.com/api.php?amount=10&category=23&type=multiple')
      .then(res => res.json())
      .then(data => {
        setQuestions(data.results);
        setAPIcalled(true);
      })
      .catch(err => console.log(err));
}

  useEffect(() => {
    if (!APIcalled) {
      getQuestions();
    }
  }, []);

  if (APIcalled){
    return questions.map((question) => (
      <Question key={crypto.randomUUID()} questionData={question}  />
    ))
  } else {
    return <p>Loading...</p>
  }
}

export default App;
