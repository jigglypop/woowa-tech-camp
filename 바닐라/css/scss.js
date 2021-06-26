const Scss = (root, text) => {
  const rootEl = document.querySelector(`${root}`);
  const words = text.replace(/(\r\n\t|\n|\r\t|\s)/g, "");
  const words_blank_match =
    words.match(/(\.[a-zA-Z\s]*\{|\#[a-zA-Z\s]*\{)(.*?)\}/g) || [];

  const words_blank = words_blank_match.map((word) => {
    count = word.match(/{/g || []).length;
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
    rootEl.style[param[0]] = param[1];
  }

  if (words_blank.length > 0) {
    for (let word of words_blank) {
      let temp_word = word.substring(word.indexOf("{") + 1, word.length - 1);
      let temp_root = word.substring(0, word.indexOf("{"));
      Scss(temp_root, temp_word);
    }
  }
};

Scss(
  ".root",
  `
    border: 4px@solid@green;
    .a {
        background-color: red;
        .aa {
            background-color: green;
            .aaa {
                background-color: yellow;
            }
        }
    }
    .b {
        background-color: black;
    }
    .c {
        background-color: yellow;
    }
    color: blue;
  `
);
