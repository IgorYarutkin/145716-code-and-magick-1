'use strict';

var Review = require('./review');
var load = require('./load');

var reviews = [];

function showReviews() {

  var reviewsFilter = document.querySelector('.reviews-filter');
  var reviewsList = document.querySelector('.reviews-list');


  load('http://localhost:1506/api/reviews', function(reviewsData) {
    reviews = reviewsData;
    reviews.forEach(function(reviewData) {
      var review = new Review(reviewData);
      reviewsList.appendChild(review.element);
    });
    reviewsFilter.classList.remove('invisible');
  });
}

showReviews();
