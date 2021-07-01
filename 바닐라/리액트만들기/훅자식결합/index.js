import Count from "./count.js";
import { Component } from "./react.js";

console.log("---카운터 2개---");
let Components = {};
const root = document.getElementById("root");
const Counter1 = new Component(Count, root);

Components[Counter1.id] = Counter1;
