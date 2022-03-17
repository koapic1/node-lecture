//this
const people = {
  name: "홍길동",
  say: function () {
    console.log(this);
  },
};
people.say();
let sayPeople = people.say;
//node의 최상위 객체
sayPeople();
