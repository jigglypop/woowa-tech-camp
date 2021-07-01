import getID from "./getID.js";
import { Component as Comp } from "./react.js";
import Word from "./word.js";

const React = function () {
  let global = {
    hooks: [],
  };
  let i = 0;
  function render(Component) {
    global.Component = Component;
    const instance = Component();
    i = 0;

    global.instance = instance;
    if (!global.id) {
      global.id = getID();
    }
    const jsx = instance.jsx;
    let div = document.getElementById(global.id);
    // 처음 만들어줄때
    if (!div) {
      const root = document.getElementById("root");
      div = document.createElement("div");
      div.id = global.id;
      div.className = Component.name + "Outer";
      root.appendChild(div);
      // 자식 컴포넌트 달기
      div = document.getElementById(global.id);
      if (jsx.match(/<.*\$\/>/g)) {
        const temp = new Comp(Word);
        console.log(temp);
      }
    }
    div.innerHTML = jsx;
    // onClick버튼 찾기
    const buttons = div.querySelectorAll("button");
    if (buttons) {
      for (let button of buttons) {
        const onClick = button.dataset.onclick;
        if (onClick) {
          button.addEventListener("click", function () {
            instance[onClick]();
          });
        }
      }
    }
    return global;
  }

  function useState(initialState) {
    const hooks = global.hooks;
    const _state = global.hooks[i] || initialState;
    hooks[i] = _state;
    const setState = (function () {
      let _i = i;
      return function (value) {
        global.hooks[_i] = value;
        render(global.Component);
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
  return { render, useState, useEffect, global };
};

// 함수 내부에서 react 훅을 쓸 수 있게 바인딩
export const Component = function (cb) {
  const react = new React();
  const _cb = cb.bind(react);
  return react.render(_cb);
};

export default React;
