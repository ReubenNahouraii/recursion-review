// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
const SYMBOL_CLOSE = { '[' : ']', '{' : '}' },
  CONVERT_DATATYPE  = { 'undefined' : returnUndefined, 'null' : returnNull,
    'true' : convertToBool, 'false' : convertToBool },
  LOOKUP_FUN = { '[' : parseArray, '{' : parseObj };

var parseJSON = function(json) {

  let symbolOpen  = json[0],
    section = json.slice(1, json.lastIndexOf(SYMBOL_CLOSE[symbolOpen]));


  console.log('this is the section', section);
  console.log('the value being returned is ', LOOKUP_FUN[symbolOpen](section.replace(/\s/g, '')));
};

function convertToBool(boolString) { return boolString === 'true'; }
function returnUndefined() { return undefined; }
function returnNull() { return null; }

function convertAllTypes(value) {
  let func = CONVERT_DATATYPE[value]; // returns a function
    if(!func) {
      if(isNaN(parseInt(value, 10))) // if true, then string
        return value; // is a string
      else
        return Number(value);
    } else
      return CONVERT_DATATYPE[value](value);
}

function parseArray(arrString) {

  arrString = arrString.replace(/["\s]/g, ''); // get rid of any extra whitespace
  if (!arrString.length) {
    return [];
  }

  let arr = new Array(),
    arrStringSplit = arrString.split(',');


  arrStringSplit.forEach(value => {
    if (value[0] === '[') {
      parseArray(value.slice(1, value.length - 1));
    } else if (value[0] === '{') {
      parseObj();
    } else {
      arr.push(convertAllTypes(value));
    }
  });

  return arr;
}

function parseObj(objString) {
  let objStringSliced = objString.slice(1, -1),
    arr = objStringSliced.split(',');

  let obj = {};
  arr.forEach(pair => {
    let keyValue = pair.split(':'),
      key = keyValue[0].replace(/["\s]/g, '');
    obj[key] = keyValue[1];
  });

  console.log('object getting called', obj);
  return obj;
}


