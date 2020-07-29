class FormValidator {
  constructor() {
    this._formInputsValidityHandler = this._formInputsValidityHandler.bind(this);
  }

  _checkInputValidity(input) {
    input.setCustomValidity('');
    if (input.validity.typeMismatch && input.type === 'url') {
      input.setCustomValidity(errors.link);
      return false;
    }
  
    if(input.validity.tooShort || input.validity.tooLong) {
      input.setCustomValidity(errors.length);
      return false;
    }
  
    if(input.validity.valueMissing) {
      input.setCustomValidity(errors.required);
      return false;
    }
  
    return input.validity.valid;
  }

  setSubmitButtonState(form, validity) {
    const button = form.querySelector('.button');
    if (!validity) {
      button.classList.remove('button_enabled');
      button.setAttribute('disabled', true);
    } else {
      button.classList.add('button_enabled');
      button.removeAttribute('disabled');
    }
  }

  _makeInputsArray(form) {
    const inputs = Array.from(form.elements);
    inputs.pop();
    return inputs;
  }

  _isFormValid(form) {
    const inputs = this._makeInputsArray(form);
    const isformValid = inputs.every(this._checkInputValidity);
    if(isformValid) {
      return true;
    } else {
      return false;
    }
  }

  _showErrorMessage(input) {
    const errorElement = document.querySelector(`#error-${input.id}`);
    errorElement.textContent = input.validationMessage;
    errorElement.style.display = 'block';
  }

  _removeErrorMessage(input) {
    const errorElement = document.querySelector(`#error-${input.id}`);
    errorElement.style.display = 'none';
  }

  _formInputsValidityHandler(event) {
    const form = event.currentTarget;
    const input = event.target;
    this._checkInputValidity(input);
    !this._checkInputValidity(input) ? this._showErrorMessage(input) : this._removeErrorMessage(input);
    this._isFormValid(form) ? this.setSubmitButtonState(form, true) : this.setSubmitButtonState(form, false);
  }

  removeAllErrorMessages(form) {
    const inputs = this._makeInputsArray(form);
    inputs.forEach((item) => {
      this._removeErrorMessage(item);
    });
  }

  setInputVAlidityListeners(form) {
    this.removeAllErrorMessages(form);
    form.addEventListener('input', this._formInputsValidityHandler);
  }

  removeInputVAlidityListeners(form) {
    form.removeEventListener('input', this._formInputsValidityHandler);
  }
}