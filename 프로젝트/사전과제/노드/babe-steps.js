const argv = process.argv;
const answer = argv.reduce((acc, cur, idx) => {
  if (idx >= 2) {
    acc += Number(cur);
  }
  return acc;
}, 0);
console.log(answer);
