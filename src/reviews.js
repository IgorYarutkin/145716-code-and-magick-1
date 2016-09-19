'use strict';

var Review = require('./review');
var load = require('./load');

var reviews = [];

/**
 * Функция отрисовки отзывов
 */
function showReviews() {

  var reviewsFilter = document.querySelector('.reviews-filter');
  var reviewsList = document.querySelector('.reviews-list');
  var reviewsMore = document.querySelector('.reviews-controls-more');

  var pageNumber = 0;
  var pageSize = 3;
  var filterID = localStorage.getItem('filter') || 'reviews-all';
  reviewsFilter.querySelector('#' + filterID).checked = true;

  /**
   * Функция отрисовки блока отзывов
   * @param {array} reviewData
   */
  function appendReviews(reviewsData) {
    reviews = reviewsData;
    reviews.forEach(function(reviewData) {
      var review = new Review(reviewData);
      reviewsList.appendChild(review.element);
    });
    pageNumber++;
    reviewsFilter.classList.remove('invisible');
    reviewsMore.classList.toggle('invisible', reviews.length < pageSize);
  }

  /**
  * Обработчик добавления новых отзывов
  */
  var addMoreReviews = function() {
    load('/api/reviews', {
      from: pageNumber * pageSize,
      to: (pageNumber + 1) * pageSize,
      filter: filterID
    }, appendReviews);
  };

  /**
  * Обработчик фильтрации отзывов
  */
  var addFilter = function(evt) {
    reviewsList.innerHTML = '';
    pageNumber = 0;
    filterID = evt.target.value;
    localStorage.setItem('filter', filterID);
    addMoreReviews();
  };

  // Добавление обработчиков
  reviewsMore.addEventListener('click', addMoreReviews);
  reviewsFilter.addEventListener('change', addFilter, true);

  reviewsFilter.classList.add('invisible');
  addMoreReviews();

}

showReviews();
