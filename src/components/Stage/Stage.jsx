import React, { useState } from "react";
import wordList from "../../word-list";
import { Wordbox } from "../Wordbox/Wordbox";
import "./style.css";

const generateWord = (size) => {
  const sizeIndex =
    size === undefined ? Math.floor(Math.random() * wordList.length) : size - 3;

  if (sizeIndex < 0 || sizeIndex >= wordList.length) {
    return null;
  }

  const words = wordList[sizeIndex];
  const wordIndex = Math.floor(Math.random() * words.length);
  return words[wordIndex];
};

export const Stage = ({ onCountDown, timeToEnd }) => {
  const [wordLength, setWordLength] = useState(3);
  const [words, setWords] = useState([
    generateWord(wordLength),
    generateWord(wordLength),
    generateWord(wordLength),
  ]);

  const [mistakes, setMistakes] = useState(0);
  const [writtenWords, setWrittenWords] = useState(0);
  const [endGame, setEndGame] = useState(false);
  const [level, setLevel] = useState(1);

  const handleFinish = () => {
    setWrittenWords((prev) => prev + 1);
    setWords((prev) => [...prev.slice(1), generateWord(wordLength)]);
    if (!timeToEnd) {
      if (writtenWords >= 20) {
        setWordLength((prev) => prev + 1);
        setWords([
          generateWord(wordLength + 1),
          generateWord(wordLength + 1),
          generateWord(wordLength + 1),
        ]);
        setWrittenWords(0);
        setLevel((prev) => prev + 1);
        onCountDown(new Date(new Date().getTime() + 1 * 60000));
      } else {
        setEndGame(true);
        setWords([]);
      }
    }
  };

  const handleMistake = () => {
    setMistakes((prev) => prev + 1);
  };

  const handleStart = () => {
    setWordLength(3);
    setWords([generateWord(3), generateWord(3), generateWord(3)]);
    setWrittenWords(0);
    setMistakes(0);
    setEndGame(false);
    setLevel(1);
    onCountDown(new Date(new Date().getTime() + 1 * 60000));
  };

  return (
    <>
      <h2>LEVEL: {level}</h2>
      <div className="stage">
        <div className="stage__mistakes">Chyb: {mistakes}</div>
        <div className="stage__mistakes">
          Počet napsaných slov: {writtenWords}
        </div>
        <div className="stage__words">
          {words.map((word) => (
            <Wordbox
              word={word}
              key={word}
              onFinish={handleFinish}
              active={words.indexOf(word) === 0}
              onMistake={handleMistake}
            />
          ))}
        </div>
        <div className="stage__words">
          {endGame && (
            <button className="wordbox" onClick={handleStart}>
              Konec hry, začni znovu
            </button>
          )}
        </div>
      </div>
    </>
  );
};
