'use strict';

var reviews;

/**
 * var - getCallbackName - функция для получения бесконечного числа
 * имен с использованием индекса на замыкании
 *
 * @return {string} сгенеррированное имя функции
 */
var getCallbackName = (function() {
  var index = 0;
  return function() {
    return 'jsonp_callback_' + index++;
  };
})();

/**
 * @param {string} url
 * @param {function} callback
 */
function callJsonp(url, callback) {

  var callbackName = getCallbackName();

  window[callbackName] = function(data) {
    callback(data);
    document.body.removeChild(callbackScript);
    delete window[callbackName];
  };

  var callbackScript = document.createElement('script');
  callbackScript.src = url + '?callback=' + callbackName;
  document.body.appendChild(callbackScript);
}

callJsonp('http://localhost:1506/api/reviews', function(reviewsData) {
  reviews = reviewsData;
  console.log(reviews);
});
