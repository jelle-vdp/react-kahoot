import './Question.scss';
import parse from 'html-react-parser';
import { useState, useEffect } from 'react';

function Question({questionData, questionNumber, onAnswer, totalScore, onCorrectAnswer}) { 

const [answers, setAnswers] = useState([]);
const [result, setResult] = useState("false");

const shuffle = (array) => {
    array.sort(() => Math.random() - 0.5);
}

const checkAnswer = (e) => {
  e.preventDefault();
  const radioButtons = document.querySelectorAll('input[type="radio"]');
  const answerOverlay = document.querySelector('.answer-overlay');
  radioButtons.forEach(radioButton => {
    if (radioButton.checked) {
      if (radioButton.value === questionData.correct_answer) {
        console.log("correct");
        setResult("true");
        answerOverlay.classList.add('answer-overlay--show');
        onCorrectAnswer();
      } else {
        console.log("incorrect");
        answerOverlay.classList.add('answer-overlay--show');
        setResult("false");
      }
      setTimeout(() => {
        onAnswer();
        answerOverlay.classList.remove('answer-overlay--show');
      }, 5000);
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
      <div className="answer-overlay">Your answer was {result}{!result? `The correct answer was ${questionData.correct_answer}` : ""}</div>
      <p>Question {questionNumber} of 10 / Current score: {totalScore}</p>
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
