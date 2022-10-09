import React, { useEffect, useState } from "react";
import "./style.css";

export const Wordbox = ({ word, onFinish, active, onMistake }) => {
  const [lettersLeft, setLettersLeft] = useState(word);
  const [mistake, setMistake] = useState(false);

  const handleKeyUp = (e) => {
    if (e.key === lettersLeft.charAt(0)) {
      setMistake(false);
      if (lettersLeft.length === 1) {
        setLettersLeft("");
        onFinish();
      } else {
        setLettersLeft(lettersLeft.slice(1));
      }
    } else {
      onMistake();
      setMistake(true);
    }
  };

  useEffect(() => {
    if (active) {
      document.addEventListener("keyup", handleKeyUp);
      return () => document.removeEventListener("keyup", handleKeyUp);
    }
  }, [lettersLeft, active]);

  return (
    <div className={mistake ? "wordbox wordbox--mistake" : "wordbox"}>
      {lettersLeft}
    </div>
  );
};
