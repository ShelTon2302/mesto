const content = document.querySelector('.content');
const editButton = content.querySelector('.profile-info__edit-button');
const profileName = content.querySelector('.profile-info__name');
const profileDescription = content.querySelector('.profile-info__description');
const addButton = content.querySelector('.profile__add-button');
const elements = content.querySelector('.elements');
let elementLike;
let elementTrash;
let elementImg;
const popupEditProfile = document.querySelector('.popup_profile');
const formEditProfile = popupEditProfile.querySelector('.popup__form_profile');
const closeEditProfileButton = popupEditProfile.querySelector('.popup__close-button_profile');
const popupEditProfileName = popupEditProfile.querySelector('.popup__input_profile_name');
const popupEditProfileDescription = popupEditProfile.querySelector('.popup__input_profile_description');
const popupAddElement = document.querySelector('.popup_add-element');
const formAddElement = popupAddElement.querySelector('.popup__form_add-element');
const closeAddElementButton = popupAddElement.querySelector('.popup__close-button_add-element');
const popupAddElementName = popupAddElement.querySelector('.popup__input_element_name');
const popupAddElementSrc = popupAddElement.querySelector('.popup__input_element_src');
const popupImg = document.querySelector('.popup_img');
const closeImgButton = popupImg.querySelector('.popup__close-button_img');
const popupImgImg = popupImg.querySelector('.popup__img');
const popupImgDescription = popupImg.querySelector('.popup__description');

function addElement (src, name) {
    const elementTemplate = document.querySelector('#element').content;
    const addElement = elementTemplate.querySelector('.element').cloneNode(true);
    addElement.querySelector('.element__image').src = src;
    addElement.querySelector('.element__image').alt = name;
    addElement.querySelector('.element__title').textContent = name;
    elements.prepend(addElement);
}

function addElementFunction(kol) {
    elementLike = elements.querySelectorAll('.element__like');
    elementTrash = elements.querySelectorAll('.element__trash');
    elementImg = elements.querySelectorAll('.element__image');
    for (let i = 0; i < kol; i++) {
        elementLike[i].addEventListener('click', (eve) => changeLikeElementStatus(eve));
        elementTrash[i].addEventListener('click', (eve) => elementRemove(eve));
        elementImg[i].addEventListener('click', (eve) => enablePopupImg(eve));
    };
}

function startElement() {
    for (let i = 0; i < 6; i ++) {
        addElement(initialCards[i].link, initialCards[i].name);
    }
    addElementFunction(6);
}

function changeLikeElementStatus(eve) {
    eve.target.classList.toggle('element__like_active');
}

function elementRemove(eve) {
    eve.target.closest('.element').remove();
}

function EnableDisablePopup(popup) {
    popup.classList.toggle('popup_visible');
}

function enablePopupEditProfile() {
    popupEditProfileName.value = profileName.textContent;
    popupEditProfileDescription.value = profileDescription.textContent;
    EnableDisablePopup(popupEditProfile);
}

function enablePopupAddElement() {
    formAddElement.reset();
    EnableDisablePopup(popupAddElement);
}

function enablePopupImg(eve) {
    popupImgImg.src = eve.target.src;
    popupImgImg.alt = eve.target.alt;
    popupImgDescription.textContent = eve.target.alt;
    EnableDisablePopup(popupImg);
}


function editProfileFormSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = popupEditProfileName.value;
    profileDescription.textContent = popupEditProfileDescription.value;
    EnableDisablePopup(popupEditProfile);
}

function addElementFormSubmitHandler (evt) {
    evt.preventDefault();
    addElement(popupAddElementSrc.value, popupAddElementName.value);
    addElementFunction(1);
    EnableDisablePopup(popupAddElement);
}

startElement();
editButton.addEventListener('click', enablePopupEditProfile);
addButton.addEventListener('click', enablePopupAddElement);
closeEditProfileButton.addEventListener('click', () => EnableDisablePopup(popupEditProfile));
closeAddElementButton.addEventListener('click', () => EnableDisablePopup(popupAddElement));
closeImgButton.addEventListener('click', () => EnableDisablePopup(popupImg));
formEditProfile.addEventListener('submit', editProfileFormSubmitHandler);
formAddElement.addEventListener('submit', addElementFormSubmitHandler);