const MemoSet = function () {
  let ComponentSet = {};
  let memo = {};
  let modules = {};
  return {
    setComponents(id, value) {
      ComponentSet[id] = value;
      return ComponentSet;
    },
    setMemo(id, value) {
      memo[id] = value;
      return memo;
    },
    removeMemo(id) {
      delete memo[id];
      return memo;
    },
    setModule(Components) {
      for (let comp of Components) {
        modules[comp.name] = comp;
      }
      return modules;
    },
    ComponentSet,
    memo,
    modules,
  };
};

export default MemoSet;
