import "./Accuracy.css";

export default function Accuracy({ totalTyped, totalErrors }) {
  function calculateAccuracy() {
    if (totalTyped === 0) return 100;
    const accuracy = ((totalTyped - totalErrors) / totalTyped) * 100;
    return Math.max(0, Math.round(accuracy));
  }

  return (
    <div className="accuracy">
      <p>
        <span>Accuracy:</span>
        <span className="value-accuracy">{calculateAccuracy()}%</span>
      </p>
    </div>
  );
}
