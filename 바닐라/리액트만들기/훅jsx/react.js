import getID from "./getID.js";
import { memoset } from "./index.js";
import { Component as _Component } from "./Components.js";

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
    // id가 없으면 세팅
    if (!global.id) global.id = getID();
    let jsx = instance.jsx;
    let div = document.createElement("div");
    div.id = global.id;
    div.className = Component.name + "Outer";
    // root에 달기
    target.appendChild(div);
    // 자식 컴포넌트 달기
    div = document.getElementById(global.id);
    // jsx태그 기초 세팅
    let jsxs = [];
    // const ComponentJsx = jsx.match(/(<.*-([0-9]*)>)(<\/.*-([0-9])*>)/g);
    // if (ComponentJsx) {
    //   for (let jsxname of ComponentJsx) {
    //     // jsx 리플레이스
    //     const memo = memoset.getMemo();
    //     const replacename = jsxname.split(">")[0].replace(/</g, "");
    //     if (!memo[`${replacename}${_id}`]) {
    //       const newJsx = `<div id="${global.id}" class="${replacename}" ></div>`;
    //       jsx = jsx.replace(jsxname, newJsx);
    //       jsxs.push(replacename);
    //     }
    //   }
    // }
    // 처음 만드는 div
    div.innerHTML = jsx;
    // 컴포넌트 jsx가 있을 경우
    return global;
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
  return { render, useState, useEffect, global, setHooks };
};

export default React;
