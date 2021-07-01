import React from "../util/react.js";
const { useEffect, useState } = React;

export default function Count() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log(`${count}변경`);
  }, [count]);
  return {
    onClickPlus: function () {
      setCount(count + 1);
    },
    onClickMinus: function () {
      setCount(count - 1);
    },
    render: `
      <button id="plus">+</button>
      <button id="minus">-</button>
      <h1 class="h1">Count : ${count}</h1>
    `,
  };
}
