function workPromise(sec) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve(new Date().toISOString());
    }, sec);
  });
}
workPromise(1000)
  .then(function (result) {
    console.log("첫번째 작업", result);
    return workPromise(1000);
  })
  .then(function (result) {
    console.log("두번째 작업", result);
    return workPromise(1000);
  })
  .then(function (result) {
    console.log("세번째 작업", result);
    return workPromise(1000);
  });
