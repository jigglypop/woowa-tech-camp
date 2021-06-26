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
    render: `
        <div>
            <button id="plus">+</button>
            <button id="minus">-</button>
            <h1>Count : ${count}</h1>
        </div>
    `,
  };
}
