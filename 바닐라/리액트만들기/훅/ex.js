const outer = function (name) {
  this.name = name;
};

outer.prototype.getName = function () {
  console.log(this.name);
};

const suzi = new outer("suzi");
suzi.getName();
