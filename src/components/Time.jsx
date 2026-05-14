import { useEffect } from "react";

export default function Time({
  activeMode,
  userInput,
  isStarted,
  isFinished,
  setIsFinished,
  time,
  setTime,
}) {
  const isTimedMode = activeMode.includes("Timed");

  useEffect(() => {
    if (!isStarted) {
      setTime(isTimedMode ? 60 : 0);
    }
  }, [isTimedMode, isStarted, setTime]);

  useEffect(() => {
    const canStart = isStarted && !isFinished && userInput.length > 0;
    
    if (!canStart) return;

    const interval = setInterval(() => {
      setTime((prev) => {
        if (isTimedMode) {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isStarted, isFinished, userInput.length > 0, isTimedMode]); 

  useEffect(() => {
    if (isTimedMode && time === 0 && isStarted && !isFinished) {
      setIsFinished(true);
    }
  }, [time, isTimedMode, isStarted, isFinished, setIsFinished]);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const pad = (n) => String(n).padStart(2, "0");

  return (
    <div className="time">
      <p><span>Time: </span>{pad(minutes)}:{pad(seconds)}</p>
    </div>
  );
}