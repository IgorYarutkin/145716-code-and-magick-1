'use strict';

var loadImage = require('./load-image');

var reviewTemplate = document.getElementById('review-template');
var elementToClone;
if ('content' in reviewTemplate) {
  elementToClone = reviewTemplate.content.querySelector('.review');
} else {
  elementToClone = reviewTemplate.querySelector('.review');
}

/**
 * Creates a new html-element review.
 * @class
 * @param {object} data
 */
var Review = function(data) {
  this.data = data;
  this.element = elementToClone.cloneNode(true);
  this.element.querySelector('.review-text').textContent = data.description;
  this.element.querySelector('.review-rating').classList.add(this.getRatingClass());
  var date = new Date(data.created);
  this.element.querySelector('.review-date').textContent = date.toLocaleString();
  this.element.querySelector('.review-usefulness').textContent = data.review_usefulness;

  var ctx = this;

  this.quizYes = this.element.querySelector('.review-quiz-answer-yes');
  this.quizNo = this.element.querySelector('.review-quiz-answer-no');

  this.quizYes.onclick = function() {
    ctx.setUsefull(true);
  };
  this.quizNo.onclick = function() {
    ctx.setUsefull(false);
  };

  loadImage(data.author.picture, this.onImageLoad.bind(this));
};

/**
 * Коллбек для загрузки изображений
 * @param {boolean} isOk
 */
Review.prototype.onImageLoad = function(isOk) {
  if (isOk) {
    this.element.querySelector('.review-author').src = this.data.author.picture;
  } else {
    this.element.classList.add('review-load-failure');
  }
};

Review.prototype.reviewRatingRate = [
  'review-rating-one',
  'review-rating-two',
  'review-rating-three',
  'review-rating-four',
  'review-rating-five'
];

/**
 * Возвращает класс рейтинга отзыва
 * @return {string}
 */
Review.prototype.getRatingClass = function() {
  return this.reviewRatingRate[this.data.rating - 1];
};

Review.prototype.setUsefull = function(yes) {
  this.quizYes.classList.toggle('review-quiz-answer-active', yes);
  this.quizNo.classList.toggle('review-quiz-answer-active', !yes);
};

Review.prototype.remove = function() {
  this.quizYes.onclick = null;
  this.quizNo.onclick = null;
};

module.exports = Review;
