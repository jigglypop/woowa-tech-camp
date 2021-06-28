const Scss = (root, text) => {
  const rootEls = document.querySelectorAll(`${root}`);
  // 파싱 부분
  // 공백 없애기
  const words = text.replace(/(\r\n\t|\n|\r\t|\s)/g, "");
  // 앞에 .이나 #으로 된 부분 매치
  const words_blank_match =
    words.match(
      /(\.[a-zA-Z0-9\s]*\{|\#[a-zA-Z0-9\s]*\{|[a-zA-Z0-9\s]*\{)(.*?)\}/g
    ) || [];

  const words_blank = words_blank_match.map((word) => {
    let count = word.match(/{/g || []).length;
    if (count > 1) {
      word += "}".repeat(count - 1);
    }
    return word;
  });

  let words_not_blank = words;
  for (let word of words_blank) {
    words_not_blank = words_not_blank.replace(word, "");
  }
  const params = words_not_blank
    .split(";")
    .filter((item) => item !== "")
    .map((item) => item.split(":").map((item) => item.replaceAll("@", " ")));

  for (let param of params) {
    for (let el of rootEls) {
      el.style[param[0]] = param[1];
    }
  }

  if (words_blank.length > 0) {
    for (let word of words_blank) {
      let temp_word = word.substring(word.indexOf("{") + 1, word.length - 1);
      let temp_root = word.substring(0, word.indexOf("{"));
      // 재귀함수로 자식 컴포넌트
      Scss(temp_root, temp_word);
    }
  }
};

export default Scss;
