import setModule from "./util/setModule.js";
import Count from "./src/components/Count.js";
import Word from "./src/components/Word.js";
import App from "./src/App.js";
import Main from "./src/components/Main.js";
import { mergeTree, parseArea } from "./util/parse.js";
import renderTree from "./util/renderTree.js";

// 함수를 탑재할 때 <Word/>처럼 대문자, 닫는태그
// 모듈 등록
const instance = setModule([Count, Word, App, Main]);
let appDoms = mergeTree(instance);
const dom = parseArea(appDoms);
console.log(dom);
// 트리 그리기
renderTree(document.querySelector("#root"), dom);
