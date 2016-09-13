'use strict';

var loadImage = function(url, cb) {
  var TIME_OUT = 10000;
  var imageLoadTimeout;
  var dummyImage = new Image();
  dummyImage.src = url;
  dummyImage.onload = function() {
    clearTimeout(imageLoadTimeout);
    cb(true);
  };
  dummyImage.onerror = function() {
    clearTimeout(imageLoadTimeout);
    cb(false);
  };
  imageLoadTimeout = setTimeout(function() {
    dummyImage.src = '';
    cb(false);
  }, TIME_OUT);
};

module.exports = loadImage;
