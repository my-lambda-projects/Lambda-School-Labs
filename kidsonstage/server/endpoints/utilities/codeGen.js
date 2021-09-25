const codeFiller = () => {
  let possible = "ACEKNRSTXZ";
  return possible.charAt(Math.floor(Math.random() * possible.length));
}

export function codeGen(num) {
  let numArr = num.toString().split('');
  let startLen = numArr.length;

  if (numArr.length < 6) {
    while (numArr.length < 6) {
      numArr.unshift(codeFiller());
    }
  }
 
  numArr.splice(3,0,'-');
  
  return numArr.join('');
};

// console.log(codeGen(1)); 
// console.log(codeGen(2));
// console.log(codeGen(3));
// console.log(codeGen(4));
// console.log(codeGen(5));
// console.log(codeGen(696969));

