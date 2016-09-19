'use strict';

function throttle(func, delay) {
  var lastTime = 0;

  return function() {
    var currentTime = new Date();
    if ((currentTime - lastTime) > delay) {
      func();
      lastTime = currentTime;
    }
  };
}

module.exports = throttle;
