import React from "./react.js";
const react = new React();
const { useState, useEffect } = react;

function count() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("--시작---");
  }, []);

  const countSetter = () => {
    setCount(count + 1);
  };

  return {
    // setState와 쓰는 메서드를 지정해줘서 리턴해야함
    count,
    countSetter,
    render: `카운트: ${count}`,
  };
}

export const Count = react.render(count);
