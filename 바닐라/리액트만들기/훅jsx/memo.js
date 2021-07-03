const MemoSet = function () {
  let memo = {};
  let modules = {};
  return {
    // 메모
    setMemo(id, value) {
      memo[id] = value;
      return memo;
    },
    getMemo() {
      return memo;
    },
    removeMemo(id) {
      delete memo[id];
      return memo;
    },
    // 모듈
    setModule(Components) {
      for (let comp of Components) {
        modules[comp.name] = comp;
      }
      return modules;
    },
    getModule() {
      return modules;
    },
  };
};

export default MemoSet;
