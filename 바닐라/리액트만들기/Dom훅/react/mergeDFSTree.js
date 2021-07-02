import getUUID from "./getUUID.js";
import { isComponent, isWhich } from "./tags.js";

// 돔트리 컴포넌트
// outer 인지
export const isOuter = (dom) => {
  return dom.match(/.*(Outer)/g);
};
// id 추가하기
export const makeId = (appdom) => {
  const id = getUUID();
  const front = appdom.split(">")[0];
  const middle = ` id="${id}" `;
  return front + middle + ">";
};

// 컴포넌트를 while문을 돌면서 합쳐줌
export const mergeDFSTree = (DFSJsx_Index, depths) => {
  // App의 dom부터
  let appDoms = DFSJsx_Index[0].doms;
  for (let i = 1; i < depths.length; i++) {
    let temp = [];
    let floor = [...depths[i]];

    for (let dom of appDoms) {
      if (isComponent(dom)) {
        let idx = floor.shift();
        temp.push(...DFSJsx_Index[idx].doms);
      } else {
        temp.push(dom);
      }
    }
    appDoms = temp;
  }
  return appDoms;
};
