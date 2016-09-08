'use strict';

var browserCookies = require('browser-cookies');

var formContainer = document.querySelector('.overlay-container');
var newReviewForm = document.querySelector('.review-form');
var formCloseButton = newReviewForm.querySelector('.review-form-close');
var reviewLabelsGroup = newReviewForm.querySelector('.review-fields');
var reviewLabelName = newReviewForm.querySelector('.review-fields-name');
var reviewLabelText = newReviewForm.querySelector('.review-fields-text');
var formSubmitButton = newReviewForm.querySelector('.review-submit');
var reviewMark = newReviewForm.elements['review-mark'];
var reviewName = newReviewForm.elements['review-name'];

var form = {

  daysCalculate: function(mm, dd) {
    var nowDate = new Date();
    var currentYear = nowDate.getFullYear();
    var targetDate = new Date(currentYear, mm, dd);
    var compareDate = (targetDate - nowDate) < 0 ? targetDate : targetDate.setFullYear(currentYear - 1);
    return Math.floor((nowDate - compareDate) / 1000 / 60 / 60 / 24);
  },

  onSubmit: function() {
    var daysToExpire = this.daysCalculate(11, 9);
    browserCookies.set('review-mark', reviewMark.value, {expires: daysToExpire});
    browserCookies.set('review-name', reviewName.value, {expires: daysToExpire});
  },

  onClose: null,

  /** Функция проверки заполнения полей
   * @param {event} evt;
   */
  checkField: function() {
    var nameIsValid = reviewName.value !== '';
    var textIsValid = reviewMark.value >= 3 || newReviewForm.elements['review-text'].value !== '';
    var reviewIsValid = nameIsValid && textIsValid;

    reviewLabelName.classList.toggle('invisible', nameIsValid);
    reviewLabelText.classList.toggle('invisible', textIsValid);
    reviewLabelsGroup.classList.toggle('invisible', reviewIsValid);
    formSubmitButton.disabled = !reviewIsValid;
  },

  /**
   * @param {Function} cb
   */
  open: function(cb) {
    var defaultMark = browserCookies.get('review-mark') || reviewMark.value || '';
    var defaultName = browserCookies.get('review-name') || reviewName.value || '';

    formContainer.classList.remove('invisible');
    reviewMark.value = defaultMark;
    reviewName.value = defaultName;
    this.checkField();
    cb();
    newReviewForm.addEventListener('input', this.checkField);
    newReviewForm.addEventListener('change', this.checkField);
    newReviewForm.addEventListener('submit', this.onSubmit.bind(this));
  },

  close: function() {
    formContainer.classList.add('invisible');

    if (typeof this.onClose === 'function') {
      this.onClose();
    }
  }

};


formCloseButton.onclick = function(evt) {
  evt.preventDefault();
  form.close();
};


module.exports = form;
