class EditFormPopup extends FormPopup {
  constructor(popupElement, openButton, closeButton, formValidator, api, userInfo) {
    super(popupElement, openButton, closeButton, formValidator, api);
    this._userInfo = userInfo;

    this._editFormHandler = this._editFormHandler.bind(this);
    this._setEventListeners();
  }

  _errorHandler(error) {
    console.log(error);
  }

  _open() {
    super._open();
    this._userInfo.setInputUserInfo(this._currentForm);
    this._formValidator.setSubmitButtonState(this._currentForm, true);
  }

  _editFormHandler(event) {
    event.preventDefault();

    this._user = this._currentForm.elements.user.value;
    this._about = this._currentForm.elements.about.value;

    this._userInfo.setUserInfo(this._user, this._about);

    this._loadingButtonState();
    this._api.updateUserInfo(this._user, this._about)
    .then(() => {
      this._userInfo.updateUserInfo();
      this._close();
      this._loadedButtonState();
    })
    .catch((error) => this._errorHandler(error));
  }

  _setEventListeners() {
    super._setEventListeners();
    this._currentForm.addEventListener('submit', this._editFormHandler);
  }
}