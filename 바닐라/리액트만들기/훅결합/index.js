import { Count } from "./count.js";
import { Word } from "./word.js";

console.log("메인 시작 새로");
Count.instance.countSetter();
Word.instance.wordSetter();
Count.instance.countSetter();

const root = document.querySelector("#root");
const button = document.getElementById("button");
button.addEventListener("click", () => {
  Count.instance.countSetter();
  Word.instance.wordSetter();
  //   console.log(`카운터 ${Counter.instance.count}, 워드 : ${Word.instance.word}`);
});
