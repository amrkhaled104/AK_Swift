import { useMemo, useRef, useEffect } from "react";
import "./Text.css";

function getRandomText(data, activeDiff) {
  const diffKey = activeDiff.toLowerCase().trim();
  const filteredTexts = data[diffKey];

  if (filteredTexts && filteredTexts.length > 0) {
    const randomIndex = Math.floor(Math.random() * filteredTexts.length);
    return filteredTexts[randomIndex].text;
  }

  return "Please select a difficulty to start...";
}

export default function Text({
  data,
  activeDiff,
  activeMode,
  userInput,
  setUserInput,
  isStarted,
  setIsStarted,
  onFinish,
  setTotalErrors,
  setTotalTyped,
  isFinished,
}) {
  const inputRef = useRef(null);
  const isReady = activeDiff.trim() !== "" && activeMode.trim() !== "";

  const currentDisplay = useMemo(() => {
    return getRandomText(data, activeDiff);
  }, [activeDiff, data]);

  function handleStart() {
    inputRef.current.focus();
  }
  useEffect(() => {
    if (isStarted && inputRef.current) {
      setUserInput("");
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  }, [activeDiff, data, setUserInput, isStarted]);

  return (
    <div className="text-display-container">
      <input
        ref={inputRef}
        disabled={isFinished}
        type="text"
        style={{ opacity: 0, position: "absolute", zIndex: -1 }}
        onChange={(e) => {
          const value = e.target.value.toLowerCase();
          if (value.length < userInput.length) {
            setUserInput(value);
            return;
          }

          const lastIndex = value.length - 1;
          const typedChar = value[lastIndex].toLowerCase();
          const targetChar = currentDisplay[lastIndex].toLowerCase();

          setTotalTyped((prev) => prev + 1);

          if (typedChar !== targetChar) {
            setTotalErrors((prev) => prev + 1);
          }
          setUserInput(value);
          if (
            !activeMode.includes("Timed") &&
            value.length === currentDisplay.length &&
            currentDisplay.length > 0
          ) {
            if (typeof onFinish === "function") onFinish();
          }
        }}
      />
      <div className="text-card">
        {!isStarted && (
          <div className="text-overlay">
            <div className="overlay-content">
              <button
                className="start-button"
                disabled={!isReady}
                onClick={() => {
                  setIsStarted(true);
                  handleStart();
                }}
                style={{
                  opacity: isReady ? 1 : 0.5,
                  cursor: isReady ? "pointer" : "not-allowed",
                }}
              >
                Start Test
              </button>
              <p className="start-text">
                {isReady
                  ? "Click the button to reveal text and start typing"
                  : "Please select Difficulty and Mode to unlock the test"}
              </p>
            </div>
          </div>
        )}

        <p
          className="typing-text"
          style={{
            userSelect: "none",
            filter: !isStarted ? "blur(8px)" : "none",
            transition: "all 0.3s ease",
          }}
        >
          {currentDisplay
            .toLowerCase()
            .split("")
            .map((char, index) => {
              let color = "";
              if (index < userInput.length) {
                color = userInput[index] === char ? "#2ecc71" : "#e74c3c";
              }

              return (
                <span
                  key={index}
                  style={{
                    color: color,
                    marginRight: char === " " ? "0.25ch" : "0",
                  }}
                >
                  {char}
                </span>
              );
            })}
        </p>
      </div>
    </div>
  );
}
