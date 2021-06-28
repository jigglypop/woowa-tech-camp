const mymodule = require("./mymodule.js");

const file = process.argv[2];
const ext = process.argv[3];
mymodule(file, ext, function (_, datas) {
  for (let data of datas) {
    console.log(data);
  }
});
