import React from "../react/react.js";
const react = new React();
const { useState, useEffect } = react;

const App = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("카운트변경");
  }, [count]);

  return {
    onClick() {
      setCount(count + 1);
    },
    render: `
        <div class="box close" style="hidden">
            <h1>앱의 카운트: ${count}</h1>
            <button id="button">버튼</button>
            <h2>메인목록</h2>
            <Main/>
        </div>`,
  };
};
export const app = react;
export default App;
