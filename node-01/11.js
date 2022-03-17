//
function fakeTimeout(callback) {
  callback();
}
console.log("0");
const second = function () {
  console.log("1");
};
fakeTimeout(second);
console.log("2");
