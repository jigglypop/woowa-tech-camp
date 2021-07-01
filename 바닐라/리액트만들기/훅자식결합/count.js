export default function Count() {
  const { useState, useEffect } = this;
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("카운트 시작");
  }, []);

  return {
    onPlus() {
      setCount(count + 1);
    },
    onMinus() {
      setCount(count - 1);
    },
    jsx: `
      <h1>카운트: ${count}</h1>
      <button data-onClick="onPlus">증가</button>
      <button data-onClick="onMinus">감소</button>
      <Word_1></Word_1>
      <Word_2></Word_2>
    `,
  };
}
