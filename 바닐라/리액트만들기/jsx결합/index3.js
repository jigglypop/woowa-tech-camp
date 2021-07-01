import setModule from "./react/setModule.js";
import Count from "./src/components/Count.js";
import App, { app } from "./src/App.js";
import Main from "./src/components/Main.js";
import { mergeTree, parseArea } from "./react/parse.js";
import renderTree from "./react/renderTree.js";

// 함수를 탑재할 때 <Word/>처럼 대문자, 닫는태그
// 모듈 등록
const instance = setModule([Count, App, Main]);
// dom 모양으로 분절
let appDoms = mergeTree(instance);
// 트리 파싱
const [dom, idDom] = parseArea(appDoms);
console.log(app.render(App));
// 트리 그리기
renderTree(document.querySelector("#root"), dom);
// 메서드
// 렌더 후 메서드 추가
const renders = app.render(App);
renders.onClick();
console.log(renders);
