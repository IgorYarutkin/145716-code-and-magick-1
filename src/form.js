'use strict';

window.form = (function() {
  var formContainer = document.querySelector('.overlay-container');
  var formCloseButton = document.querySelector('.review-form-close');
  var formSubmitButton = document.querySelector('.review-submit');
  var reviewLabelsGroup = document.querySelector('.review-fields');
  var reviewLabelName = document.querySelector('.review-fields-name');
  var reviewLabelText = document.querySelector('.review-fields-text');
  var reviewInputName = document.querySelector('.review-form-field-name');
  var reviewInputText = document.querySelector('.review-form-field-text');

  var form = {
    onClose: null,

    /** Функция проверки заполнения полей
     * @param {event} evt;
     */
    checkField: function(evt) {
      if (evt.target === reviewInputName || evt.target === reviewInputText) {
        if (evt.target.value === '') {
          if (evt.target === reviewInputName) {
            reviewLabelName.classList.remove('invisible');
          } else {
            reviewLabelText.classList.remove('invisible');
          }
        } else {
          if (evt.target === reviewInputName) {
            reviewLabelName.classList.add('invisible');
          } else {
            reviewLabelText.classList.add('invisible');
          }
        }
        if (reviewLabelName.classList.contains('invisible') && reviewLabelText.classList.contains('invisible')) {
          reviewLabelsGroup.classList.add('invisible');
          formSubmitButton.removeAttribute('disabled', 'disabled');
        } else {
          reviewLabelsGroup.classList.remove('invisible');
        }
      }
    },

    /**
     * @param {Function} cb
     */
    open: function(cb) {
      formContainer.classList.remove('invisible');
      formSubmitButton.setAttribute('disabled', 'disabled');
      cb();
      formContainer.addEventListener('input', this.checkField);
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
