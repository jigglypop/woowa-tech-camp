import { memoset } from "./index.js";
import { Component as Comp } from "./Component.js";
import setModule from "./react/setModule.js";
import { parseArea } from "./react/parseArea.js";
import renderTree from "./react/renderTree.js";
import { mergeTree } from "./react/mergeTree.js";
import { isWhich } from "./react/tags.js";

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
  };
  let i = 0;
  // 루트 타겟
  let $target = null;
  // 훅 교체해주기
  function setHooks(_hooks) {
    global.hooks = _hooks;
  }
  // 렌더링
  function render(Component, target, _id) {
    // 루트 타겟 잡기
    $target = target;
    // 글로벌 컴포넌트 세팅, instance 만들기
    global.Component = Component;
    const instance = Component();
    i = 0;
    global.instance = instance;
    // jsx 파싱 부분
    let component_jsx_array = [];
    for (let params of Object.keys(memoset.modules)) {
      const modulename = memoset.modules[params].name;
      const component_temp = Component(memoset.modules[params]);
      const jsx = component_temp.jsx;
      component_jsx_array.push([jsx, modulename]);
    }

    const moduleObj = setModule(component_jsx_array);
    console.log(memoset.modules);
    console.log(moduleObj);
    return global;
  }

  function init(Component, target) {
    // 글로벌 컴포넌트 세팅, instance 만들기
    global.Component = Component;
    const instance = Component();
    i = 0;
    global.instance = instance;
    // jsx 파싱 부분
    let component_jsx_array = getComponentJsxArray();
    // 모듈 instance 세팅
    const moduleObj = setModule(component_jsx_array);
    const moduleinstance = memoset.setModuleInstance(moduleObj);
    // domArray 만들기
    const domArray = mergeTree(moduleinstance);
    // json 형식 트리 만들기
    const parsedTree = parseArea(domArray);
    // 트리 그리기
    renderTree(target, parsedTree);
  }

  function useState(initialState) {
    const hooks = global.hooks;
    const _state = global.hooks[i] || initialState;
    hooks[i] = _state;
    const setState = (function () {
      let _i = i;
      let target = $target;
      return function (value) {
        global.hooks[_i] = value;
        render(global.Component, target);
      };
    })();
    i = i + 1;
    return [_state, setState];
  }

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

// 함수 내부에서 react 훅을 쓸 수 있게 바인딩
export const Component = function (cb, $target, _value) {
  const react = new React();
  const _cb = cb.bind(react);
  // 원래 있던 클로저 복제
  if (_value) {
    react.setHooks(_value.hooks);
  }
  return [react.render, _cb, $target];
};

export default React;
