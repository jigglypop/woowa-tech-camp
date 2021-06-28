const fs = require("fs");
const path = require("path");

module.exports = (dirname, ext, cb) => {
  let text = "." + ext;
  fs.readdir(dirname, function (err, datas) {
    if (err) {
      cb(err, null);
    } else {
      result = [];
      datas.forEach((data) => {
        if (path.extname(data) == text) {
          result.push(data);
        }
      });
      cb(null, result);
    }
  });
};
