import './Question.scss';
import parse from 'html-react-parser';
import { useState } from 'react';
import shuffle from './../helpers/arrayHelpers';

function Question({questionData, questionNumber, onAnswer, totalScore, onCorrectAnswer, onFinished, totalQuestions}) { 

const [answers, setAnswers] = useState(questionData ? shuffle([questionData.correct_answer, ...questionData.incorrect_answers]) : []);
const [result, setResult] = useState("incorrect");
const [showResultOverlay, setShowResultOverlay] = useState(false);
const [showResetOverlay, setShowResetOverlay] = useState(false);

const checkAnswer = (e) => {
  e.preventDefault();
  const radioButtons = document.querySelectorAll('input[type="radio"]');
  radioButtons.forEach(radioButton => {
    if (radioButton.checked) {
      if (radioButton.value === questionData.correct_answer) {
        setResult("correct");
        setShowResultOverlay(true);
        if (questionNumber !== totalQuestions) {
          setTimeout(() => {
            onCorrectAnswer();
          }, 1000);
        }
      } else {
        setResult("incorrect");
        setShowResultOverlay(true);
      }
      setTimeout(() => {
        if (questionNumber !== totalQuestions) {
          onAnswer();
        }
        setShowResultOverlay(false);

        if (questionNumber === totalQuestions) {
          setShowResetOverlay(true);
        }
      }, 1000);
    }
  })
}

if (answers) {
  return (
    <>
      <div className={`answer-overlay${showResultOverlay? ' answer-overlay--show' : ''}`}><p>Your answer was {result}{result === "incorrect" ? `. The correct answer was ${questionData.correct_answer}.` : "."} Your current score is {result === "incorrect" ?  `${totalScore}` : `${totalScore + 1}`}.</p></div>
      <div className={`reset-overlay${showResetOverlay? ' answer-overlay--show' : ''}`}>
        <p>Game over! You scored {result === "incorrect" ?  `${totalScore}` : `${totalScore + 1}`}.</p>
        <button onClick={onFinished}>Play again</button>
      </div>
      <p>Question {questionNumber} of {totalQuestions} / Current score: {totalScore}</p>
      <h2>{parse(questionData.question)}</h2>
      <form onSubmit={(e) => checkAnswer(e)}>
        <fieldset className="answers-wrapper">
          {answers ? (
            answers.map((answer) => {
              return (
                <fieldset className="answer" key={crypto.randomUUID()}>
                  <label htmlFor={parse(answer)}>{parse(answer)}</label>
                  <input type="radio" name="answer" value={parse(answer)} />
                </fieldset>
              )
          })) : (<p>Loading...</p>)
        }
        </fieldset>
        <button type="submit">Submit</button>
      </form>
    </>
  ) 
  } else {
    return <p>Loading...</p>
  }
}

export default Question;
