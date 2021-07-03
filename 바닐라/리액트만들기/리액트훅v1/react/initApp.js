import { memoset } from "../index.js";
import Closure from "./Closure.js";
import { setClick } from "./methods.js";

const initApp = (App, root) => {
  const [_react, _cb, _] = new Closure(App, root);
  _react.render(_cb, root);

  let _memoset = memoset.getMemo();
  for (let _id of Object.keys(_memoset)) {
    setClick(_id);
  }
};
export default initApp;
