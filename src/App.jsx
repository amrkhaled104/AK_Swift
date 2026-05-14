import "./index.css";
import { useState } from "react";
import { TYPING_DATA } from "./data";
import Navbar from "./components/Navbar";
import Logo from "./components/Logo";
import ScoreStats from "./components/ScoreStats";
import TestToolbar from "./components/TestToolbar";
import Score from "./components/Score";
import Accuracy from "./components/Accuracy";
import Time from "./components/Time";
import Difficulty from "./components/Difficulty";
import Mode from "./components/Mode";
import Text from "./components/Text";
import Reload from "./components/Reload";
import { useEffect } from "react";

export default function App() {
  const [activeDiff, setActiveDiff] = useState(" ");
  const [activeMode, setActiveMode] = useState(" ");
  const [userInput, setUserInput] = useState("");
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [totalTyped, setTotalTyped] = useState(0);
  const [totalErrors, setTotalErrors] = useState(0);
  const [time, setTime] = useState(0);
  const [newRecord, setNewRecord] = useState(false);

  useEffect(() => {
    setNewRecord(Number(localStorage.getItem("personalBest"))||0);
  }, [isStarted]);
  useEffect(() => {
    const secondsElapsed = activeMode.includes("Timed") ? 60 - time : time;
    const effectiveTime = Math.max(secondsElapsed, 1);
    const finalWpm = Math.round(
      (totalTyped - totalErrors) / 5 / (effectiveTime / 60),
    );
    if (isFinished) {
      const savedBest = Number(localStorage.getItem("personalBest")) || 0;
      if (finalWpm > savedBest) {
        localStorage.setItem("personalBest", finalWpm.toString());
        setNewRecord(finalWpm);
      }
    }
  }, [isFinished, setNewRecord, activeMode, time, totalTyped, totalErrors]);

  return (
    <div className="app-container">
      <Navbar>
        <Logo />
        <ScoreStats newRecord={newRecord} />
      </Navbar>
      <TestToolbar>
        <Score
          time={time}
          totalTyped={totalTyped}
          totalErrors={totalErrors}
          activeMode={activeMode}
        />
        <Accuracy totalTyped={totalTyped} totalErrors={totalErrors} />
        <Time
          activeMode={activeMode}
          isStarted={isStarted}
          isFinished={isFinished}
          setIsFinished={setIsFinished}
          userInput={userInput}
          time={time}
          setTime={setTime}
        />
        <Difficulty
          activeDiff={activeDiff}
          setActiveDiff={setActiveDiff}
          isStarted={isStarted}
        />
        <Mode
          activeMode={activeMode}
          setActiveMode={setActiveMode}
          isStarted={isStarted}
        />
      </TestToolbar>
      <Text
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
        time={time}
      />
      <Reload
        setIsStarted={setIsStarted}
        setUserInput={setUserInput}
        setIsFinished={setIsFinished}
      />
      <Result></Result>
    </div>
  );
}

const Result = ({ children }) => {
  return <div className="overlay">{children}</div>;
};
