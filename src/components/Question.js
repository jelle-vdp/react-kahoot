import './Question.scss';
import parse from 'html-react-parser';
import { useState, useEffect } from 'react';

function Question({questionData, questionNumber, onAnswer, totalScore, onCorrectAnswer, onFinished}) { 

const [answers, setAnswers] = useState([]);
const [result, setResult] = useState("incorrect");
const [showResultOverlay, setShowResultOverlay] = useState(false);
const [showResetOverlay, setShowResetOverlay] = useState(false);

const shuffle = (array) => {
    array.sort(() => Math.random() - 0.5);
}

const checkAnswer = (e) => {
  e.preventDefault();
  const radioButtons = document.querySelectorAll('input[type="radio"]');
  radioButtons.forEach(radioButton => {
    if (radioButton.checked) {
      if (radioButton.value === questionData.correct_answer) {
        setResult("correct");
        setShowResultOverlay(true);
        if (questionNumber !== 10) {
          setTimeout(() => {
            onCorrectAnswer();
          }, 1000);
        }
      } else {
        setResult("incorrect");
        setShowResultOverlay(true);
      }
      setTimeout(() => {
        if (questionNumber !== 10) {
          onAnswer();
        }
        setShowResultOverlay(false);

        if (questionNumber === 10) {
          setShowResetOverlay(true);
        }
      }, 1000);
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
      <div className={`answer-overlay${showResultOverlay? ' answer-overlay--show' : ''}`}><p>Your answer was {result}{result === "incorrect" ? `. The correct answer was ${questionData.correct_answer}.` : "."} Your current score is {result === "incorrect" ?  `${totalScore}` : `${totalScore + 1}`}.</p></div>
      <div className={`reset-overlay${showResetOverlay? ' answer-overlay--show' : ''}`}>
        <p>Game over! You scored {result === "incorrect" ?  `${totalScore}` : `${totalScore + 1}`}.</p>
        <button onClick={onFinished}>Play again</button>
      </div>
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
