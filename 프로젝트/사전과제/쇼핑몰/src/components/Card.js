import React from "../util/react.js";
const { useEffect, useState } = React;

export default function Card() {
  return {
    css: `
      .h2 {
        color: blue;
      }
    `,
    render: `
      <h1 class="h2">카드</h1>
    `,
  };
}
