const [popupAdd, popupEdit, popupAvatar, popupImage] = document.querySelectorAll('.popup');
const addButton = document.querySelector('.user-info__button');
const editButton = document.querySelector('.user-info__edit-button');
const avatarButton = document.querySelector('.user-info__photo');
const [closeButton, closeButtonEdit, avatarCloseButton, closeButtonImage] = document.querySelectorAll('.popup__close');
const placesList = document.querySelector('.places-list');
const userNameElement = document.querySelector('.user-info__name');
const userAboutElement = document.querySelector('.user-info__job');
const userAvatarElement = document.querySelector('.user-info__photo');

const serverUrl = 'https://praktikum.tk/cohort11';
const apiHeaders = {
  authorization: '91b74308-54a5-47aa-a76e-98eef3c53923',
  'Content-Type': 'application/json',
}

const api = new Api(serverUrl, apiHeaders);

const imagePopup = new ImagePopup(popupImage, closeButtonImage);
const userInfo = new UserInfo(userNameElement, userAboutElement, userAvatarElement, api);
userInfo.setInitialUserInfo();
const card = new Card(imagePopup, api);
const cardList = new CardList(placesList, card, userInfo, api);
cardList.render();
const formValidator = new FormValidator();

new AddFormPopup(popupAdd, addButton, closeButton, formValidator, api, cardList, card);
new EditFormPopup(popupEdit, editButton, closeButtonEdit, formValidator, api, userInfo);
new AvatarFormPopup(popupAvatar, avatarButton, avatarCloseButton, formValidator, api, userInfo);