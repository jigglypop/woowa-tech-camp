export default class React {
  constructor(Component, root) {
    this.i = 0;
    this.Component = Component;
    // 아우터 div
    const $outer = document.createElement("div");
    $outer.className = Component.name;
    this.$outer = $outer;
    // root에 달기
    root.appendChild($outer);
    // 렌더링
    this.render();
  }

  useState(state) {
    if (!this.hooks) this.hooks = [];
    const hooks = this.hooks;
    const _state = hooks[this.i] || state;
    hooks[this.i] = _state;
    const setState = (() => {
      let _i = this.i;
      return (value) => {
        this.hooks[_i] = value;
        this.render(this.Component, this.root);
      };
    })();
    this.i++;
    return [_state, setState];
  }

  useEffect(cb, values) {
    const hooks = this.hooks;
    let _values = hooks[this.i];
    let changed = true;
    // some : values중 하나라도 true이면 true
    if (_values) changed = values.some((d, i) => d !== _values[i]);
    if (changed) cb();
    hooks[this.i] = values;
    this.i++;
  }

  render() {
    this.i = 0;
    const instance = this.Component();
    // 렌더링
    this.$outer.innerHTML = instance.render;
    // 메서드
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
  }
}
