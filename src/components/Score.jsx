import "./Score.css";

export default function Score({ time, totalTyped, totalErrors, activeMode }) {
  const isTimedMode = activeMode.includes("Timed");

  const secondsElapsed = isTimedMode ? 60 - time : time;

  const timeInMinutes = secondsElapsed / 60;

  const correctChars = totalTyped - totalErrors;

  const wpm =
    secondsElapsed > 0 ? Math.round(correctChars / 5 / timeInMinutes) : 0;

  return (
    <div className="score">
      <p>
        <span>WPM:</span> <span className="value-wpm">{wpm}</span>
      </p>
    </div>
  );
}
