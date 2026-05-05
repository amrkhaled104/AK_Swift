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

export default function App() {
  const [activeDiff, setActiveDiff] = useState(" ");
  const [activeMode, setActiveMode] = useState(" ");
  const [userInput, setUserInput] = useState("");
  const [isStarted, setIsStarted] = useState(false);

  return (
    <div className="app-container">
      <Navbar>
        <Logo />
        <ScoreStats />
      </Navbar>

      <TestToolbar>
        <Score />
        <Accuracy />
        <Time
          activeMode={activeMode}
          userInput={userInput}
          isStarted={isStarted}
        />
        <Difficulty activeDiff={activeDiff} setActiveDiff={setActiveDiff} isStarted={isStarted} />
        <Mode activeMode={activeMode} setActiveMode={setActiveMode} isStarted={isStarted} />
      </TestToolbar>
      <Text
        data={TYPING_DATA}
        activeDiff={activeDiff}
        activeMode={activeMode}
        userInput={userInput}
        setUserInput={setUserInput}
        isStarted={isStarted}
        setIsStarted={setIsStarted}
      />
    </div>
  );
}
