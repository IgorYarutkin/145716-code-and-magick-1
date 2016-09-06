'use strict';

var getReviewElement = require('./review');
var load = require('./load');

var reviews = [];

function showReviews() {

  var reviewsFilter = document.querySelector('.reviews-filter');
  var reviewsList = document.querySelector('.reviews-list');


  load('http://localhost:1506/api/reviews', function(reviewsData) {
    reviews = reviewsData;
    reviews.forEach(function(review) {
      reviewsList.appendChild(getReviewElement(review, reviewsList));
    });
    reviewsFilter.classList.remove('invisible');
  });
}

showReviews();
