import logo from "../assets/images/logo-small.svg";
import "./Logo.css";

export default function Logo() {
  return (
    <div className="logo">
      <img src={logo} alt="Logo" className="logo-icon" />
      <div className="logo-text">
        <p className="title">AK Typing Speed Test</p>
        <p className="subtitle">Type as fast as you can</p>
      </div>
    </div>
  );
}
