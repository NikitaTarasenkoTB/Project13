class UserInfo {
  constructor(userNameElement, userAboutElement, userAvatarElement, api) {
    this._userNameElement = userNameElement;
    this._userAboutElement = userAboutElement;
    this._userAvatarElement = userAvatarElement;
    this._api = api;
  }

  _errorHandler(error) {
    console.log(error);
  }

  setInitialUserInfo() {
    this._api.getUserInfo()
    .then((responseData) => {
      this.id = responseData._id;
      this._userNameElement.textContent = responseData.name;
      this._userAboutElement.textContent = responseData.about;
      this._userAvatarElement.style.backgroundImage = `url(${responseData.avatar})`;

      this._user = responseData.name;
      this._about = responseData.about;
    })
    .catch((error) => this._errorHandler(error));
  }

  setUserInfo(user, about) {
    this._user = user;
    this._about = about;
  }

  updateUserInfo() {
    this._userNameElement.textContent = this._user;
    this._userAboutElement.textContent = this._about;
  }

  setInputUserInfo(form) {
    form.elements.user.setAttribute('value', this._user);
    form.elements.about.setAttribute('value', this._about);
  }

  setUserAvatar(avatarUrl) {
    this._userAvatarElement.style.backgroundImage = `url(${avatarUrl})`;
  }
}
