import React, { useState, useEffect } from 'react';
import { QUESTIONS } from './questions';

const App = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (showResults) {
      updateAverageScore();
    }
  }, [showResults]); 

  const handleAnswer = (answer) => {
    if (answer === 'Yes') {
      setScore((prevScore) => prevScore + 1);
    }

    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < Object.keys(QUESTIONS).length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setShowResults(true);
    }
  };

  const updateAverageScore = () => {
    const finalScore = (score / Object.keys(QUESTIONS).length) * 100;
    const previousScores = JSON.parse(localStorage.getItem('scores')) || [];
    localStorage.setItem('scores', JSON.stringify([...previousScores, finalScore]));
  };

  const getAverageScore = () => {
    const scores = JSON.parse(localStorage.getItem('scores')) || [];
    if (scores.length === 0) {
      return "No scores available"; 
    }
    const averageScore = scores.reduce((acc, curr) => acc + curr, 0) / scores.length;
    return averageScore.toFixed(2);
  };
  
  const renderQuestion = () => {
    const questionText = QUESTIONS[currentQuestionIndex + 1]; 
    return (
      <div>
        <p>{questionText}</p>
        <button onClick={() => handleAnswer('Yes')}>Yes</button>
        <button onClick={() => handleAnswer('No')}>No</button>
      </div>
    );
  };

  const renderResults = () => {
    return (
      <div>
        <p>Your score is: {(score / Object.keys(QUESTIONS).length * 100).toFixed(2)}%</p>
        <p>Average score across all runs: {getAverageScore()}%</p>
      </div>
    );
  };

  return (
    <div className="main__wrap">
      <main className="container">
        {showResults ? renderResults() : renderQuestion()}
      </main>
    </div>
  );
};

export default App;
