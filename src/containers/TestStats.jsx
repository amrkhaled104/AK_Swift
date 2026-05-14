import Score from "../components/Score";
import Accuracy from "../components/Accuracy";
import Time from "../components/Time";
import Difficulty from "../components/Difficulty";
import Mode from "../components/Mode";
import "./TestStats.css";

export default function TestStats({
  time,
  totalTyped,
  totalErrors,
  activeMode,
  isStarted,
  isFinished,
  setIsFinished,
  userInput,
  setTime,
  activeDiff,
  setActiveDiff,
  setActiveMode,
}) {
  return (
    <div className="test-stats">
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
    </div>
  );
}
