'use strict';

module.exports = function(list, filterID) {
  var filteredList;

  switch (filterID) {
    case 'reviews-recent':
      filteredList = list.filter(function(review) {
        var today = new Date();
        return (today - review.created) > 0 && (today - review.created) <= 1000 * 60 * 60 * 24 * 3;
      })
      .sort(function(a, b) {
        return b.created - a.created;
      });
      break;
    case 'reviews-good':
      filteredList = list.filter(function(review) {
        return review.rating >= 3;
      })
      .sort(function(a, b) {
        return b.rating - a.rating;
      });
      break;
    case 'reviews-bad':
      filteredList = list.filter(function(review) {
        return review.rating < 3;
      })
      .sort(function(a, b) {
        return a.rating - b.rating;
      });
      break;
    case 'reviews-popular':
      filteredList = list.sort(function(a, b) {
        return b.review_usefulness - a.review_usefulness;
      });
      break;
    case 'reviews-all':
    default:
      filteredList = list;
      break;
  }

  return filteredList;
};
