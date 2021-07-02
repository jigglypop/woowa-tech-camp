import { memoset } from "./index.js";
import { Component as Comp } from "./Component.js";
import setModule from "./react/setModule.js";
import { parseArea } from "./react/parseArea.js";
import renderTree from "./react/renderTree.js";
import { mergeTree } from "./react/mergeTree.js";
import { DFS } from "./react/DFS.js";
import { mergeDFSTree } from "./react/mergeDFSTree.js";

// getComponentJsxArray
const getComponentJsxArray = () => {
  let component_jsx_array = [];
  const modules = memoset.getModule();
  for (let params of Object.keys(modules)) {
    const [_, cb, __, ___] = Comp(modules[params], null, null);
    const jsx = cb().jsx;
    component_jsx_array.push([jsx, params]);
  }
  return component_jsx_array;
};

const React = function () {
  let global = {
    hooks: [],
    child: [],
  };
  let i = 0;
  // 루트 타겟
  let $target = null;
  // 훅 교체해주기
  function setHooks(_hooks) {
    global.hooks = _hooks;
  }
  // 렌더링
  // function render(Component, target, _id) {
  //   // 루트 타겟 잡기
  //   $target = target;
  //   // 글로벌 컴포넌트 세팅, instance 만들기
  //   global.Component = Component;
  //   const instance = Component();
  //   i = 0;
  //   global.instance = instance;
  //   // jsx 파싱 부분
  //   let component_jsx_array = [];
  //   for (let params of Object.keys(memoset.modules)) {
  //     const modulename = memoset.modules[params].name;
  //     const component_temp = Component(memoset.modules[params]);
  //     const jsx = component_temp.jsx;
  //     component_jsx_array.push([jsx, modulename]);
  //   }

  //   const moduleObj = setModule(component_jsx_array);
  //   // console.log(memoset.modules);
  //   // console.log(moduleObj);
  //   return global;
  // }
  function render(Component, root) {
    // jsx 파싱 부분
    // 클로저 인스턴스 세팅
    console.log(root);
    global.Component = Component;
    const instance = Component();
    i = 0;
    global.instance = instance;
    // 인스턴스
    let component_jsx_array = getComponentJsxArray();
    // 모듈 instance 세팅
    const moduleObj = setModule(component_jsx_array);
    // 메서드만 모으기
    const moduleinstance = memoset.setModuleInstance(moduleObj);
    // domArray 만들기
    const domArray = mergeTree(moduleinstance);
    // json 형식 트리 만들기
    const [parsedTree, namedTree] = parseArea(domArray);
    // 트리 그리기
    console.log(global.root, parsedTree);
    renderTree(global.root, parsedTree);

    return global;
  }
  function init(Component, root) {
    // jsx 파싱 부분
    // 클로저 인스턴스 세팅
    global.Component = Component;
    const instance = Component();
    i = 0;
    global.instance = instance;
    global.root = root;
    // 트리 그리기 부분

    // 제외
    const component_jsx_array = getComponentJsxArray();
    // 제외

    // dfs로 새로운 jsx배열 만들기
    const [DFSJsx_Index, DFSJsx_Id, DFSjsxIndexMap, depths] =
      DFS(component_jsx_array);
    // console.log([DFSJsx_Index, DFSJsx_Id, DFSjsxIndexMap, depths]);
    // // 모듈 instance 세팅
    // const moduleObj = setModule(component_jsx_array);
    // const moduleinstance = memoset.setModuleInstance(moduleObj);
    // // 메서드만 모으고 html 태그형태로 분절
    // const domArray = mergeTree(moduleinstance);
    const jsxArray = mergeDFSTree(DFSJsx_Index, depths);
    // console.log(moduleinstance, domArray);

    // json 형식 트리 만들기
    const [parsedTree, namedTree] = parseArea(jsxArray);
    // 트리 그리기
    renderTree(root, parsedTree);
    // onClick버튼 찾기
    const buttons = root.querySelectorAll("button");
    if (buttons) {
      for (let button of buttons) {
        const onClick = button.dataset.onclick;
        if (onClick) {
          button.addEventListener("click", function () {
            if (typeof instance[onClick] === "function") {
              instance[onClick]();
            }
          });
        }
      }
    }
    // console.log(global.hooks);
    return global;
  }

  // useState 세팅
  function useState(initialState) {
    const hooks = global.hooks;
    const _state = global.hooks[i] || initialState;
    hooks[i] = _state;
    const setState = (function () {
      let _i = i;
      // let target = $target;
      return function (value) {
        global.hooks[_i] = value;
        // console.log(global.hooks);
        init(global.Component, global.root);
      };
    })();
    i = i + 1;
    return [_state, setState];
  }

  // useEffect 세팅
  function useEffect(cb, value) {
    const hooks = global.hooks;
    let _value = hooks[i];
    let changed = true;
    if (_value) changed = value.some((d, i) => d !== _value[i]);
    if (changed) cb();
    hooks[i] = value;
    i++;
  }
  return { render, useState, useEffect, global, setHooks, init };
};

export default React;
