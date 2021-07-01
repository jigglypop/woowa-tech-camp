import React from "./react.js";
const react = new React();
const { useState, useEffect } = react;

function word() {
  const [word, setWord] = useState("");

  useEffect(() => {
    console.log("--시작---");
  }, []);

  const wordSetter = () => {
    setWord(word + "A");
  };
  return {
    word,
    wordSetter,
    render: `글자: ${word}`,
  };
}
export const Word = react.render(word);
