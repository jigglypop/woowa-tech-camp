const texts = '<Count key="123dfdf" />';
const keyTag = 'key=".*"';

// 매칭함수
const isMatch = (tag, text) => {
  const regex = new RegExp(tag, "g");
  return text.match(regex);
};

const isKey = (text) => {
  return isMatch(keyTag, text);
};
