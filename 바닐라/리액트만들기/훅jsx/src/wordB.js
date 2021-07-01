export default function WordB() {
  const { useState, useEffect } = this;
  const [wordB, setWordB] = useState("");

  useEffect(() => {
    console.log("워드B 시작");
  }, []);

  return {
    onWordB() {
      setWordB(wordB + "B");
    },
    jsx: `
      <h1>글자B: ${wordB}</h1>
      <button data-onClick="onWordB">글자 + B</button>
    `,
  };
}
