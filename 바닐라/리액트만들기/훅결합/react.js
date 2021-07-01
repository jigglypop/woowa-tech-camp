const React = function () {
  let global = {
    hooks: [],
  };
  let i = 0;
  function render(Component) {
    global.Component = Component;
    const instance = Component();
    i = 0;
    // 텍스트
    const div = document.getElementById(Component.name);
    div.innerText = instance.render;
    global.instance = instance;
    return global;
  }

  function useState(state) {
    const hooks = global.hooks;
    const _state = global.hooks[i] || state;
    hooks[i] = _state;
    // setState
    const setState = (function () {
      // 상위 i를 가져와서 클로저로 잡기
      let _i = i;
      return function (value) {
        global.hooks[_i] = value;
        render(global.Component);
      };
    })();
    // 해당 useState 등록
    i++;
    return [_state, setState];
  }

  function useEffect(cb, value) {
    const hooks = global.hooks;
    let _value = hooks[i];
    let changed = true;
    if (_value) changed = value.some((d, i) => d !== _value[i]);
    if (changed) cb();
    hooks[i] = value;
    // 해당 useEffect 등록
    i++;
  }
  return { render, useState, useEffect };
};

export default React;
