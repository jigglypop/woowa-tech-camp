import Count from "./src/count.js";
import WordB from "./src/wordB.js";
import Word from "./src/word.js";
import { Component } from "./react.js";

console.log("---카운터 2개---");
const MemoSet = function () {
  let ComponentSet = {};
  let memo = {};
  let modules = {};
  return {
    setComponents(id, value) {
      ComponentSet[id] = value;
      return ComponentSet;
    },
    setMemo(id, value) {
      memo[id] = value;
      return memo;
    },
    setModule(Components) {
      for (let comp of Components) {
        modules[comp.name] = comp;
      }
      return modules;
    },
    ComponentSet,
    memo,
    modules,
  };
};
export const memoset = new MemoSet();
memoset.setModule([Word, WordB, Count]);

const root = document.getElementById("root");
const Counter = new Component(Count, root);

memoset.setComponents(Counter.id, Counter);
