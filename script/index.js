import { Card, initialCards } from "./card.js";
import { FormValidator } from "./FormValidator.js";

const content = document.querySelector('.content');
const editButton = content.querySelector('.profile-info__edit-button');
const profileName = content.querySelector('.profile-info__name');
const profileDescription = content.querySelector('.profile-info__description');
const addButton = content.querySelector('.profile__add-button');
const elements = content.querySelector('.elements');
const popups = document.querySelectorAll('.popup');
const popupEditProfile = document.querySelector('.popup_profile');
const formEditProfile = popupEditProfile.querySelector('.popup__form_profile');
const popupEditProfileName = popupEditProfile.querySelector('.popup__input_profile_name');
const popupEditProfileDescription = popupEditProfile.querySelector('.popup__input_profile_description');
const popupAddElement = document.querySelector('.popup_add-element');
const formAddElement = popupAddElement.querySelector('.popup__form_add-element');
const popupAddElementName = popupAddElement.querySelector('.popup__input_element_name');
const popupAddElementSrc = popupAddElement.querySelector('.popup__input_element_src');

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_visible')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__close-button')) {
            closePopup(popup)
        }
    })
})

function renderInitialCards() {
    for (let i = 0; i < 6; i ++) {
        const card = new Card(initialCards[i].link, initialCards[i].name, '.card-element');
        const cardElement = card.generateCard();

        // Добавляем в DOM
        document.querySelector('.elements').append(cardElement);
    };
};

function openPopup(popup) {
    popup.classList.add('popup_visible');
    document.addEventListener('keydown', closeByEscape);
};

function closePopup(popup) {
    document.removeEventListener('keydown', closeByEscape);
    popup.classList.remove('popup_visible');
};

function closeByEscape(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_visible');
        closePopup(openedPopup);
    };
};

function openPopupEditProfile() {
    popupEditProfileName.value = profileName.textContent;
    popupEditProfileDescription.value = profileDescription.textContent;
    openPopup(popupEditProfile);
};

function openPopupAddElement() {
    formAddElement.reset();
    formAddElement.querySelector('.popup__save-button').setAttribute('disabled','');
    openPopup(popupAddElement);
};



function submitHandlerEditProfileForm (evt) {
    evt.preventDefault();
    profileName.textContent = popupEditProfileName.value;
    profileDescription.textContent = popupEditProfileDescription.value;
    closePopup(popupEditProfile);
};

function submitHandlerAddElementForm (evt) {
    evt.preventDefault();
    const card = new Card(popupAddElementSrc.value, popupAddElementName.value, '.card-element');
    const cardElement = card.generateCard();

    // Добавляем в DOM
    document.querySelector('.elements').prepend(cardElement);
    closePopup(popupAddElement);
};

function enableValidation(obj) {
    const formList = Array.from(document.querySelectorAll(obj.formSelector));
    formList.forEach((formElement) => {
        const formValidator = new FormValidator(obj, formElement);
        formValidator.enableValidation();  
    });
  };

renderInitialCards();
editButton.addEventListener('click', openPopupEditProfile);
addButton.addEventListener('click', openPopupAddElement);
formEditProfile.addEventListener('submit', submitHandlerEditProfileForm);
formAddElement.addEventListener('submit', submitHandlerAddElementForm);

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
  }); 