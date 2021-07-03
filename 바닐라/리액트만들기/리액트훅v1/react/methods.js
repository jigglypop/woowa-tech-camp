import { memoset } from "../index.js";

// onClick 미리 만들기
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
            method();
          });
        }
      }
    }
  }
};
