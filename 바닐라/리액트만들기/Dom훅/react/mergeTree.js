import getUUID from "./getUUID.js";
import { isWhich } from "./tags.js";

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
export const mergeTree = (instance) => {
  let appDoms = instance.App.doms;
  while (true) {
    let count = 0;
    let temp = [];
    for (let appdom of appDoms) {
      // id 추가하기
      if (isWhich(appdom) === "component") {
        count++;
        temp.push(
          ...instance[appdom.replace(/</g, "").replace(/\/>/g, "")].doms
        );
      } else {
        temp.push(appdom);
      }
    }
    if (count === 0) {
      // 끝났을때
      const _temp = [];
      // 컴포넌트에 고유 id
      for (let app of appDoms) {
        if (isOuter(app)) app = makeId(app);
        _temp.push(app);
      }
      appDoms = _temp;
      break;
    } else {
      appDoms = temp;
    }
  }
  return appDoms;
};
