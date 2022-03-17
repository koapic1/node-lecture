function add(num01, num02 = 100) {
  return num01 + num02;
}

const add02 = (num01, num02) => {
  return num01 + num02;
};

console.log(add(100));
console.log(add02(100, 20));

//두개의 수를 입력 받아서 작은 수 출력해주는 함수 min을 만들어 보세요.
function min(a, b) {
  if (a < b) {
    return a;
  } else {
    return b;
  }
}

function min02(a, b) {
  return a < b ? a : b;
}

// 화살표 함수로 바꾸어 보기...
let arrowMin = (a, b) => {
  return a < b ? a : b;
};

// 화살표 함수로 바꾸어 보기...
// 한줄일때 중괄호 생략 가능 한줄일때 return도 생략 가능
let arrowMin02 = (a, b) => (a < b ? a : b);

console.log(arrowMin02(10, 5));

// 어떤수의 2배를 만들어 주는 함수 double 만들어 보기...

function double(num) {
  return num * 2;
}

arrowDouble = (num) => num * 2;

console.log(double(3));
console.log(arrowDouble(3));
