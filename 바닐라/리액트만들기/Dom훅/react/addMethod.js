import { memoset } from "../index.js";

export const addOnClick = (div) => {
  // onClick버튼 찾기
  const buttons = div.querySelectorAll("button");
  if (buttons) {
    for (let button of buttons) {
      const onClick = button.dataset.onclick;
      if (onClick) {
        button.addEventListener("click", function () {
          if (typeof instance[onClick] === "function") instance[onClick]();
        });
      }
    }
  }
};

export const setMethod = (El, attr, value) => {
  El.setAttribute(attr, value);
};
