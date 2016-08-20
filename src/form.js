'use strict';

window.form = (function() {
  var formContainer = document.querySelector('.overlay-container');
  var formCloseButton = document.querySelector('.review-form-close');
  var newReviewForm = document.querySelector('.review-form');
  var reviewLabelsGroup = newReviewForm.querySelector('.review-fields');
  var reviewLabelName = newReviewForm.querySelector('.review-fields-name');
  var reviewLabelText = newReviewForm.querySelector('.review-fields-text');
  var formSubmitButton = newReviewForm.querySelector('.review-submit');

  var form = {
    onClose: null,

    /** Функция проверки заполнения полей
     * @param {event} evt;
     */
    checkField: function() {
      var nameIsValid = newReviewForm.elements['review-name'].value !== '';
      var textIsValid = newReviewForm.elements['review-mark'].value >= 3 || newReviewForm.elements['review-text'].value !== '';
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
      formContainer.classList.remove('invisible');
      this.checkField();
      cb();
      newReviewForm.addEventListener('input', this.checkField);
      newReviewForm.addEventListener('change', this.checkField);
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

  return form;
})();
