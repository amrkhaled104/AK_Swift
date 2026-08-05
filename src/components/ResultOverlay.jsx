import trophy from "../assets/images/icon-personal-best.svg";
import "./ResultOverlay.css";

const resultConfig = {
  firstTest: {
    title: "Baseline Established!",
    subtitle:
      "You’ve set the bar. Now the real challenge begins—time to beat it.",
    buttonText: "Beat This Score ↺",
    iconType: "check",
  },
  highScore: {
    title: "High Score Smashed!",
    subtitle: "You’re getting faster. That was incredible typing.",
    buttonText: "Beat This Score ↺",
    iconType: "party",
  },
  standard: {
    title: "Test Complete!",
    subtitle: "Solid run. Keep pushing to beat your high score.",
    buttonText: "Go Again ↺",
    iconType: "check",
  },
};

export default function ResultOverlay({
  resultState,
  currentWpm,
  accuracy,
  correctChars,
  incorrectChars,
  personalBest,
  onRetry,
}) {
  const { title, subtitle, buttonText, iconType } =
    resultConfig[resultState] || resultConfig.standard;

  return (
    <div className="result-overlay">
      <div className="overlay-card">
        <div className="personal-best-badge">
          <img src={trophy} alt="Trophy" />
          <p>
            <span>Personal best:</span> {personalBest} WPM
          </p>
        </div>

        <div className="icon-area">
          {iconType === "party" ? (
            <div className="icon-circle party-circle">
              <div className="party-popper" aria-hidden="true">
                <span className="popper-stick" />
                <span className="popper-top">🎉</span>
              </div>
            </div>
          ) : (
            <div className="icon-circle check-circle">
              <svg
                viewBox="0 0 24 24"
                width="32"
                height="32"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
          )}
        </div>

        <div className="result-copy">
          <h2 className="result-title">{title}</h2>
          <p className="result-subtitle">{subtitle}</p>
        </div>

        <div className="stats-row">
          <div className="stat-card">
            <span className="stat-label">WPM</span>
            <span className="stat-value">{currentWpm}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Accuracy</span>
            <span className="stat-value stat-value-positive">{accuracy}%</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Characters</span>
            <span className="stat-value">
              <span className="stat-correct">{correctChars}</span>
              <span className="stat-divider">/</span>
              <span className="stat-incorrect">{incorrectChars}</span>
            </span>
          </div>
        </div>

        <button className="overlay-action-button" onClick={onRetry}>
          {buttonText}
        </button>

        {iconType === "party" && (
          <div className="highscore-confetti" aria-hidden="true">
            <span className="confetti-dot c1" />
            <span className="confetti-dot c2" />
            <span className="confetti-dot c3" />
            <span className="confetti-dot c4" />
            <span className="confetti-dot c5" />
            <span className="confetti-dot c6" />
            <span className="confetti-dot c7" />
            <span className="confetti-dot c8" />
          </div>
        )}
      </div>
    </div>
  );
}
