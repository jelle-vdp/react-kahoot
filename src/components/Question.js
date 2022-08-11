import './Question.scss';
import parse from 'html-react-parser';
import { useState, useEffect } from 'react';

function Question({questionData, questionNumber, onAnswer}) {

const [answers, setAnswers] = useState([]);

const shuffle = (array) => {
    array.sort(() => Math.random() - 0.5);
}

const checkAnswer = (e) => {
  e.preventDefault();
  const radioButtons = document.querySelectorAll('input[type="radio"]');
  radioButtons.forEach(radioButton => {
    if (radioButton.checked) {
      if (radioButton.value === questionData.correct_answer) {
      console.log("correct");
      } else {
      console.log("incorrect");
      }
      setTimeout(onAnswer, 5000);
    }
  })
}

useEffect(() => {
    let possibleAnswers = [questionData.correct_answer, ...questionData.incorrect_answers];
    shuffle(possibleAnswers);
    setAnswers([...possibleAnswers]);
    console.log(questionData.correct_answer);
}, []);

return (
    <>
      <p>Question {questionNumber} of 10</p>
      <h2>{parse(questionData.question)}</h2>
      <form onSubmit={(e) => checkAnswer(e)}>
        <fieldset className="answers-wrapper">
          {answers ? (
            answers.map((answer) => {
              return (
                <fieldset className="answer" key={crypto.randomUUID()}>
                  <label htmlFor={answer}>{parse(answer)}</label>
                  <input type="radio" name="answer" value={answer} />
                </fieldset>
              )
          })) : (<p>Loading...</p>)
        }
        </fieldset>
      <button type="submit">Submit</button>
      </form>
    </>
  )
;
}

export default Question;
