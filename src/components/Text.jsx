import { useState, useMemo } from "react";

function getRandomText(data, activeDiff) {
  const diffKey = activeDiff.toLowerCase().trim();
  const filteredTexts = data[diffKey];

  if (filteredTexts && filteredTexts.length > 0) {
    const randomIndex = Math.floor(Math.random() * filteredTexts.length);
    return filteredTexts[randomIndex].text;
  }

  return "Please select a difficulty to start...";
}

export default function Text({ data, activeDiff, activeMode }) {
  const [isStarted, setIsStarted] = useState(false);

  const isReady = activeDiff.trim() !== "" && activeMode.trim() !== "";

  const currentDisplay = useMemo(() => {
    return getRandomText(data, activeDiff);
  }, [activeDiff]);

  return (
    <div className="text-display-container">
      <div className="text-card">
        {!isStarted && (
          <div className="text-overlay">
            <div className="overlay-content">
              <button
                className="start-button"
                disabled={!isReady}
                onClick={() => setIsStarted(true)}
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
          {currentDisplay}
        </p>
      </div>
    </div>
  );
}
