const React = function () {
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
};

const react = new React();
const { useState, useEffect } = react;

function Counter() {
  const [count, setCount] = useState(0);
  const countSetter = () => {
    setCount(count + 1);
  };

  useEffect(() => {
    console.log("--시작---");
  }, []);

  return {
    countSetter,
    render() {
      console.log(`Count is: ${count}`);
    },
  };
}

const counter = react.render(Counter);
counter.instance.countSetter();

const react = new React();
const { useState, useEffect } = react;
function Word() {
  const [word, setWord] = useState("");
  const wordSetter = (word) => {
    setWord(word + "A");
  };

  useEffect(() => {
    console.log("--시작---");
  }, []);

  return {
    wordSetter,
    render() {
      console.log(`Word is: ${word}`);
    },
  };
}
const word = react2.render(Word);
word.instance.wordSetter();
