import { useEffect } from "react";
import "./Time.css";

export default function Time({
  activeMode,
  userInput,
  isStarted,
  isFinished,
  onFinish,
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
  }, [isStarted, isFinished, isTimedMode, userInput.length > 0]);

  useEffect(() => {
    if (isTimedMode && time === 0 && isStarted && !isFinished) {
      if (typeof onFinish === "function") onFinish();
    }
  }, [time, isTimedMode, isStarted, isFinished, onFinish]);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const pad = (n) => String(n).padStart(2, "0");

  return (
    <div className="time">
      <p>
        <span>Time:</span>{" "}
        <span className="value-time">
          {pad(minutes)}:{pad(seconds)}
        </span>
      </p>
    </div>
  );
}
