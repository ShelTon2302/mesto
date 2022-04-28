let content = document.querySelector('.content');
let editButton = content.querySelector('.profile-info__edit-button');
let profileName = content.querySelector('.profile-info__name');
let profileDescription = content.querySelector('.profile-info__description');
let addButton = content.querySelector('.profile__add-button');
let elements = content.querySelector('.elements');
let elementLike;
let elementTrash;
let elementImg;
let popupEditProfile = document.querySelector('.popup_profile');
let formEditProfile = popupEditProfile.querySelector('.popup__form_profile');
let closeEditProfileButton = popupEditProfile.querySelector('.popup__close-button_profile');
let popupEditProfileName = popupEditProfile.querySelector('.popup__input_profile_name');
let popupEditProfileDescription = popupEditProfile.querySelector('.popup__input_profile_description');
let popupAddElement = document.querySelector('.popup_add-element');
let formAddElement = popupAddElement.querySelector('.popup__form_add-element');
let closeAddElementButton = popupAddElement.querySelector('.popup__close-button_add-element');
let popupAddElementName = popupAddElement.querySelector('.popup__input_element_name');
let popupAddElementSrc = popupAddElement.querySelector('.popup__input_element_src');
let popupImg = document.querySelector('.popup_img');
let closeImgButton = popupImg.querySelector('.popup__close-button_img');
let popupImgImg = popupImg.querySelector('.popup__img');
let popupImgDescription = popupImg.querySelector('.popup__description');



function startElement() {
    const initialCards = [
        {
          name: 'Архыз',
          link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
        },
        {
          name: 'Челябинская область',
          link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
        },
        {
          name: 'Иваново',
          link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
        },
        {
          name: 'Камчатка',
          link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
        },
        {
          name: 'Холмогорский район',
          link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
        },
        {
          name: 'Байкал',
          link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
        }
      ]; 
    for (let i = 0; i < 6; i ++) {
        const elementTemplate = document.querySelector('#element').content;
        const startElement = elementTemplate.querySelector('.element').cloneNode(true);
        startElement.querySelector('.element__image').src = initialCards[i].link;
        startElement.querySelector('.element__image').alt = initialCards[i].name;
        startElement.querySelector('.element__title').textContent = initialCards[i].name;
        elements.append(startElement);
    }
    elementLike = elements.querySelectorAll('.element__like');
    elementTrash = elements.querySelectorAll('.element__trash');
    elementImg = elements.querySelectorAll('.element__image');
    for (let i = 0; i < elementLike.length; i++) {
        elementLike[i].addEventListener('click', (eve) => changeLikeElementStatus(eve));
        elementTrash[i].addEventListener('click', (eve) => elementRemove(eve));
        elementImg[i].addEventListener('click', (eve) => popupImgEnable(eve));
    };
}

function changeLikeElementStatus(eve) {
    if (eve.target.classList.contains('element__like_active')) {
        eve.target.classList.remove('element__like_active');
    }
    else {
        eve.target.classList.add('element__like_active');
    };
}

function enablePopupEditProfile() {
    popupEditProfileName.value = profileName.textContent;
    popupEditProfileDescription.value = profileDescription.textContent;
    popupEditProfile.classList.add('popup_visible');
}

function enablePopupAddElement() {
    popupAddElementName.value = '';
    popupAddElementSrc.value = '';
    popupAddElement.classList.add('popup_visible');
}

function popupImgEnable(eve) {
    popupImgImg.src = eve.path[0].src;
    popupImgImg.alt = eve.path[1].children[2].children[0].textContent;
    popupImgDescription.textContent = eve.path[1].children[2].children[0].textContent;
    popupImg.classList.add('popup_visible');
}

function disablePopup(popup) {
    popup.classList.remove('popup_visible');
}

function editProfileFormSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = popupEditProfileName.value;
    profileDescription.textContent = popupEditProfileDescription.value;
    disablePopup(popupEditProfile);
}

function addElementFormSubmitHandler (evt) {
    evt.preventDefault();
    /*elements.children[5].remove();*/
    const elementTemplate = document.querySelector('#element').content;
    const addElement = elementTemplate.querySelector('.element').cloneNode(true);
    addElement.querySelector('.element__image').src = popupAddElementSrc.value;
    addElement.querySelector('.element__image').alt = popupAddElementName.value;
    addElement.querySelector('.element__title').textContent = popupAddElementName.value;
    elements.prepend(addElement);
    elementLike = elements.querySelectorAll('.element__like');
    elementLike[0].addEventListener('click', (eve) => changeLikeElementStatus(eve));
    elementTrash[0].addEventListener('click', (eve) => elementRemove(eve));
    elementImg[i].addEventListener('click', (eve) => popupImgEnable(eve));
    disablePopup(popupAddElement);
}

function elementRemove(eve) {
    eve.path[1].remove();
}

startElement();
editButton.addEventListener('click', enablePopupEditProfile);
addButton.addEventListener('click', enablePopupAddElement);
closeEditProfileButton.addEventListener('click', () => disablePopup(popupEditProfile));
closeAddElementButton.addEventListener('click', () => disablePopup(popupAddElement));
closeImgButton.addEventListener('click', () => disablePopup(popupImg));
popupImgImg.addEventListener('click', () => disablePopup(popupImg));
formEditProfile.addEventListener('submit', editProfileFormSubmitHandler);
formAddElement.addEventListener('submit', addElementFormSubmitHandler);