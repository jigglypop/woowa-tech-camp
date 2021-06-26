import React from "../util/react.js";
const { useEffect, useState } = React;

export default function Count() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("카운터 컴포넌트 시작");
  }, []);

  useEffect(() => {
    console.log(`카운터 증가`);
  }, [count]);

  return {
    onClickPlus: function () {
      setCount(count + 1);
    },
    onClickMinus: function () {
      setCount(count - 1);
    },
    css: `
      h1 {
        color: red;
      }
      button {
        color: red;
      }
    `,
    render: `
      <div class="Count">
        <button id="plus">+</button>
        <button id="minus">-</button>
        <h1 class="h1">Count : ${count}</h1>
        <h1 class="h1">Count : ${count}</h1>
        <h2 class="h2">안녕</h2>
        <h3>안녕2</h3>
      </div>
    `,
  };
}
