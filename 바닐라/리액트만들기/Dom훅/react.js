import { memoset } from "./index.js";
import { Component as Comp } from "./Component.js";
import setModule from "./react/setModule.js";
import { parseArea } from "./react/parseArea.js";
import renderTree from "./react/renderTree.js";
import { mergeTree } from "./react/mergeTree.js";
import { DFS } from "./react/DFS.js";
import { mergeDFSTree } from "./react/mergeDFSTree.js";
import { getDoms } from "./react/tags.js";

// getComponentJsxArray
const getComponentJsxArray = () => {
  let component_jsx_array = [];
  const modules = memoset.getModule();
  for (let params of Object.keys(modules)) {
    const [_, cb, __, ___] = Comp(modules[params], null, null);
    const jsx = cb().jsx;
    component_jsx_array.push([jsx, params]);
  }
  return component_jsx_array;
};

const React = function () {
  let global = {
    hooks: [],
    child: [],
  };
  let i = 0;
  // 루트 타겟
  let $target = null;
  // 훅 교체해주기
  function setHooks(_hooks) {
    global.hooks = _hooks;
  }

  // 렌더링
  function init(Component, root) {
    // jsx 파싱 부분
    // 클로저 인스턴스 세팅
    // 트리 그리기 부분
    const component_jsx_array = getComponentJsxArray();
    // dfs로 새로운 jsx배열 만들기
    const [DFSJsx_Index, DFSJsx_Id, _, depths] = DFS(component_jsx_array);
    // jsxbyid에 저장
    // 메모리제이션
    memoset.setJsxById(DFSJsx_Id);
    memoset.setJsxByIndex(DFSJsx_Index);
    memoset.setDepths(depths);
    // console.log(DFSJsx_Index[0]);
    const rootId = DFSJsx_Index[0].id;
    const jsxArray = mergeDFSTree(DFSJsx_Index, depths);
    console.log(jsxArray);
    // json 형식 트리 만들기
    const [parsedTree, namedTree] = parseArea(jsxArray);
    // 트리 그리기
    renderTree(root, parsedTree);
    const global = setGlobal(Component, root, rootId);
    // App 메모리제이션
    memoset.setHooks(rootId, global);

    return global;
  }
  function render(Component, root) {
    // jsx 파싱 부분
    // 클로저 인스턴스 세팅
    const rootId = global.rootId;
    global = memoset.getHooksById(rootId);
    global.Component = Component;
    const instance = Component();
    i = 0;
    global.instance = instance;

    // 메모리제이션 가져오기
    let DFSJsx_Index = memoset.getJsxByIndex();
    let DFSJsx_Id = memoset.getJsxById();
    let depths = memoset.getDepths();
    let idx = DFSJsx_Id[rootId].idx;

    let jsx_index = DFSJsx_Index[idx];
    let jsx_id = DFSJsx_Id[rootId];

    const doms = getDoms(global.instance.jsx);
    jsx_id.render = global.instance.jsx;
    jsx_index.render = global.instance.jsx;
    jsx_id.doms = doms;
    jsx_index.doms = doms;

    memoset.changeJsxByIndex(idx, jsx_index);
    memoset.changeJsxById(rootId, jsx_id);

    const jsxArray = mergeDFSTree(DFSJsx_Index, depths);
    console.log(jsxArray);
    // // 인스턴스
    const [parsedTree, namedTree] = parseArea(jsxArray);
    // 트리 그리기
    renderTree(root, parsedTree);
    return global;
  }

  // 클로저의 글로벌 설정
  function setGlobal(Component, root, rootId) {
    // 글로벌 새로 세팅
    global.Component = Component;
    const instance = Component();
    i = 0;
    global.instance = instance;
    global.root = root;
    global.rootId = rootId;
    // 버튼 잡기
    return global;
  }

  // 모든 메서드
  function setMethodsAll() {
    const globals = memoset.getHooks();
    for (let id of Object.keys(globals)) {
      const div = document.getElementById(id);
      const buttons = div.querySelectorAll("button");
      const instance = globals[id].instance;

      if (buttons) {
        for (let button of buttons) {
          const onClick = button.dataset.onclick;
          if (onClick) {
            button.addEventListener("click", function () {
              if (typeof instance[onClick] === "function") {
                instance[onClick]();
              }
            });
          }
        }
      }
    }
  }

  // useState 세팅
  function useState(initialState) {
    const hooks = global.hooks;
    const _state = global.hooks[i] || initialState;
    hooks[i] = _state;
    const setState = (function () {
      let _i = i;
      // let target = $target;
      return function (value) {
        global.hooks[_i] = value;
        // console.log(global.hooks);
        render(global.Component, global.root);
      };
    })();
    i++;
    return [_state, setState];
  }

  // useEffect 세팅
  function useEffect(cb, value) {
    const hooks = global.hooks;
    let _value = hooks[i];
    let changed = true;
    if (_value) changed = value.some((d, i) => d !== _value[i]);
    if (changed) cb();
    hooks[i] = value;
    i++;
  }
  return {
    render,
    useState,
    useEffect,
    global,
    setHooks,
    init,
    setGlobal,
    setMethodsAll,
  };
};

export default React;
