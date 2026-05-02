export default function Mode({ activeMode, setActiveMode }) {
  const modes = ["Timed(60s)", "passage"];
  return (
    <div className="config-item">
      <p>
        <span>Mode:</span>
      </p>
      <ul>
        {modes.map(function (mode) {
          return (
            <li
              key={mode}
              className={`pill ${activeMode === mode ? "active" : ""}`}
              onClick={() => setActiveMode(mode)}
            >
              {mode}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
