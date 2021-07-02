const MemoSet = function () {
  let ComponentSet = {};
  let memo = {};
  let modules = {};
  let moduleinstance = {};
  return {
    setComponents(id, value) {
      ComponentSet[id] = value;
      return ComponentSet;
    },
    // 메모리제이션
    setMemo(id, value) {
      memo[id] = value;
      return memo;
    },
    removeMemo(id) {
      delete memo[id];
      return memo;
    },
    getMemo() {
      return memo;
    },
    // 함수모듈
    setModule(Components) {
      for (let comp of Components) {
        modules[comp.name] = comp;
      }
      return modules;
    },
    getModule() {
      return modules;
    },
    // 모듈 인스턴스
    setModuleInstance(moduleObj) {
      for (let params of Object.keys(moduleObj)) {
        moduleinstance[params] = moduleObj[params];
      }
      return moduleinstance;
    },
    getModuleInstance() {
      return moduleinstance;
    },
    ComponentSet,
  };
};

export default MemoSet;
