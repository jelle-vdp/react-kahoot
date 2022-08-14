import { useState } from 'react';

import './NewGame.scss';

function NewGame({onStartQuiz, faultyFetch}) {

  const [amountOfQuestions, setAmountOfQuestions] = useState(10);
  const [categoryOfQuestions, setCategoryOfQuestions] = useState("any");
  const [difficultyOfQuestions, setDifficultyOfQuestions] = useState("any");

  const startQuiz = () => {
    onStartQuiz(amountOfQuestions, categoryOfQuestions, difficultyOfQuestions);
  }

  const amountChange = (e) => {
    setAmountOfQuestions(e.target.value);
  }

  const categoryChange = (e) => {
    setCategoryOfQuestions(e.target.value);
  }

  const difficultyChange = (e) => {
    setDifficultyOfQuestions(e.target.value);
  }

  const quizCategories = [
    {value: "any", label: "Any Category"},
    {value: "9", label: "General Knowledge"},
    {value: "10", label: "Entertainment: Books"},
    {value: "11", label: "Entertainment: Film"},
    {value: "12", label: "Entertainment: Music"},
    {value: "13", label: "Entertainment: Musicals & Theatres"},
    {value: "14", label: "Entertainment: Television"},
    {value: "15", label: "Entertainment: Video Games"},
    {value: "16", label: "Entertainment: Board Games"},
    {value: "17", label: "Science & Nature"},
    {value: "18", label: "Science: Computers"},
    {value: "19", label: "Science: Mathematics"},
    {value: "20", label: "Mythology"},
    {value: "21", label: "Sports"},
    {value: "22", label: "Geography"},
    {value: "23", label: "History"},
    {value: "24", label: "Politics"},
    {value: "25", label: "Art"},
    {value: "26", label: "Celebrities"},
    {value: "27", label: "Animals"},
    {value: "28", label: "Vehicles"},
    {value: "29", label: "Entertainment: Comics"},
    {value: "30", label: "Science: Gadgets"},
    {value: "31", label: "Entertainment: Japanese Anime & Manga"},
    {value: "32", label: "Entertainment: Cartoon & Animations"}
  ]

  const filterForProperCategory = (arr, searchKey) => {
      return arr.filter(obj => Object.keys(obj).some(key => obj[key].includes(searchKey)))[0].label;
  }

  return (
      <>
        <h1>Start a new quiz</h1>

        {faultyFetch ? <p>There aren't {amountOfQuestions} questions available in the catergory "{filterForProperCategory(quizCategories, categoryOfQuestions)}" with a {difficultyOfQuestions.toLowerCase()} difficulty level. Please try again.</p> : null}

        <label htmlFor="questions__amount">Amount of questions?</label>
        <input onChange={amountChange} type="number" id="questions__amount" className="questions__amount" min="1" max="50" placeholder="10" />
        
        <label htmlFor="questions__category">Category of questions?</label>
        <select onChange={categoryChange} id="questions__category" className="questions__category">
          {quizCategories.map(category => (
            <option key={category.value} value={category.value}>{category.label}</option>
          ))}
      </select>
      <label htmlFor="questions__difficulty">Difficulty setting?</label>
      <select onChange={difficultyChange} name="questions__difficulty" className="questions__difficulty">
        <option value="any">Any Difficulty</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <button className="questions__start" onClick={startQuiz}>Start the quiz</button>
    </>
  );
}

export default NewGame;
