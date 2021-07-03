// jsx 인지
export const isJsx = (text) => {
  const openTag = "(<.*>)";
  const closeTag = "(</.*>)";
  const jsxTag = `${openTag}${closeTag}`;
  const regex = new RegExp(jsxTag, "g");
  return text.match(regex);
};
// 태그 찾기
export const getTag = (text) => {
  const componentTag = "[A-Z]([a-zA-Z])*";
  const regex = new RegExp(componentTag, "g");
  return text.match(regex) ? text.match(regex)[0] : null;
};
