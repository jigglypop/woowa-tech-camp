// 어떤 태그인지 판별
export const openTag = '<([a-zA-Z0-9-\\s="$])*>';
export const closeTag = '</([a-zA-Z0-9-\\s="$])*>';
export const componentTag = '<[A-Z]([a-zA-Z0-9-\\s="$])*/>';
export const lazyTag = `(${openTag}).*?(${closeTag})`;
export const treeTag = `(${lazyTag})|(${openTag})|(${closeTag})|(${componentTag})`;

// 매칭함수
export const isMatch = (tag, text) => {
  const regex = new RegExp(tag, "g");
  return text.match(regex);
};
// lazy인지
export const isLazy = (text) => {
  const result = isMatch(lazyTag, text);
  return result;
};
// 여는 태그
export const isOpen = (text) => {
  const result = isMatch(openTag, text);
  return result;
};
// 닫는 태그
export const isClose = (text) => {
  const result = isMatch(closeTag, text);
  return result;
};
// 컴포넌트
export const isComponent = (text) => {
  const result = isMatch(componentTag, text);
  return result;
};
// 돔 가져오기
export const getDoms = (text) => {
  const result = isMatch(treeTag, text);
  return result;
};
// 어떤 태그인지 판별
export const isWhich = (dom) => {
  if (isLazy(dom)) {
    return "lazy";
    // 닫는 태그
  } else if (isClose(dom)) {
    return "close";
    // 여는 태그
  } else if (isOpen(dom)) {
    return "open";
    // 컴포넌트
  } else if (isComponent(dom)) {
    return "component";
  }
};
