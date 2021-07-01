export default function Word() {
  const { useState, useEffect } = this;
  const [word, setWord] = useState(0);

  useEffect(() => {
    console.log("워드 시작");
  }, []);

  return {
    onWord() {
      setWord(word + "A");
    },
    jsx: `
      <h1>글자: ${word}</h1>
      <button data-onClick="onWord">글자 + A</button>
    `,
  };
}
