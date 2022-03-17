// node js 비동기 처리
// 음식점 ( 서버 1(주문), 2(주문), 3(주문)  )
// 토요일에 외출하면서 빨래 돌리고, 청소하고, 강아지 목욕
// call back

// setTimeout(() => {
//   console.log("todo : first working");
// }, 3000);
// setTimeout(() => {
//   console.log("todo : second working");
// }, 2000);

// callback은 함수의 매개변수로 주로 쓰인다.
const second = function () {
  console.log("todo : second working");
};
const first = function () {
  console.log("todo : second working");
};

setTimeout(() => {
  setTimeout(second, 2000);
  console.log("todo : first working");
}, 3000);

// for (let i = 0; i < 10000; i++) {
//   console.log("todo : " + i + " working");
// }
