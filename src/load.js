'use strict';

/**
 * loadJson - функция получения списка отзывов по XMLHttpRequest
 * @param {string} url        // строка с адресом запроса
 * @param {object} params     // объект с параметрами запроса (from, to, filter)
 * @param {function} callback // функция-колбэк, которая вызывается при успешной загрузке
 */
function loadJson(url, params, callback) {

  url = url + '?from=' + params.from + '&to=' + params.to + '&filter=' + params.filter;

  var xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.onload = function(evt) {
    console.log('Успешная загрузка!');
    callback(JSON.parse(evt.target.response));
  };
  xhr.onerror = function(evt) {
    console.warn('Что-то пошло не так! Статус ответа:' + evt.status);
  };
  xhr.timeout = 10000;
  xhr.ontimeout = function() {
    console.warn('Нет ответа от сервера. Проверьте подключение к Интернету');
  };

  xhr.send();
}

module.exports = loadJson;
