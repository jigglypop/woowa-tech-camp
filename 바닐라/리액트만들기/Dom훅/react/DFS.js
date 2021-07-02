import getUUID from "./getUUID.js";
import { getDoms, isComponent } from "./tags.js";

export const DFS = (jsxArray) => {
  let _jsxMap = {};
  let jsxChildIndex = {};
  let S = [[null, "App"]];
  let treeMap = {};
  let result = {};
  let DFSJsx_Id = {};

  for (let [jsx, name] of jsxArray) {
    // 컴포넌트
    let components = isComponent(jsx);
    if (components) {
      components = components.map((component) =>
        component.replace("<", "").replace("/>", "")
      );
    }
    treeMap[name] = components;
    // 바깥 div 만들어주기
    let div = `
    <div class="${name}Outer" >
      ___change___
    </div>
  `;
    div = div.replace("___change___", jsx);
    _jsxMap[name] = div;
  }

  // dfs 부분
  let idx = 0;
  while (S.length) {
    const [parent, dom] = S.pop();
    if (parent !== null) {
      if (jsxChildIndex[parent]) {
        jsxChildIndex[parent].push(idx);
      } else {
        jsxChildIndex[parent] = [idx];
      }
    }
    let _jsx = _jsxMap[dom];
    // id 지정해주기
    let id = getUUID();
    _jsx = _jsx.replace("<div", `<div id="${id}"`);
    // dom으로 분절
    const doms = getDoms(_jsx);
    // result에 등록
    result[idx] = {
      root: dom + "Outer",
      idx: idx,
      id: id,
      render: _jsx,
      doms: doms,
    };
    DFSJsx_Id[id] = {
      root: dom + "Outer",
      idx: idx,
      id: id,
      render: _jsx,
      doms: doms,
    };
    // dfs 진행
    const domChild = treeMap[dom];
    if (domChild) {
      for (let child of domChild) {
        S.push([idx, child]);
      }
    }
    idx++;
  }

  // BFS 부분(층수 찾기)
  let Q = [[0, 0]];
  let depths = Array.from(Array(idx + 1), () => new Array());

  while (Q.length) {
    let [u, depth] = Q.shift();
    result[u]["depth"] = depth;
    depths[depth].push(u);
    if (jsxChildIndex[u]) {
      for (let v of jsxChildIndex[u]) {
        Q.push([v, depth + 1]);
      }
    }
  }
  depths = depths.filter((item) => item.length > 0);
  return [result, DFSJsx_Id, jsxChildIndex, depths];
};
