// 'use strict';

require('normalize.css/normalize.css');
require('./styles.css');

const obj = {
  num: 42,
};

const app = document.querySelector('#app');
var result;

const func = function func(n) {
  return this.num + n;
};

// 1
// result = func.apply(obj, [1]);

// 2
// result = func.call(obj, 2);

// 3
result = func.bind(obj, 3)();
app.innerHTML = result;
