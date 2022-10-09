import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { CountDown } from "./components/CountDown";
import { Stage } from "./components/Stage/Stage";
import "./style.css";

const App = () => {
  const [countDownDate, setCountDownDate] = useState(
    new Date(new Date().getTime() + 1 * 60000)
  );

  const [timeToEnd, setTimeToEnd] = useState("");
  const [startGame, setStartGame] = useState(false);

  const handleCountDown = (time) => {
    setCountDownDate(time);
  };

  const handleTimeOut = (time) => {
    setTimeToEnd(time);
  };

  const handleStart = () => {
    setStartGame(true);
  };

  return (
    <div className="container">
      <h1>Datlování</h1>
      {startGame ? (
        <>
          <CountDown
            countDownDate={countDownDate}
            timeToEnd={timeToEnd}
            handleTimeOut={handleTimeOut}
          />
          <Stage onCountDown={handleCountDown} timeToEnd={timeToEnd} />
        </>
      ) : (
        <button className="wordbox" onClick={handleStart}>
          Start Game
        </button>
      )}
    </div>
  );
};

createRoot(document.querySelector("#app")).render(<App />);
