'use strict';

/**
 * getCallbackName - функция для получения бесконечного числа
 * имен с использованием индекса на замыкании
 *
 * param {stirng} partName постоянная часть имени
 * @return {string} сгенеррированное имя функции
 */
var getCallbackName = (function() {
  var index = 0;
  return function(partName) {
    return partName + index++;
  };
})();

/**
 * callJsonp - функция получения списка отзывов по JSONP
 * @param {string} url
 * @param {function} callback
 */
function callJsonp(url, callback) {

  var callbackName = getCallbackName('jsonp_callback_');

  window[callbackName] = function(data) {
    callback(data);
    document.body.removeChild(callbackScript);
    delete window[callbackName];
  };

  var callbackScript = document.createElement('script');
  callbackScript.src = url + '?callback=' + callbackName;
  document.body.appendChild(callbackScript);
}

module.exports = callJsonp;
