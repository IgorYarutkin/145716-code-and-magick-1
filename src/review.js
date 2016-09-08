'use strict';

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

module.exports = getReviewElement;
