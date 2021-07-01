import getUUID from "./getUUID.js";

// 어떤 태그인지 판별
const isWhich = (dom) => {
  if (dom.match(/((<([a-zA-Z0-9\s=\"\$])*>).*?(<\/([a-zA-Z0-9\s=\"\$])*>))/g)) {
    return "lazy";
    // 닫는 태그
  } else if (dom.match(/<\/([a-zA-Z0-9\s=\"\$])*>/g)) {
    return "close";
    // 여는 태그
  } else if (dom.match(/<([a-zA-Z0-9\s=\"\$])*>/g)) {
    return "open";
    // 컴포넌트
  } else {
    return "component";
  }
};
// 돔트리 컴포넌트
// outer 인지
const isOuter = (dom) => {
  return dom.match(/Outer/g);
};
// id 추가하기
const makeId = (appdom) => {
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

// 태그네임 불러오기
const getTagName = (dom) => {
  return dom
    .match(/(<\/|<)([a-zA-Z0-9=\"\$])*/g)[0]
    .replace(/</g, "")
    .replace(/\//g, "");
};
// innerText 가져오기
const getInnerText = (dom) => {
  return dom.replace(
    /(<([a-zA-Z0-9\s=\"\$])*>)|(<\/([a-zA-Z0-9\s=\"\$])*>)/g,
    ""
  );
};

// attribute나 class, id 가져오기
export const getAttribute = (dom) => {
  const tempArrays = dom.match(/([a-zA-Z0-9\$])*="([a-zA-Z0-9\s\$])*"/g) || [];
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
        const front = dom.match(/<([a-zA-Z0-9\s=\"\$])*>/g)[0];
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
        idObj[tempObj.id[0]] = tempObj;
      }
    }
  }
  // 분절
  for (let [start, end] of splits) {
    const [_tempObj, _idObj] = parseArea(domArray.slice(start, end + 1));
    tempObj.child.push(_tempObj);
    idObj = { ...idObj, ..._idObj };
  }
  return [tempObj, idObj];
};
