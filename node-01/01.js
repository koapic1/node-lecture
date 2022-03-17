/*
  var puppy = "cute";
  console.log(puppy);
  {
    var puppy = "so cute"; //var은 function scope
  }
  console.log(puppy);  // 그러므로 puppy는 so cute로 바뀌어져 있음
*/

let puppy = "cute";
console.log(puppy);
{
  let puppy = "so cute"; //let은 block scope
  console.log("5번째 줄===", puppy);
}
console.log(puppy);
