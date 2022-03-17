function workPromise(sec) {
  return new Promise(function (resolve, reject) {
    //db에서 테이터가 바로 날아오지 않는다는 가상
    setTimeout(function () {
      resolve("workPromise function");
    }, sec);
  });
}

async function ayncFunction() {
  const result = await workPromise(3000);
  console.log(result);
  return "async function";
}
ayncFunction().then(function (result) {
  console.log(result);
});
