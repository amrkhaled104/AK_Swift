import "./index.css";
import { useState, useEffect } from "react";
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

  const [newRecord, setNewRecord] = useState(
    Number(localStorage.getItem("personalBest")) || 0,
  );

  useEffect(() => {
    if (isFinished) {
      const secondsElapsed = activeMode.includes("Timed") ? 60 - time : time;
      const effectiveTime = Math.max(secondsElapsed, 1);
      const finalWpm = Math.round(
        (totalTyped - totalErrors) / 5 / (effectiveTime / 60),
      );

      const savedBest = Number(localStorage.getItem("personalBest")) || 0;
      if (finalWpm > savedBest) {
        localStorage.setItem("personalBest", finalWpm.toString());
        setTimeout(() => setNewRecord(finalWpm), 0);
      } else {
        setTimeout(() => setNewRecord(savedBest), 0);
      }
    }
  }, [isFinished, activeMode, time, totalTyped, totalErrors]);

  return (
    <div className="app-container">
      <Header newRecord={newRecord} />

      <TestStats
        time={time}
        totalTyped={totalTyped}
        totalErrors={totalErrors}
        activeMode={activeMode}
        isStarted={isStarted}
        isFinished={isFinished}
        setIsFinished={setIsFinished}
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
        setIsFinished={setIsFinished}
        isFinished={isFinished}
        setTotalErrors={setTotalErrors}
        setTotalTyped={setTotalTyped}
      />
    </div>
  );
}
