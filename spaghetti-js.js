'use strict';

$(document).ready(function () {
  
  const JS_APP = {

    leftOperandId: 'left-operand',
    rightOperandId: 'right-operand',

    main: function() {
      this.cacheDom();
      this.registerListeners();
      this.render();
    },

    cacheDom: function() {
      this.add = document.getElementById('plain-old-js-app');
      this.leftOperand = this.add.querySelector('#' + this.leftOperandId);
      this.rightOperand = this.add.querySelector('#' + this.rightOperandId);
      this.sum = this.add.querySelector('#' + 'sum');

      this.left = this.valueOf(this.leftOperand);
      this.right = this.valueOf(this.rightOperand);
    },

    registerListeners: function() {
      this.leftOperand.addEventListener('input', this.render.bind(this));
      this.rightOperand.addEventListener('input', this.render.bind(this));
    },

    valueOf: function(element) {
      // typeof element.value == string
      // typeof +element.value == number

      // 0 = +element.value || 0
      // return +element.value || 0;

      // NaN = +element.value
      return +element.value;
    },

    calculate: function(event) {
      if (event) {
        const element = event.target;

        if (this.leftOperandId === element.id) {
          this.left = this.valueOf(element);
        } else if (this.rightOperandId === element.id) {
          this.right = this.valueOf(element);
        }
      }
    },

    render: function(event) {
      this.calculate(event);
      this.sum.innerHTML = this.left + this.right;
    }

  };

  JS_APP.main();
  
});
