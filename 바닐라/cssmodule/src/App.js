// import { card } from "./components/Card.js";
import Count from "./components/Count.js";
import React from "./util/react.js";

const App = () => {
  // render 내의 global 인스턴스
  const count = new React(Count, document.querySelector("#root"));

  // card.render();
};

export default App;
