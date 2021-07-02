import { closeTag, isOpen, isWhich, openTag } from "./tags.js";

// 돔트리 컴포넌트
// outer 인지
const isOuter = (dom) => {
  return dom.match(/.*(Outer)/g);
};

// 태그네임 불러오기
const getTagName = (dom) => {
  return dom
    .match(/(<\/|<)([a-zA-Z0-9=\"\$])*/g)[0]
    .replace(/</g, "")
    .replace(/\//g, "");
};
// innerText 가져오기
const getInnerText = (dom) => {
  const tag = `(${closeTag})|(${openTag})`;
  const regex = new RegExp(tag, "g");
  return dom.replace(regex, "");
};

// attribute나 class, id 가져오기
export const getAttribute = (dom) => {
  const tempArrays =
    dom.match(/([a-zA-Z0-9\-\$])*="([a-zA-Z0-9\-\s\$])*"/g) || [];
  const arrays = tempArrays.map((item) => item.split("="));
  return arrays.map((item) => [
    item[0],
    item[1].replace(/"|'/g, "").split(" "),
  ]);
};
// 파싱
export const parseArea = (domArray) => {
  let tempObj = {};
  let idObj = {};
  // 처음 태그, 뒷태그 제거, 태그 등록
  const tagtemp = domArray.shift();
  for (let atr of getAttribute(tagtemp)) {
    tempObj[atr[0]] = atr[1];
  }
  const tag = getTagName(tagtemp);
  domArray.pop();
  tempObj.tag = tag;
  tempObj.child = [];

  // 돔트리 돌면서 큰 태그 분절
  let splits = [];
  let start = 0;
  let count = 0;
  for (let i = 0; i < domArray.length; i++) {
    const dom = domArray[i];
    const which = isWhich(dom);
    if (which === "open") {
      if (count === 0) {
        start = i;
      }
      count++;
    } else if (which === "close") {
      if (count === 1) {
        splits.push([start, i]);
      }
      count--;
    } else if (which === "lazy") {
      // count === 0이면 같은 라인이므로 push
      if (count === 0) {
        const innerText = getInnerText(dom);
        const _tag = getTagName(dom);
        let obj = {
          tag: _tag,
          innerText: innerText,
        };
        // 앞태그
        const front = isOpen(dom)[0];
        for (let atr of getAttribute(front)) {
          obj[atr[0]] = atr[1];
        }
        tempObj.child.push(obj);
      }
    }
  }
  // idObj 추가
  if (tempObj.class) {
    for (let c of tempObj.class) {
      if (isOuter(c)) {
        idObj[tempObj.id[0]] = Object.assign(tempObj);
      }
    }
  }
  // 분절
  for (let [start, end] of splits) {
    const [_tempObj, _idObj] = parseArea(domArray.slice(start, end + 1));
    tempObj.child.push(_tempObj);
    idObj = Object.assign(idObj, _idObj);
  }
  return [tempObj, idObj];
};
