import Count from "./src/components/count.js";
import WordB from "./src/components/wordB.js";
import Word from "./src/components/word.js";
import { Closure } from "./Closure.js";
import App from "./src/App.js";
import MemoSet from "./memo.js";

export const memoset = new MemoSet();
// 앱 등록해줘야 함
memoset.setModules([App, Word, WordB, Count]);
// 렌더링
const root = document.getElementById("root");
const [_react, _cb, target] = new Closure(App, root);
_react.render(_cb, root);

export const setClick = (_id) => {
  const _memoset = memoset.getMemo();
  const Outer = document.getElementById(_id);
  if (Outer) {
    const children = Outer.childNodes;
    const _global = _memoset[_id];
    for (let button of children) {
      if (button.nodeName === "BUTTON") {
        const onClick = button.dataset.onclick;
        if (onClick) {
          const methods = _global.instance;
          const method = methods[onClick];
          button.addEventListener("click", () => {
            console.log("버튼");
            method();
          });
        }
      }
    }
  }
};

let _memoset = memoset.getMemo();
for (let _id of Object.keys(_memoset)) {
  setClick(_id);
}
console.log(_memoset);
