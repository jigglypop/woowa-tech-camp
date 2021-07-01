import React from "../util/react.js";

// export const count = new React(Count, document.querySelector("#root"));

const Count = () => {
  const [counts, setCount] = count.useState(0);

  // count.useEffect(() => {
  //   console.log("카운터 컴포넌트 시작");
  // }, []);

  // count.useEffect(() => {
  //   console.log(`카운터 증가`);
  // }, [counts]);

  // return {
  //   onClickPlus: function () {
  //     setCount(counts + 1);
  //   },
  //   onClickMinus: function () {
  //     setCount(counts - 1);
  //   },
  //   render: `
  //       <div>
  //         <button id="plus">+</button>
  //         <button id="minus">-</button>
  //         <h1>Count : ${counts}</h1>
  //       </div>
  //   `,
  // };
};
export default Count;
