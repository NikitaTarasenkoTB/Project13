class Api {
  constructor(serverUrl, apiHeaders) {
    this._serverUrl = serverUrl;
    this._serverUrlUserInfo = `${serverUrl}/users/me`;
    this._serverUrlCards = `${serverUrl}/cards`;
    this._serverUrlCardsLike = `${this._serverUrlCards}/like`;
    this._apiHeaders = apiHeaders;
  }

  _responseValidation(response) {
    return response.ok ? response.json() : Promise.reject(response.status);
  }

  getUserInfo() {
    return fetch(`${this._serverUrlUserInfo}`, {
      headers: this._apiHeaders,
    })
    .then((response) => this._responseValidation(response))
    .then((responseData) => {
      console.log(responseData);
      return responseData;
    });
  }

  updateUserInfo(newNameInfo, newAboutInfo) {
    return fetch(`${this._serverUrlUserInfo}`, {
      method: 'PATCH',
      headers: this._apiHeaders,
      body: JSON.stringify({
        name: newNameInfo,
        about: newAboutInfo,
      })
    })
    .then((response) => this._responseValidation(response))
    .then((responseData) => {
      console.log(responseData);
      return responseData;
    });
  }

  getInitialCards() {
    return fetch(this._serverUrlCards, {
      headers: this._apiHeaders
    })
    .then((response) => this._responseValidation(response))
    .then((responseData) => {
      console.log(responseData);
      return responseData;
    });
  }

  addCard(cardName, cardLink) {
    return fetch(this._serverUrlCards, {
      method: 'POST',
      headers: this._apiHeaders,
      body: JSON.stringify({
        name: cardName,
        link: cardLink
      })
    })
    .then((response) => this._responseValidation(response))
    .then((responseData) => {
      console.log(responseData);
      return responseData;
    });
  }

  deleteCard(cardId) {
    return fetch(this._serverUrlCards + '/' + cardId, {
      method: 'DELETE',
      headers: this._apiHeaders,
    })
    .then((response) => this._responseValidation(response))
    .then((responseData) => console.log(responseData))
  }

  addLike(cardId) {
    return fetch(this._serverUrlCardsLike + '/' + cardId, {
      method: 'PUT',
      headers: this._apiHeaders,
    })
    .then((response) => this._responseValidation(response))
    .then((responseData) => {
      console.log(responseData);
      return responseData;
    })
  }

  deleteLike(cardId) {
    return fetch(this._serverUrlCardsLike + '/' + cardId, {
      method: 'DELETE',
      headers: this._apiHeaders,
    })
    .then((response) => this._responseValidation(response))
    .then((responseData) => {
      console.log(responseData);
      return responseData;
    })
  }

  updateUserAvatar(avatarUrl) {
    return fetch(this._serverUrlUserInfo + '/avatar', {
      method: 'PATCH',
      headers: this._apiHeaders,
      body: JSON.stringify({
        avatar: avatarUrl
      })
    })
    .then((response) => this._responseValidation(response))
    .then((responseData) => {
      console.log(responseData);
      return responseData;
    })
  }
}