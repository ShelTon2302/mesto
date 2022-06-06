import { Card } from "./card.js";
import { initialCards } from "./initialcards.js";
import { openPopup, closePopup } from "./popups.js";
import { FormValidator } from "./FormValidator.js";

const content = document.querySelector('.content');
const elements = content.querySelector('.elements');
const editButton = content.querySelector('.profile-info__edit-button');
const profileName = content.querySelector('.profile-info__name');
const profileDescription = content.querySelector('.profile-info__description');
const addButton = content.querySelector('.profile__add-button');
const popups = document.querySelectorAll('.popup');
const popupEditProfile = document.querySelector('.popup_profile')
const formEditProfile = popupEditProfile.querySelector('.popup__form_profile');
const popupEditProfileName = popupEditProfile.querySelector('.popup__input_profile_name');
const popupEditProfileDescription = popupEditProfile.querySelector('.popup__input_profile_description');
const popupAddElement = document.querySelector('.popup_add-element');
const popupAddElementName = popupAddElement.querySelector('.popup__input_element_name');
const popupAddElementSrc = popupAddElement.querySelector('.popup__input_element_src');
const formAddElement = popupAddElement.querySelector('.popup__form_add-element');

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

function openPopupEditProfile() {
    popupEditProfileName.value = profileName.textContent;
    popupEditProfileDescription.value = profileDescription.textContent;
    openPopup(popupEditProfile);
};

function openPopupAddElement() {
    formAddElement.reset();
    openPopup(popupAddElement);
};

function createCard(src, name, template) {
    const card = new Card(src, name, template);
    return card.generateCard();
}

function renderInitialCards() {
    for (let i = 0; i < 6; i ++) {
        elements.append(createCard(initialCards[i].link, initialCards[i].name, '.card-element'));
    };
};

function submitHandlerEditProfileForm (evt) {
    evt.preventDefault();
    profileName.textContent = popupEditProfileName.value;
    profileDescription.textContent = popupEditProfileDescription.value;
    closePopup(popupEditProfile);
};

function submitHandlerAddElementForm (evt) {
    evt.preventDefault();
    elements.prepend(createCard(popupAddElementSrc.value, popupAddElementName.value, '.card-element'));
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