import { Component } from "./Component.js";

const MemoSet = function () {
  let ComponentSet = {};
  let memo = {};
  let modules = {};
  let moduleinstance = {};
  let methods = {};
  let hooks = {};
  let JsxById = {};
  let JsxByIndex = {};
  let depth = [];

  return {
    setComponents(id, value) {
      ComponentSet[id] = value;
      return ComponentSet;
    },
    // jsx셋
    setJsxById(moduleObj) {
      for (let params of Object.keys(moduleObj)) {
        JsxById[params] = moduleObj[params];
      }
      return JsxById;
    },
    getJsxById() {
      return JsxById;
    },
    // jsx셋
    setJsxById(moduleObj) {
      for (let params of Object.keys(moduleObj)) {
        JsxById[params] = moduleObj[params];
      }
      return JsxById;
    },
    changeJsxById(id, value) {
      JsxById[id] = value;
      return JsxById;
    },
    getJsxById() {
      return JsxById;
    },
    // jsx index셋
    setJsxByIndex(moduleObj) {
      for (let params of Object.keys(moduleObj)) {
        JsxByIndex[params] = moduleObj[params];
      }
      return JsxByIndex;
    },
    changeJsxByIndex(id, value) {
      JsxByIndex[id] = value;
      return JsxByIndex;
    },
    getJsxByIndex() {
      return JsxByIndex;
    },
    // depth 셋
    setDepths(depths) {
      depth = depths;
      return depth;
    },
    getDepths() {
      return depth;
    },
    // 메서드셋
    setMethods(id, value) {
      methods[id] = value;
      return methods;
    },
    getMethods() {
      return methods;
    },
    // 훅셋
    setHooks(id, value) {
      hooks[id] = value;
      return hooks;
    },
    getHooks() {
      return hooks;
    },
    getHooksById(id) {
      return hooks[id];
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
