const React = (() => {
  let Global = {};
  let i = 0;

  function init(Component, root) {
    i = 0;
    const instance = Component();
    // root에 appendChild
    const outerDiv = document.createElement("div");
    outerDiv.className = Component.name;
    root.appendChild(outerDiv);
    // Global에 달기
    Global.Component = Component;
    Global.root = root;
    Global.instance = instance;
    Global.outerDiv = outerDiv;
    console.log(Global);
    // 렌더링
    render();
  }

  function add(Component, root) {
    i = 0;
    const outerDiv = document.createElement("div");
    outerDiv.className = Component.name;
    root.appendChild(outerDiv);
    // 렌더링
    render();
  }

  function render() {
    i = 0;
    const instance = Global.Component();
    // 렌더링
    const outerDiv = Global.outerDiv;
    outerDiv.innerHTML = "";
    outerDiv.innerHTML = instance.render;
  }

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
        Global.hooks[_i] = value;
        render();
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
    // some : values중 하나라도 true이면 true
    if (_values) changed = values.some((d, i) => d !== _values[i]);
    if (changed) cb();
    hooks[i] = values;
    i++;
  };
  return { init, add, useState, useEffect };
})();

export default React;
