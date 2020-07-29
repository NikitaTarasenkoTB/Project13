class Card {
  constructor(imagePopup, api) {
    this._imagePopup = imagePopup;
    this._api = api;
    this._cardsId = [];

    this._likeHandler = this._likeHandler.bind(this);
    this._remove = this._remove.bind(this);
  }

  create(title, link, cardId, likesCount, isOwn, isLiked) {
    const newCard = `
    <div class="place-card">
        <div class="place-card__image">
          
        </div>
        <div class="place-card__description">
            <h3 class="place-card__name"></h3>
            <div class="place-card__likes-container">
              <button class="place-card__like-icon"></button>
              <p class="place-card__like-count">0</p>
            </div>
        </div>
    </div>`;
    const deleteButtonElement = '<button class="place-card__delete-icon"></button>';

    const bufferElement = document.createElement('div');
    bufferElement.insertAdjacentHTML('afterbegin', newCard);
    bufferElement.firstElementChild.querySelector('.place-card__image').style.backgroundImage = `url(${link})`;
    bufferElement.firstElementChild.querySelector('.place-card__name').textContent = title;

    this.placeCard = bufferElement.firstElementChild;
    this.placeCard.id = cardId;
    isOwn ? this.placeCard.querySelector('.place-card__image').insertAdjacentHTML('afterbegin', deleteButtonElement) : 0;
    isLiked ? this._like(this.placeCard) : 0;
    this.placeCard.querySelector('.place-card__like-count').textContent = likesCount;

    this._likeIconElement = this.placeCard.querySelector('.place-card__like-icon');
    this._deleteIconElement = this.placeCard.querySelector('.place-card__delete-icon');
    this._cardImageElement = this.placeCard.querySelector('.place-card__image');

    this._setEventListeners();

    return this.placeCard;
  }

  _errorHandler(error) {
    console.log(error);
  }

  _likeHandler(event) {
    const currentCard = event.target.closest('.place-card');
    if (event.target.classList.contains('place-card__like-icon_liked')) { 
      this._api.deleteLike(currentCard.id)
      .then((responseData) => {
        currentCard.querySelector('.place-card__like-count').textContent = responseData.likes.length;
        this._like(currentCard);
      })
      .catch((error) => this._errorHandler(error));
    } else {
      this._api.addLike(currentCard.id)
      .then((responseData) => {
        currentCard.querySelector('.place-card__like-count').textContent = responseData.likes.length;
        this._like(currentCard);
      })
      .catch((error) => this._errorHandler(error));
    }
  }

  _like(currentCard) {
    currentCard.querySelector('.place-card__like-icon').classList.toggle('place-card__like-icon_liked');
  }

  _remove(event) {
    if(window.confirm('Вы действительно хотите удалить карточку?')) {   
      this._api.deleteCard(event.target.closest('.place-card').id)
      .then(() => {
        event.target.closest('.place-card').remove();
        this._removeEventListeners(event.target.closest('.place-card'));
      })
      .catch((error) => this._errorHandler(error));
    }
  }

  _setEventListeners() {
    this._likeIconElement.addEventListener('click', this._likeHandler);
    this._deleteIconElement !== null ? this._deleteIconElement.addEventListener('click', this._remove) : 0;
    this._cardImageElement.addEventListener('click', this._imagePopup.setNewPopupImage);
  }

  _removeEventListeners(currentCardElement) {
    currentCardElement.querySelector('.place-card__like-icon').removeEventListener('click', this._likeHandler);
    currentCardElement.querySelector('.place-card__delete-icon').removeEventListener('click', this._remove);
    currentCardElement.querySelector('.place-card__image').removeEventListener('click', this._imagePopup.setNewPopupImage);
  }
}
