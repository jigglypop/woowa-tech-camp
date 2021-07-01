// 돔트리 만들기
export const getDoms = (tree) => {
  return tree.match(
    /((<([a-zA-Z0-9\s=\"\$])*>).*?(<\/([a-zA-Z0-9\s=\"\$])*>))|(<([a-zA-Z0-9\s=\"\$])*>)|(<\/([a-zA-Z0-9\s=\"\$])*>)|(<[A-Z]([a-z0-9\s=\"\$])*\/>)/g
  );
};
// 모듈 등록
const setModule = (modules) => {
  let instance = {};
  for (let module of modules) {
    let div = `
        <div class="${module.name}Outer" >
          ___change___
        </div>
      `;

    div = div.replace("___change___", module().render);
    const doms = getDoms(div);
    instance[module.name] = {
      root: module.name + "Outer",
      render: div,
      doms: doms,
    };
  }
  return instance;
};

export default setModule;
