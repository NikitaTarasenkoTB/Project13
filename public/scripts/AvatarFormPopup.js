class AvatarFormPopup extends FormPopup {
  constructor(popupElement, openButton, closeButton, formValidator, api, userInfo) {
    super(popupElement, openButton, closeButton, formValidator, api);
    this._userInfo = userInfo;

    this._avatarFormHandler = this._avatarFormHandler.bind(this);
    this._setEventListeners();
  }

  _errorHandler(error) {
    console.log(error);
  }

  _open() {
    super._open();
    this._formValidator.setSubmitButtonState(this._currentForm, false);
  }

  _avatarFormHandler(event) {
    event.preventDefault();
    const avatarUrl = this._currentForm.elements.avatarLink.value;


    this._loadingButtonState()
    this._api.updateUserAvatar(avatarUrl)
    .then(() => {
      this._userInfo.setUserAvatar(avatarUrl);
      this._close();
      this._loadedButtonState();
    })
    .catch((error) => this._errorHandler(error));
  }

  _setEventListeners() {
    super._setEventListeners();
    this._currentForm.addEventListener('submit', this._avatarFormHandler);
  }
}