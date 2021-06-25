import { view } from "./view.js";
// import getTodos from "./getTodos.js";

const state = {
  //   todos: getTodos(),
  currentFilter: "All",
};

const main = document.querySelector(".todoapp");
window.requestAnimationFrame(() => {
  const newMain = view(main, state);
  main.replaceWith(newMain);
});
