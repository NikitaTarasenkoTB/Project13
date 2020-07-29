class ImagePopup extends Popup {
  constructor(popupElement, closeButtonImage) {
    super(popupElement);
    this._closeButton = closeButtonImage;

    this.setNewPopupImage = this.setNewPopupImage.bind(this);
    
    this._setCloseButtonListener();
  }

  setNewPopupImage(event) { 
    const link = event.target.style.backgroundImage.replace(/url\("(.+)"\)/gi, '$1');
    if(event.target.classList.contains('place-card__image')) {
      this._popupElement.querySelector('.popup__background').src = link;
      this._open();
    }
  }
}