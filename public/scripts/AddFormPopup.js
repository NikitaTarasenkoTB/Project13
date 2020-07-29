class AddFormPopup extends FormPopup {
  constructor(popupElement, openButton, closeButton, formValidator, api, cardList, card) {
    super(popupElement, openButton, closeButton, formValidator, api);
    this._cardList = cardList;
    this._card = card;

    this._addFormHandler = this._addFormHandler.bind(this);
    this._setEventListeners();
  }

  _open() {
    super._open();
    this._formValidator.setSubmitButtonState(this._currentForm, false);
    this._loadedButtonState();
  }

  _loadingButtonState() {
    super._loadingButtonState();
    this._currentForm.querySelector('.popup__button-save-text').style.fontSize = '18px';
  }

  _loadedButtonState() {
    super._loadedButtonState();
    this._currentForm.querySelector('.popup__button-save-text').textContent = '+';
    this._currentForm.querySelector('.popup__button-save-text').style.fontSize = '36px';
  }

  _errorHandler(error) {
    console.log(error);
  }

  _addFormHandler(event) {
    event.preventDefault();

    const title = this._currentForm.elements.title.value;
    const link = this._currentForm.elements.link.value;

    this._loadingButtonState();

    this._api.addCard(title, link)
    .then((responseData) => {
      this._cardList.addCard(this._card.create(title, link, responseData._id, 0, true));
      this._close();
      this._loadedButtonState();
    })
    .catch((error) => this._errorHandler(error));
  }

  _setEventListeners() {
    super._setEventListeners();
    this._currentForm.addEventListener('submit', this._addFormHandler);
  }
}