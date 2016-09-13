'use strict';

var loadImage = require('./load-image.js');


var pictureContainer = document.querySelector('.overlay-gallery-preview');

var Gallery = function(sources) {
  this.pictures = sources;
  this.activePicture = null;

  this.gallery = document.querySelector('.overlay-gallery');
  this.arrowLeft = this.gallery.querySelector('.overlay-gallery-control-left');
  this.arrowRight = this.gallery.querySelector('.overlay-gallery-control-right');
  this.currentNumber = this.gallery.querySelector('.preview-number-current');
  this.totalNumber = this.gallery.querySelector('.preview-number-total');
  this.galleryClose = this.gallery.querySelector('.overlay-gallery-close');

  this.totalNumber.innerHTML = this.pictures.length;

  this._slideToLeft = this._slideToLeft.bind(this);
  this._slideToRight = this._slideToRight.bind(this);
  this._hide = this._hide.bind(this);
  this._showImage = this._showImage.bind(this);
};

Gallery.prototype._slideToLeft = function() {
  if (this.activePicture > 0) {
    this._setActivePicture(this.activePicture - 1);
  }
};

Gallery.prototype._slideToRight = function() {
  if (this.activePicture < this.pictures.length - 1) {
    this._setActivePicture(this.activePicture + 1);
  }
};

Gallery.prototype._hide = function() {
  this.arrowLeft.onclick = null;
  this.arrowRight.onclick = null;
  this.galleryClose.onclick = null;
  this.gallery.classList.add('invisible');
};

Gallery.prototype.show = function(number) {
  var that = this;
  // добавление обработчиков
  this.arrowLeft.onclick = that._slideToLeft;
  this.arrowRight.onclick = that._slideToRight;
  this.galleryClose.onclick = that._hide;

  this.gallery.classList.remove('invisible');
  this._setActivePicture(number);
};


Gallery.prototype._showImage = function(isOK) {
  var lastNode = pictureContainer.lastChild;
  var newImage = new Image();
  var addedElement;

  if (isOK) {
    newImage.src = this.pictures[this.activePicture];
    addedElement = newImage;
  } else {
    addedElement = document.createTextNode('Ошибка загрузки');
  }

  if (lastNode.nodeName === 'IMG') {
    pictureContainer.replaceChild(addedElement, lastNode);
  } else {
    pictureContainer.appendChild(addedElement);
  }
};



Gallery.prototype._setActivePicture = function(number) {
  this.activePicture = number;

  this.currentNumber.innerHTML = this.activePicture + 1;

  loadImage(this.pictures[number], this._showImage);

};

module.exports = Gallery;
