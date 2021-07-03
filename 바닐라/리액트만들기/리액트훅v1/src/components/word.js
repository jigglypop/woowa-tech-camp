export default function Word() {
  const { useState, useEffect } = this;
  const [wordA, setWordA] = useState("");

  return {
    onWordA() {
      setWordA(wordA + "A");
    },
    jsx: `
      <h1>글자A: ${wordA}</h1>
      <button data-onClick="onWordA">글자 + A</button>
      <WordB></WordB>
      <WordB></WordB>
    `,
  };
}
