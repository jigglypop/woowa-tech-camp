const Scss = (root, text) => {
  const rootEl = document.querySelector(`${root}`);
  //   const items = text
  //     .replace(/(\r\n\t|\n|\r\t|\s)/g, "")
  //     .split(/;/g)
  //     .filter((item) => item !== "")
  //     .map((item) => item.split(/:/g));
  const texts = text.replace(/(\r\n\t|\n|\r\t|\s)/g, "");
  const textss = texts.match(/(\.|\#)[a-zA-Z\{\}\-\:\;]*\}/g);

  console.log(textss);
  const textArr = text
    .split(/\n/g)
    .map((item) => {
      //   if (item.indexOf(";")) {
      //     console.log(item);
      //   }
      return item.replace(/\s/g, "");
    })
    .filter((item) => item !== "");
  // .filter((item) => item !== "")
  // .map((item) => item.split(/:/g));
  //   for (let item of items) {
  //     const params = item[0];
  //     const order = item[1];
  //     rootEl.style[params] = order;
  //   }
};

Scss(
  ".a",
  `
    background-color: red;
    color: blue;
    border-radius:20px;
  `
);
Scss(
  ".b",
  `
    background-color: blue;
    &.aa {
        background-color: yellow;
    }
    .aa {
        background-color: yellow;
    }
    #bb {
        background-color: yellow;
    }
  `
);
