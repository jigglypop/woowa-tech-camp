import Count from "./src/components/count.js";
import WordB from "./src/components/wordB.js";
import Word from "./src/components/word.js";
import { Component } from "./Components.js";
import App from "./src/App.js";
import MemoSet from "./memo.js";

export const memoset = new MemoSet();
// 앱 등록해줘야 함
memoset.setModule([App, Word, WordB, Count]);
// 렌더링
const root = document.getElementById("root");
const [_react, _cb, target] = new Component(App, root);
_react.render(_cb, target);
