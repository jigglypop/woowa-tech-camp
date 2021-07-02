// 돔트리 만들기
// export const getDoms = (tree) => {
//   return tree.match(
//     /((<([a-zA-Z0-9\-\s=\"\$])*>).*?(<\/([a-zA-Z0-9\-\s=\"\$])*>))|(<([a-zA-Z0-9\-\s=\"\$])*>)|(<\/([a-zA-Z0-9\-\s=\"\$])*>)|(<[A-Z]([a-zA-Z0-9\-\s=\"\$])*\/>)/g
//   );
// };

import { getDoms } from "./tags.js";

// 모듈 등록
const setModule = (modules) => {
  let instance = {};
  for (let [jsx, modulename] of modules) {
    let div = `
        <div class="${modulename}Outer" >
          ___change___
        </div>
      `;
    div = div.replace("___change___", jsx);
    const doms = getDoms(div);
    instance[modulename] = {
      root: modulename + "Outer",
      render: div,
      doms: doms,
    };
  }
  return instance;
};

export default setModule;
