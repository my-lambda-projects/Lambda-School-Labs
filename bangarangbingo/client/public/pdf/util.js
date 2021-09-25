//import { BingoCard } from "./BingoCard.js";

function cssBgColor(id, color) {
  document.getElementById(id).style.backgroundColor = color;
}

function pad(num, len) {
  let str = num + "";
  for (; str.length < len; ) {
      str = "0" + str;
  }
  return str;
}

function fillBlanks(str, num) {
  if(str.length !== num) {
    let len = str.length;
    if(len < -1) { len = 1; }
    let max = num - len;
    let i = 0;
    for(; i < max; i++) {
      str += ' ';
    }
  }
  return str;
}

function fillBlank(str) {
  if(str === '') {
    return ' ';
  }
  return str;
}

function escQuote(str) {
  if(typeof(str) === 'undefined') { return '';}
  if(str.match(/'/i)) {
    str = str.replace(/'/g, "\\'");
    //console.log(`#############: ${str}`);
  }
  if(str.match(/`/i)) {
    str = str.replace(/`/g, "\\`");
    //console.log(`#############: ${str}`);
  }
  if(str.match(/\n/i)) {
    str = str.replace(/\n/g, "\\n");
    //console.log(`#############: ${str.cellStr}`);
  }
  /*
  if(str.match("/\/")) {
    str = str.replace("/\/", "\\\\");
    //console.log(`#############: ${str.cellStr}`);
  }
  */
  return str;
}

function unEscQuote(str) {
  if(str.match(/\\'/i)) {
    str = str.replace(/'/g, "'");
    //console.log(`#############: ${str}`);
  }
  if(str.match(/\\`/i)) {
    str = str.replace(/`/g, "`");
    //console.log(`#############: ${str}`);
  }
  if(str.match(/\\n/i)) {
    str = str.replace(/\n/g, "\n");
    //console.log(`#############: ${str.cellStr}`);
  }
  /*
  if(str.match("\\\\")) {
    str = str.replace("\\\\", "\\");
    //console.log(`#############: ${str.cellStr}`);
  }
  */
  return str;
}

function toggleDisplay(id) {
  if(document.getElementById(id).style.display !== 'none') {
    document.getElementById(id).style.display = 'none';
  } else {
    document.getElementById(id).style.display = 'inline';
  }
}

function toggleVal(val, alt0, alt1) {
  if(val === alt0) {
    return alt1;
  } else {
    return alt0;
  }
}

function arrJSON(arr) {
  let i = 0;
  let str = '';
  arr = arr.split('\n');
  let len = arr.length;
  for(; i < len; i++) {
    str += '/*'+ pad(i, (len +'').length) +'*/ docArr.push(`' + arr[i] + '`);\n';
  }
}

