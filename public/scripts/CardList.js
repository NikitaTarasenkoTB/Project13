class CardList {
  constructor(cardsContainer, card, userInfo, api) {
    this._cardsContainer = cardsContainer;
    this._card = card;
    this._userInfo = userInfo;
    this._api = api;
  }

  _errorHandler(error) {
    console.log(error);
  }

  addCard(card) {
    this._cardsContainer.append(card);
  }

  render() {
    this._api.getInitialCards()
    .then((responseData) => {
      responseData.forEach((item) => {
        const isOwn = this._userInfo.id === item.owner._id;
        const isLiked = item.likes.find((likeItem) => likeItem._id === this._userInfo.id);
        this.addCard(this._card.create(item.name, item.link, item._id, item.likes.length, isOwn, !!isLiked));
      })
    })
    .catch((error) => this._errorHandler(error));
  }
}