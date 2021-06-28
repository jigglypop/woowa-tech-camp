import React from "../util/react.js";

export const card = new React(Card, document.querySelector("#root"));

function Card() {
  return {
    render: `
        <div>
            <h1>카드</h1>
        </div>
    `,
  };
}
