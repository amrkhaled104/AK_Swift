import trophy from "../assets/images/icon-personal-best.svg";

export default function ScoreStats({newRecord}) {
  return (
    <div className="stats-badge">
      <img src={trophy} alt="Trophy" className="stats-icon" />
      <p className="stats-text">
        <span>Personal best:</span> {newRecord} WPM
      </p>
    </div>
  );
}
