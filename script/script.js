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
const elementTemplate = document.querySelector('#element').content;

function addElement (src, name) {
    const cloneElement = elementTemplate.querySelector('.element').cloneNode(true);
    cloneElement.querySelector('.element__image').src = src;
    cloneElement.querySelector('.element__image').alt = name;
    cloneElement.querySelector('.element__title').textContent = name;
    cloneElement.querySelector('.element__like').addEventListener('click', (evt) => changeLikeElementStatus(evt));
    cloneElement.querySelector('.element__trash').addEventListener('click', (evt) => removeElement(evt));
    cloneElement.querySelector('.element__image').addEventListener('click', (evt) => enablePopupImg(evt));
    return cloneElement;
};

function addElements (src,name) {
    elements.prepend(addElement(src, name));
};

function removeElement(evt) {
    console.log(evt);
    console.log(evt.target);
    evt.target.closest('.element').remove();
};

function startElement() {
    for (let i = 0; i < 6; i ++) {
        addElements(initialCards[i].link, initialCards[i].name);
    };
};

function changeLikeElementStatus(evt) {
    evt.target.classList.toggle('element__like_active');
};

function enablePopup(popup) {
    popup.classList.add('popup_visible');
};

function disablePopup(popup) {
    popup.classList.remove('popup_visible');
};

function disablePopupOverlay(evt, popup) {
    if (popup === evt.target) {
        disablePopup(popup);
    };
};

function disablePopupEsc(evt) {
    if (evt.key === 'Escape') {
        if (popupEditProfile.classList.value.includes('popup_visible')) {
            disablePopup(popupEditProfile);
        };
        if (popupAddElement.classList.value.includes('popup_visible')) {
            disablePopup(popupAddElement);
        };
        if (popupImg.classList.value.includes('popup_visible')) {
            disablePopup(popupImg);
        };
       
    };
};

function enablePopupEditProfile() {
    popupEditProfileName.value = profileName.textContent;
    popupEditProfileDescription.value = profileDescription.textContent;
    const inputList = Array.from(formEditProfile.querySelectorAll('.popup__input'));
    const buttonElement = formEditProfile.querySelector('.popup__save-button');
    toggleButtonState(inputList, buttonElement, {inactiveButtonClass: 'popup__save-button_inactive'});
    enablePopup(popupEditProfile);
};

function enablePopupAddElement() {
    formAddElement.reset();
    const inputList = Array.from(formAddElement.querySelectorAll('.popup__input'));
    const buttonElement = formAddElement.querySelector('.popup__save-button');
    toggleButtonState(inputList, buttonElement, {inactiveButtonClass: 'popup__save-button_inactive'});
    enablePopup(popupAddElement);
};

function enablePopupImg(evt) {
    popupImgImg.src = evt.target.src;
    popupImgImg.alt = evt.target.alt;
    popupImgDescription.textContent = evt.target.alt;
    enablePopup(popupImg);
};

function editProfileFormSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = popupEditProfileName.value;
    profileDescription.textContent = popupEditProfileDescription.value;
    disablePopup(popupEditProfile);
};

function addElementFormSubmitHandler (evt) {
    evt.preventDefault();
    addElements(popupAddElementSrc.value, popupAddElementName.value);
    disablePopup(popupAddElement);
};

startElement();
editButton.addEventListener('click', enablePopupEditProfile);
addButton.addEventListener('click', enablePopupAddElement);
closeEditProfileButton.addEventListener('click', () => disablePopup(popupEditProfile));
closeAddElementButton.addEventListener('click', () => disablePopup(popupAddElement));
closeImgButton.addEventListener('click', () => disablePopup(popupImg));
formEditProfile.addEventListener('submit', editProfileFormSubmitHandler);
formAddElement.addEventListener('submit', addElementFormSubmitHandler);
popupEditProfile.addEventListener('click', (evt) => disablePopupOverlay(evt, popupEditProfile));
popupAddElement.addEventListener('click', (evt) => disablePopupOverlay(evt, popupAddElement));
popupImg.addEventListener('click', (evt) => disablePopupOverlay(evt, popupImg));
document.addEventListener('keydown', (evt) => disablePopupEsc(evt, popupEditProfile));