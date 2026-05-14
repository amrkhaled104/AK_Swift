import Text from "../components/Text";
import Reload from "../components/Reload";
import "./TestArea.css";

export default function TestArea({
  data,
  activeDiff,
  activeMode,
  userInput,
  setUserInput,
  isStarted,
  setIsStarted,
  setIsFinished,
  isFinished,
  setTotalErrors,
  setTotalTyped,
}) {
  return (
    <div className="test-area">
      <Text
        data={data}
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
      <div className="test-controls">
        <Reload
          setIsStarted={setIsStarted}
          setUserInput={setUserInput}
          setIsFinished={setIsFinished}
        />
      </div>
    </div>
  );
}
