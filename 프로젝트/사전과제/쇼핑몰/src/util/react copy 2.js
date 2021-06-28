import Scss from "./scss.js";

const React = (() => {
  let Global = {};
  let i = 0;

  const append = () => {
    // css 적용, root에 달기
    const outerDiv = document.createElement("div");
    outerDiv.className = Global.Component.name;
    Global.root.appendChild(outerDiv);
    Global.outerDiv = outerDiv;
  };

  const rendering = (instance) => {
    // 렌더링
    const outerDiv = Global.outerDiv;
    outerDiv.innerHTML = "";
    outerDiv.innerHTML = instance.render;
  };

  const setMethod = (instance) => {
    const methods = Object.keys(instance);

    for (let method of methods) {
      // onClick 메서드
      if (method.match(/on(C|c)lick*/g)) {
        const name = method.replace(/on(C|c)lick*/g, "").toLowerCase();
        const button = document.querySelector(`#${name}`);
        button.addEventListener("click", () => {
          instance[method]();
        });
      }
    }
  };

  // 초기셋
  const Component = (Component, root) => {
    window[Component.name] = {};
    Global = window[Component.name];

    Global.Component = Component;
    Global.root = root;
    i = 0;
    const instance = Component();
    Global.instance = instance;
    // root에 appendChild
    append(Component);
    rendering(instance);
    setMethod(instance);
    Scss(`.${Component.name}`, instance.css);
  };

  const render = (Component, root) => {
    Global.root = root;
    i = 0;
    const instance = Component();
    // 렌더링
    rendering(instance);
    // 메서드
    setMethod(instance);
    Scss(`.${Component.name}`, instance.css);
  };

  const useState = (state) => {
    // Global 객체 내 hooks 모음 초기화
    if (!Global.hooks) Global.hooks = [];
    // Global 내의 hooks 가져와서 있으면 쓰고 없으면 state 등록
    const hooks = Global.hooks;
    const _state = Global.hooks[i] || state;
    hooks[i] = _state;
    // setState
    const setState = (() => {
      // 클로저 내부에 해당 state의 i를 가져와 내부 클로저로 선언
      let _i = i;
      return (value) => {
        // 바꿔주고 렌더링
        console.log(Global, window);
        Global.hooks[_i] = value;
        render(Global.Component, Global.root);
      };
    })();
    // 인덱스 증가 후 리턴
    i++;
    return [_state, setState];
  };
  // useEffect
  const useEffect = (cb, values) => {
    const hooks = Global.hooks;
    let _values = hooks[i];
    let changed = true;

    if (_values) {
      // some : values중 하나라도 true이면 true
      changed = values.some((d, i) => d !== _values[i]);
    }
    if (changed) cb();
    hooks[i] = values;
    i++;
  };
  return { Component, useState, useEffect };
})();

export default React;
