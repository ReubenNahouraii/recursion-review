// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {

  let jsonObject = { str: ''};
  
  if (obj === null || obj === undefined || typeof obj === 'number' || typeof obj === 'string' || typeof obj === 'boolean') {
    return addQuotes(obj);
  } 
  if (typeof obj === 'function') {
    return undefined;
  } 

  if (Array.isArray(obj)) {
    arrayStringify(obj, jsonObject);
  } else {
    objectStringify(obj, jsonObject);
  }
  return jsonObject.str;
};

let arrayStringify = function (array, jsonObject) {
  if(array.length === 0) {
    return jsonObject.str += '[]';
  }
  jsonObject.str += '[';
  array.forEach(value => {
    if (Array.isArray(value)) {
      arrayStringify(value, jsonObject);
    } else if (typeof value === 'object') {
      objectStringify(value, jsonObject);
    } else if (typeof value === 'string') {
      jsonObject.str += addQuotes(value);
    } else {
      jsonObject.str += value;
    }
    jsonObject.str += ',';    
  });
  jsonObject.str = jsonObject.str.slice(0, -1) + ']';
};

let objectStringify = function (obj, jsonObject) {
  if (!Object.getOwnPropertyNames(obj).length) {
    return jsonObject.str += '{}';
  }
  jsonObject.str += '{';
  for (let prop in obj) {
    if (typeof obj[prop] === 'function' || prop === 'undefined') {
      continue;
    }
    jsonObject.str += addQuotes(prop) + ':';
    if (Array.isArray(obj[prop])) {
      arrayStringify(obj[prop], jsonObject);
    } else if (obj[prop] !== null && typeof obj[prop] === 'object') {
      objectStringify(obj[prop], jsonObject);
    } else if (typeof obj[prop] === 'string') {
      jsonObject.str += addQuotes(obj[prop]);
    } else {
      jsonObject.str += obj[prop];
    }
    jsonObject.str += ',';
  }
  if (jsonObject.str.length === 1) {
    jsonObject.str += '}';
  } 
  jsonObject.str = jsonObject.str.slice(0, -1) + '}';
};

//create a helper function that return the value with "" around it
let addQuotes = function (input) {
  if (typeof input === 'string') {
    return '"' + input + '"';
  }
  return '' + input;
};













