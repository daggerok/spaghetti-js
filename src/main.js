// 'use strict';

require('normalize.css/normalize.css');
require('./styles.css');

const obj = {
  num: 1,
};

const app = document.querySelector('#app');
var result;

const func = function func(a, b) {
  return this.num + a, b;
};

// 1: apply requires array, returns result
result = func.apply(obj, [1, 2]);

// 2: call requires sequence of args, returns result
result = func.call(obj, 2, 3);

// 3: bind , returns a fiction, which we need to call
const bound = func.bind(obj, 3, 4);
result = bound();

app.innerHTML = result;
