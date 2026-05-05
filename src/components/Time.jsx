import { useState, useEffect } from "react";
export default function Time({ activeMode, userInput, isStarted }) {
  const [time, setTime] = useState(0);
  const isTimedMode = activeMode.includes("60s");

  useEffect(() => {
    if (isTimedMode) {
      setTime(60);
    } else {
      setTime(0);
    }
  }, [activeMode]);

  useEffect(() => {
    let interval = null;
    const shouldRun = isStarted && userInput.length > 0;

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
    } else {
      if (isTimedMode) setTime(60);
      else setTime(0);
    }

    return () => clearInterval(interval);
  }, [isStarted, userInput.length > 0, isTimedMode]);
  return (
    <div className="time">
      <p>
        <span>Time:</span>
        {time}
      </p>
    </div>
  );
}
