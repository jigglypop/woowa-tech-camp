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
    // 모듈
    setModules(Components) {
      for (let comp of Components) {
        modules[comp.name] = comp;
      }
      return modules;
    },
    getModules() {
      return modules;
    },
  };
};

export default MemoSet;
