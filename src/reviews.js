'use strict';

var reviews = [];
var reviewTemplate = document.getElementById('review-template');
var elementToClone;
if ('content' in reviewTemplate) {
  elementToClone = reviewTemplate.content.querySelector('.review');
} else {
  elementToClone = reviewTemplate.querySelector('.review');
}
var reviewRatingRate = ['review-rating-two', 'review-rating-three', 'review-rating-four', 'review-rating-five'];

var TIME_OUT = 10000;

/**
 * getCallbackName - функция для получения бесконечного числа
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
 * callJsonp - функция получения списка отзывов по JSONP
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

/**
 * getReviewElement - функция получения html-элемента, сгенерированного
 * по данным загруженного списка
 * @param {array} data
 */
function getReviewElement(data) {

  var review = elementToClone.cloneNode(true);
  review.querySelector('.review-text').textContent = data.description;
  if(data.rating >= 2) {
    review.querySelector('.review-rating').classList.add(reviewRatingRate[data.rating - 2]);
  }

  var dummyImage = new Image();
  var imageLoadTimeout;
  dummyImage.onload = function() {
    clearTimeout(imageLoadTimeout);
    review.querySelector('.review-author').src = data.author.picture;
  };
  dummyImage.onerror = function() {
    review.classList.add('review-load-failure');
  };
  dummyImage.src = data.author.picture;
  imageLoadTimeout = setTimeout(function() {
    dummyImage.src = '';
    review.classList.add('review-load-failure');
  }, TIME_OUT);

  return review;
}

function showReviews() {

  var reviewsFilter = document.querySelector('.reviews-filter');
  var reviewsList = document.querySelector('.reviews-list');


  callJsonp('http://localhost:1506/api/reviews', function(reviewsData) {
    reviews = reviewsData;
    reviews.forEach(function(review) {
      reviewsList.appendChild(getReviewElement(review, reviewsList));
    });
    reviewsFilter.classList.remove('invisible');
  });
}

showReviews();
