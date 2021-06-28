import React from "../util/react.js";
const { useEffect, useState } = React;

export default function Count() {
  const [count, setCount] = useState(0);
  const [word, setWord] = useState("");

  return {
    onClickPlus: function () {
      setCount(count + 1);
    },
    onClickMinus: function () {
      setCount(count - 1);
    },
    css: `
      .h1 {
        color: red;
      }
    `,
    render: `
      <button id="plus">+</button>
      <button id="minus">-</button>
      <h1 class="h1">Count : ${count}</h1>
    `,
  };
}
