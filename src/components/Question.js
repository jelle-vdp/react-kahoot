import './Question.scss';
import parse from 'html-react-parser';
import { useState, useEffect } from 'react';

function Question({questionData}) {

  const [answers, setAnswers] = useState([]);
  const [answersAvailable, setAnswersAvailable] = useState(false);

  const shuffle = (array) => {
    array.sort(() => Math.random() - 0.5);
  }

  useEffect(() => {
    setAnswers(answers.push(questionData.correct_answer, ...questionData.incorrect_answers));
    console.log("answers", answers);
    setAnswers(shuffle(answers));
    console.log("shuffled answers: ", answers);
    setAnswersAvailable(true);
  } , []);

  return (
    <>
      <p>{parse(questionData.question)}</p>
      {answersAvailable ? 
      (<form>
        {answers.map((answer) => {(
          <>
            <label for={answer}>{answer}</label>
            <input type="radio" name="answer" value={answer} />
          </>
          )}
        )}
        </form>) : (<p>Loading...</p>)}
    </>
  );
}

export default Question;
