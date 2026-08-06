import Text from "../components/Text";
import Reload from "../components/Reload";
import ResultOverlay from "../components/ResultOverlay";
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
  resultState,
  currentWpm,
  accuracy,
  correctChars,
  incorrectChars,
  personalBest,
  onRetry,
  onFinish,
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
        onFinish={onFinish}
        isFinished={isFinished}
        setTotalErrors={setTotalErrors}
        setTotalTyped={setTotalTyped}
      />

      {!isFinished && (
        <div className="test-controls">
          <Reload
            setIsStarted={setIsStarted}
            setUserInput={setUserInput}
            onRetry={onRetry}
          />
        </div>
      )}

      {isFinished && (
        <ResultOverlay
          resultState={resultState}
          currentWpm={currentWpm}
          accuracy={accuracy}
          correctChars={correctChars}
          incorrectChars={incorrectChars}
          personalBest={personalBest}
          onRetry={onRetry}
        />
      )}
    </div>
  );
}
