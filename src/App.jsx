import "./index.css";
import { useState } from "react";
import { TYPING_DATA } from "./data";
import Header from "./containers/Header";
import TestStats from "./containers/TestStats";
import TestArea from "./containers/TestArea";
import "./App.css";

export default function App() {
  const [activeDiff, setActiveDiff] = useState(" ");
  const [activeMode, setActiveMode] = useState(" ");
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const [userInput, setUserInput] = useState("");
  const [totalTyped, setTotalTyped] = useState(0);
  const [totalErrors, setTotalErrors] = useState(0);
  const [time, setTime] = useState(0);

  const [personalBest, setPersonalBest] = useState(() => {
    const savedBest = localStorage.getItem("personalBest");
    return savedBest !== null ? Number(savedBest) : 0;
  });
  const [resultState, setResultState] = useState(null);

  const correctChars = totalTyped - totalErrors;
  const secondsElapsed = activeMode.includes("Timed") ? 60 - time : time;
  const timeForWpm = Math.max(secondsElapsed, 1);
  const currentWpm = Math.round(correctChars / 5 / (timeForWpm / 60));
  const accuracy =
    totalTyped > 0 ? Math.round((correctChars / totalTyped) * 100) : 0;

  const handleFinish = () => {
    if (isFinished) return;

    const savedBestValue = localStorage.getItem("personalBest");
    const savedBest = savedBestValue !== null ? Number(savedBestValue) : 0;
    let nextResult = "standard";
    let nextBest = savedBest;

    if (savedBestValue === null) {
      nextBest = currentWpm;
      nextResult = "firstTest";
      localStorage.setItem("personalBest", currentWpm.toString());
    } else if (currentWpm > savedBest) {
      nextBest = currentWpm;
      nextResult = "highScore";
      localStorage.setItem("personalBest", currentWpm.toString());
    }

    setIsFinished(true);
    setPersonalBest(nextBest);
    setResultState(nextResult);
  };

  const handleRetry = () => {
    setIsStarted(false);
    setIsFinished(false);
    setUserInput("");
    setTotalTyped(0);
    setTotalErrors(0);
    setResultState(null);
  };

  return (
    <div className="app-container">
      <Header newRecord={personalBest} />

      <TestStats
        time={time}
        totalTyped={totalTyped}
        totalErrors={totalErrors}
        activeMode={activeMode}
        isStarted={isStarted}
        isFinished={isFinished}
        onFinish={handleFinish}
        userInput={userInput}
        setTime={setTime}
        activeDiff={activeDiff}
        setActiveDiff={setActiveDiff}
        setActiveMode={setActiveMode}
      />

      <TestArea
        data={TYPING_DATA}
        activeDiff={activeDiff}
        activeMode={activeMode}
        userInput={userInput}
        setUserInput={setUserInput}
        isStarted={isStarted}
        setIsStarted={setIsStarted}
        isFinished={isFinished}
        setTotalErrors={setTotalErrors}
        setTotalTyped={setTotalTyped}
        resultState={resultState}
        currentWpm={currentWpm}
        accuracy={accuracy}
        correctChars={correctChars}
        incorrectChars={totalErrors}
        personalBest={personalBest}
        onRetry={handleRetry}
        onFinish={handleFinish}
      />
    </div>
  );
}
