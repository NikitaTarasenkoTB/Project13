class FormPopup extends Popup {
  constructor(popupElement, openButton, closeButton, formValidator, api) {
    super(popupElement, openButton, closeButton);
    this._currentForm = popupElement.querySelector('form');
    this._formValidator = formValidator;
    this._api = api;
  }

  _resetForm() {
    this._currentForm.reset();
  }

  _loadingButtonState() {
    this._closeButton.setAttribute('disabled', true);
    this._currentForm.querySelector('.popup__button-save-text').textContent = 'Загрузка...';
  }

  _loadedButtonState() {
    this._currentForm.querySelector('.popup__button-save-text').textContent = 'Сохранить';
  }

  _open() {
    super._open();
    this._resetForm();
    this._formValidator.setInputVAlidityListeners(this._currentForm);
  }

  _close() {
    super._close();
    this._formValidator.removeInputVAlidityListeners(this._currentForm);
  }
}