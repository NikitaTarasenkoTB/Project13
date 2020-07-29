class Popup {
  constructor(popupElement, openButton, closeButton) {
    this._popupElement = popupElement;
    this._openButton = openButton;
    this._closeButton = closeButton;

    this._escButtonListenerHandler = this._escButtonListenerHandler.bind(this);
    this._open = this._open.bind(this);
    this._close = this._close.bind(this);
  }

  _open() {
    this._popupElement.classList.add('popup_is-opened');
    this._addEscButtonListener();
  }

  _close() {
    this._popupElement.classList.remove('popup_is-opened');
    this._removeEscButtonListener();
  }

  _escButtonListenerHandler(event) {
    if(event.key === 'Escape') {
      this._close();
      this._removeEscButtonListener();
    }
  }

  _addEscButtonListener() {
    document.addEventListener('keydown', this._escButtonListenerHandler);
  }

  _removeEscButtonListener() {
    document.removeEventListener('keydown', this._escButtonListenerHandler);
  }

  _setEventListeners() {
    this._setOpenButtonListener();
    this._setCloseButtonListener();
  }

  _setOpenButtonListener() {
    this._openButton.addEventListener('click', this._open);
  }

  _setCloseButtonListener() {
    this._closeButton.addEventListener('click', this._close);
  }
}