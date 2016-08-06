/**
 * @fileoverview Модуль проверок
 * @author Igor Yarutkin (igoryarutkin.github.io igor.yarutkin@gmail.com)
 */

'use strict';

var getMessage = function(a, b) {

  if(typeof a === 'boolean') {
    return a ? 'Я попал в ' + b : 'Я никуда не попал';
    }

  if (typeof a === 'number') {
    return 'Я прыгнул на ' + a * 100 + ' сантиметров';
  }

  if(Array.isArray(a)) {
    if(Array.isArray(b)) {
      var sum = 0;
      a.forEach(function(element, index) {
	      sum = sum + element*b[index];
      });
      return 'Я прошёл ' + sum + ' метров';
    } else {
      return 'Я прошёл ' + a.reduce(function(previousValue, currentValue) {return previousValue + currentValue}) + ' шагов';
    }
  }

};
