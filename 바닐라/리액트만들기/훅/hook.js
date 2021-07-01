let React = (function () {
  let global = {
    hooks: [],
  };
  let i = 0;
  function render(Component) {
    global.Component = Component;
    const instance = Component();
    i = 0;
    instance.render();
    global.instance = instance;
    return global;
  }

  function useState(initialState) {
    const hooks = global.hooks;
    const currentState = global.hooks[i] || initialState;
    hooks[i] = currentState;
    const setState = (function () {
      let currenti = i;
      return function (value) {
        global.hooks[currenti] = value;
        render(global.Component);
      };
    })();
    i = i + 1;
    return [currentState, setState];
  }

  function useEffect(cb, deps) {
    const hooks = global.hooks;
    let oldDeps = hooks[i];
    let hasChanged = true;
    if (oldDeps) hasChanged = deps.some((d, i) => d !== oldDeps[i]);
    if (hasChanged) cb();
    hooks[i] = deps;
    i++;
  }
  return { render, useState, useEffect };
})();

function Component() {
  // Component is called at each re-render. index is reset to 0.
  const [count, setCount] = React.useState(0);
  // hooks: [0], currentIndex: 0,  Incremented Index: 1
  const [word, setWord] = React.useState("");
  // hooks: [0, ''], currentIndex: 1,  Incremented Index: 2
  const countSetter = () => {
    setCount(count + 1);
  };
  const wordSetter = (word) => {
    setWord(word);
  };
  React.useEffect(() => {
    console.log("---훅---");
  }, [count, word]);
  // hooks: [0, '', [0, '']], currentIndex: 2,  Incremented Index: 3
  React.useEffect(() => {
    console.log("--시작---");
  }, []);

  function render() {
    console.log(`Count is: ${count}, Word is: ${word}`);
  }
  // hooks: [0, '', [0, ''], [] ], currentIndex: 3,  Incremented Index: 4
  return { render, countSetter, wordSetter };
}

const global = React.render(Component); // hooks: [ 0, '', [ 0, '' ], [] ]
global.instance.countSetter(); // hooks: [ 1, '', [ 1, '' ], [] ]
global.instance.wordSetter("yooo"); // hooks: [ 3, 'yooo', [ 3, 'yooo' ], [] ]
