export default function App() {
  const { useState, useEffect } = this;
  const [count, setCount] = useState(0);
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
      <Word/>
      <Word/>
    `,
  };
}
