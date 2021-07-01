import React from "../react/react.js";
const react = new React();
const { useState, useEffect } = react;

const word = () => {
  const [word, setWord] = useState("");

  useEffect(() => {
    console.log("글자변경");
  }, [word]);

  return {
    wordSetter() {
      setWord(word + "A");
    },
    render: `<h1>글자: ${word}</h1>`,
  };
};
export const Word = react.render(word, document.querySelector("#root"));
