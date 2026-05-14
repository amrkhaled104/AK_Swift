import Navbar from "../components/Navbar";
import Logo from "../components/Logo";
import ScoreStats from "../components/ScoreStats";
import "./Header.css";

export default function Header({ newRecord }) {
  return (
    <header className="header">
      <Navbar>
        <Logo />
        <ScoreStats newRecord={newRecord} />
      </Navbar>
    </header>
  );
}
