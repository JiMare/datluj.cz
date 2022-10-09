import React, { useEffect } from "react";

export const CountDown = ({ countDownDate, timeToEnd, handleTimeOut }) => {
  useEffect(() => {
    const interval = setInterval(() => {
      let now = new Date().getTime();
      let distance = countDownDate - now;
      if (distance > 0) {
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);
        handleTimeOut(`${minutes}m ${seconds}s`);
      } else {
        clearInterval(interval);
        handleTimeOut("");
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [countDownDate]);

  return <div>{timeToEnd}</div>;
};
