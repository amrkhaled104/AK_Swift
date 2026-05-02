export default function Difficulty({ activeDiff, setActiveDiff }) {
  const difficulties = ["Easy", "Medium", "Hard"];
  return (
    <div className="config-item">
      <p>
        <span>Difficulty:</span>
      </p>
      <ul>
        {difficulties.map(function (diff) {
          return (
            <li
              key={diff}
              className={`pill ${activeDiff === diff ? "active" : ""}`}
              onClick={() => setActiveDiff(diff)}
            >
              {diff}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
