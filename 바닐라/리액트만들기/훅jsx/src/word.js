export default function Word() {
  const { useState, useEffect } = this;
  const [wordA, setWordA] = useState("");

  useEffect(() => {
    console.log("워드 시작");
  }, []);

  return {
    onWordA() {
      setWordA(wordA + "A");
    },
    jsx: `
      <h1>글자A: ${wordA}</h1>
      <button data-onClick="onWordA">글자 + A</button>
      <WordB_1></WordB_1>
      <WordB_2></WordB_2>
    `,
  };
}
