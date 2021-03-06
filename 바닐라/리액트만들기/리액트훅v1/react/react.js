import getID from "./getID.js";
import { memoset } from "../index.js";
import { Closure } from "./Closure.js";
import { setClick } from "./methods.js";
import { getTag, isJsx } from "./tags.js";

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
  // 초기 렌더링
  function render(Component, target) {
    // 메모셋 가져오기
    // 루트 타겟 잡기
    $target = target;
    // 글로벌 컴포넌트 세팅, instance 만들기
    let El = null;
    let Jsx = null;
    // 있을 때
    global.Component = Component;
    const instance = global.Component();
    i = 0;
    global.instance = instance;

    Jsx = global.instance.jsx;
    El = document.createElement("div");
    El.id = getID();
    El.className = Component.name + "Outer" + " Outer";
    global.id = El.id;
    global.name = Component.name;
    global.className = El.className;
    // 키 생성
    const jsxs = isJsx(Jsx) || [];
    // 등록 컴포넌트 지우기
    for (let jsx of jsxs) {
      Jsx = Jsx.replace(jsx, "");
    }
    // 재귀함수 부분
    El.innerHTML = Jsx;
    const modules = memoset.getModules();
    for (let jsx of jsxs) {
      // 태그 가져와서 컴포넌트 모듈 찾기
      const tag = getTag(jsx);
      const _Component = modules[tag];
      // 클로저 잡기
      const [_react, _cb, _target] = new Closure(_Component, El);
      // 렌더링 되기 직전
      _react.render(_cb, El);
      // 재귀함수 후
      // 마운트 준비
      const _global = _react.global;
      const _id = _react.global.id;
      // 훅 메모리제이션
      memoset.setMemo(_id, _global);
    }
    target.appendChild(El);
    // 컴포넌트 jsx가 있을 경우
    return global;
  }

  // 리렌더링
  function rerender(Component, target, head) {
    // 메모셋 가져오기
    const _memo = memoset.getMemo();
    // 루트 타겟 잡기
    $target = target;
    if (target === head) {
      const child = [];
      const now = document.getElementById(global.id);
      for (let c of now.childNodes) {
        if (c.classList) {
          if (c.classList.contains("Outer")) {
            child.push(c.cloneNode(true));
          }
        }
      }
      // 글로벌 컴포넌트 세팅, instance 만들기
      let El = null;
      let Jsx = null;
      // 있을 때
      global.Component = Component;
      const instance = global.Component();
      i = 0;
      global.instance = instance;
      Jsx = global.instance.jsx;
      if (_memo[global.id]) {
        global = _memo[global.id];
        El = document.getElementById(global.id);
      } else {
        El = document.createElement("div");
        El.id = getID();
        El.className = Component.name + "Outer";
        global.id = El.id;
        global.name = Component.name;
        global.className = El.className;
      }
      // 키 생성
      const jsxs = isJsx(Jsx) || [];
      // 등록 컴포넌트 지우기
      for (let jsx of jsxs) {
        Jsx = Jsx.replace(jsx, "");
      }
      // 재귀함수 부분
      El.innerHTML = Jsx;
      const modules = memoset.getModules();
      for (let jsx of jsxs) {
        // 태그 가져와서 컴포넌트 모듈 찾기
        const tag = getTag(jsx);
        const _Component = modules[tag];
        // 클로저 잡기
        const [_react, _cb, _target] = new Closure(_Component, El);
        // 렌더링 되기 직전
        _react.rerender(_cb, El, head);
        // 재귀함수 후
        // 마운트 준비
        const _global = _react.global;
        const _id = _react.global.id;
        // 훅 메모리제이션
        memoset.setMemo(_id, _global);
      }
      if (_memo[global.id]) {
        setClick(global.id);
      } else {
        target.appendChild(El);
      }
      // 컴포넌트 jsx가 있을 경우
      for (let c of child) {
        El.appendChild(c);
      }
      resetClosure(target, now, Component, 0);
      return global;
    }
  }
  function resetClosure(root, now, Component, count) {
    if (count > 2) return;
    const memo = memoset.getMemo();
    const [_react, _cb, target] = new Closure(Component, root);
    // 있을 때
    // 루트 타겟 잡기
    const El = document.getElementById(now.id);
    _react.global = memo[now.id];
    // 메서드 초기화
    setClick(_react.global.id);
    for (let child of El.childNodes) {
      if (child.classList) {
        if (child.classList.contains("Outer")) {
          const name = memo[child.id].name.split(" ")[1];
          const _Component = memoset.getModules()[name];
          resetClosure(now, child, _Component, count + 1);
        }
      }
    }
  }
  // useState
  function useState(initialState) {
    const hooks = global.hooks;
    const _state = global.hooks[i] || initialState;
    hooks[i] = _state;
    const setState = (function () {
      let _i = i;
      let target = $target;
      return function (value) {
        global.hooks[_i] = value;
        rerender(global.Component, target, target);
      };
    })();
    i = i + 1;
    return [_state, setState];
  }

  // useEffect
  function useEffect(cb, value) {
    const hooks = global.hooks;
    let _value = hooks[i];
    let changed = true;
    if (_value) changed = value.some((d, i) => d !== _value[i]);
    if (changed) cb();
    hooks[i] = value;
    i++;
  }
  return { render, rerender, useState, useEffect, global, setHooks };
};

export default React;
