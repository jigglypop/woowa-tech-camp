import React from "../react/react.js";

const react = new React();
const { useState, useEffect, global } = react;

const count = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("카운트변경");
  }, [count]);

  return {
    countSetter() {
      setCount(count + 1);
    },
    render: `<h1>카운트: ${count}</h1>`,
  };
};
console.log(global);
export const Count = react.render(count);
