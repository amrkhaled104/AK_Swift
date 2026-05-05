import { useState, useEffect } from "react";
export default function Time({ activeMode, userInput, isStarted, isFinished }) {
  const isTimedMode = activeMode.includes("Timed");
  const [time, setTime] = useState(0);
  isTimedMode && isStarted && userInput.length > 0 && time === 0 && setTime(60);
  useEffect(() => {
    let interval = null;
    const shouldRun = isStarted && userInput.length > 0 && !isFinished;

    if (shouldRun) {
      interval = setInterval(() => {
        setTime((prev) => {
          if (isTimedMode) {
            if (prev <= 1) return 0;
            return prev - 1;
          }
          return prev + 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isStarted, userInput.length > 0, isFinished]);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const formatTime = (num) => (num < 10 ? `0${num}` : num);
  return (
    <div className="time">
      <p>
        <span>Time:</span>
        {formatTime(minutes)}:{formatTime(seconds)}
      </p>
    </div>
  );
}
