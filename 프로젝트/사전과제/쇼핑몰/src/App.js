import Card from "./components/Card.js";
import Count from "./components/Count.js";
import React from "./util/react.js";

const App = () => {
  // render 내의 global 인스턴스
  const root = document.querySelector("#root");
  React.init(Count, root);
  React.add(Card, root);
};

export default App;
