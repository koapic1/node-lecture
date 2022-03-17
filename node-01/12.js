function work(sec, callback) {
  setTimeout(function () {
    callback(new Date().toISOString());
  }, sec);
}
/*
work(1000, function (result) {
  console.log("첫번째 작업", result);
});
work(2000, function (result) {
  console.log("두번째 작업", result);
});
work(3000, function (result) {
  console.log("세번째 작업", result);
});
*/
// 콜백 지옥  Promise (약속) resolve, reject
// 운동화 open run 조던  기다리세요. 3월28일 출시
work(1000, function (result) {
  console.log("첫번째 작업", result);
  work(1000, function (result) {
    work(1000, function (result) {
      console.log("세번째 작업", result);
    });
    console.log("두번째 작업", result);
  });
});
