import { useState } from "react";
import "./Hint.css";

const stockNames = [
  "AAPL",
  "GOOGL",
  "MSFT",
  "AMZN",
  "TSLA",
  "NFLX",
  "NVDA",
  "BABA",
  "INTC",
];

export default function Hint() {
  const [showHint, setShowHint] = useState(false);

  return (
    <div className="hint">
      <button onClick={() => setShowHint(!showHint)} className="hint-button">
        {showHint ? "Hide" : "Show"} hint
      </button>
      {showHint && (
        <div className="hint-text">
          Try typing one of the following stock symbols: <br />
          {stockNames.join(", ")}
        </div>
      )}
    </div>
  );
}
