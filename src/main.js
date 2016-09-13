'use strict';

var form = require('./form');
var Game = require('./game');
require('./reviews');
var Gallery = require('./gallery');


var game = new Game(document.querySelector('.demo'));
game.initializeLevelAndStart();
game.setGameStatus(Game.Verdict.INTRO);

var formOpenButton = document.querySelector('.reviews-controls-new');

/** @param {MouseEvent} evt */
formOpenButton.onclick = function(evt) {
  evt.preventDefault();

  form.open(function() {
    game.setGameStatus(Game.Verdict.PAUSE);
    game.setDeactivated(true);
  });
};

form.onClose = function() {
  game.setDeactivated(false);
};


var galleryContainer = document.querySelector('.photogallery');
var images = galleryContainer.querySelectorAll('.photogallery-image img');
var imagesLinks = galleryContainer.querySelectorAll('.photogallery-image');
var sources = Array.prototype.map.call(images, function(img) {
  return img.getAttribute('src');
});

var gallery = new Gallery(sources);
Array.prototype.forEach.call(imagesLinks, function(link, i) {
  link.addEventListener('click', function() {
    gallery.show(i);
  });
});
