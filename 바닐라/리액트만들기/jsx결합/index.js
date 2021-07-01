import { Count } from "./src/count.js";
import React from "../react/react.js";
const { useState, useEffect, global } = React;
console.log(global);

const button = document.getElementById("button");
button.addEventListener("click", () => {
  Count.instance.countSetter();
});
