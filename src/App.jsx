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

  return (
    <div className="app-container">
      <Navbar>
        <Logo />
        <ScoreStats />
      </Navbar>

      <TestToolbar>
        <Score />
        <Accuracy />
        <Time activeMode={activeMode} />
        <Difficulty activeDiff={activeDiff} setActiveDiff={setActiveDiff} />
        <Mode activeMode={activeMode} setActiveMode={setActiveMode} />
      </TestToolbar>
      <Text
        data={TYPING_DATA}
        activeDiff={activeDiff}
        activeMode={activeMode}
      />
    </div>
  );
}
