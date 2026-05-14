import "./Reload.css";

export default function Reload({ setIsStarted, setUserInput, setIsFinished }) {
  const handleReset = () => {
    setIsStarted(false);
    setIsFinished(false);
    setUserInput("");
  };

  return (
    <button
      onClick={handleReset}
      title="Restart"
      style={{
        background: "none",
        border: "none",
        padding: "10px",
        cursor: "pointer",
        color: "inherit",
        outline: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        viewBox="0 0 24 24"
        width="24"
        height="24"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="reload-icon"
      >
        <polyline points="23 4 23 10 17 10"></polyline>
        <polyline points="1 20 1 14 7 14"></polyline>
        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
      </svg>
    </button>
  );
}
