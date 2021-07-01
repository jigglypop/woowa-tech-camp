const renderTree = (root, tree) => {
  // 불변성 유지
  const _tree = { ...tree };
  const El = document.createElement(`${tree.tag}`);
  delete _tree.tag;
  // id 설정
  if ("id" in _tree) {
    let ids = _tree["id"];
    for (let id of ids) {
      El.id = id;
    }
    delete _tree.id;
  }
  // 클래스 달기
  if ("class" in _tree) {
    let classes = _tree["class"];
    for (let classname of classes) {
      El.classList.add(classname);
    }
    delete _tree.class;
  }
  // innerText
  if ("innerText" in _tree) {
    let innerText = _tree["innerText"];
    El.innerText = innerText;
    delete _tree.innerText;
  }
  // child 세팅
  let _child = [];
  if ("child" in _tree) {
    _child = [..._tree.child];
    delete _tree.child;
  }
  // 나머지 attribute 세팅
  for (let attr of Object.keys(_tree)) {
    let value = _tree[attr];
    El.setAttribute(attr, value);
  }
  if (Object.keys(_child).length !== 0) {
    for (let item of _child) {
      const el = renderTree(El, item);
      El.appendChild(el);
    }
  }
  root.appendChild(El);
  return El;
};

export default renderTree;
