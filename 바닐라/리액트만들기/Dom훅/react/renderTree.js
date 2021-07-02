import { Component } from "../Component.js";
import { memoset } from "../index.js";
import { setMethod } from "./addMethod.js";
import { isOuter } from "./mergeDFSTree.js";

const renderTree = (root, tree, global, id) => {
  // 불변성 유지
  const _tree = Object.assign(tree);
  // 머리태그
  const El = document.createElement(`${tree.tag}`);
  let Outer = "";
  let Id = "";
  delete _tree.tag;
  // id 설정
  if ("id" in _tree) {
    let ids = _tree["id"];
    for (let id of ids) {
      El.id = id;
      Id = id;
    }
    delete _tree.id;
  }
  // 클래스 달기
  if ("class" in _tree) {
    let classes = _tree["class"];
    for (let classname of classes) {
      El.classList.add(classname);
      if (isOuter(classname)) {
        Outer = classname;
      }
    }
    delete _tree.class;
  }
  // innerText
  if ("innerText" in _tree) {
    let innerText = _tree["innerText"];
    El.innerText = innerText;
    delete _tree.innerText;
  }
  // child 세팅
  let _child = [];
  if ("child" in _tree) {
    _child = [..._tree.child];
    delete _tree.child;
  }
  // 나머지 attribute 세팅
  for (let attr of Object.keys(_tree)) {
    let value = _tree[attr];
    // 지정 어트리뷰트, 메서드 달기
    setMethod(El, attr, value);
  }
  if (Object.keys(_child).length !== 0) {
    for (let item of _child) {
      const [el, outer, global, _id] = renderTree(El, item);
      El.appendChild(el);
      // 클로저 생산하기
      if (outer !== "") {
        const FuncName = outer.replace("Outer", "");
        const Func = memoset.getModule()[FuncName];
        const [_, _cb, __, _react] = new Component(Func, El, null);
        const _global = _react.setGlobal(_cb, El, _id);

        const JsxByid = memoset.getJsxById();
        const hook = memoset.getHooksById(_id);
        // 훅 메모리제이션
        if (hook === undefined) {
          memoset.setHooks(_id, _global);
        }
      }
    }
  }
  root.appendChild(El);
  return [El, Outer, global, Id];
};

export default renderTree;
