import { Card } from "./card.js";
import { initialCards } from "./initialcards.js";
import { popupEditProfile, popupAddElement,formAddElement, closePopup, openPopupEditProfile, 
         openPopupAddElement } from "./popups.js";
import { FormValidator } from "./FormValidator.js";

const content = document.querySelector('.content');
const elements = content.querySelector('.elements');
const editButton = content.querySelector('.profile-info__edit-button');
const profileName = content.querySelector('.profile-info__name');
const profileDescription = content.querySelector('.profile-info__description');
const addButton = content.querySelector('.profile__add-button');
const formEditProfile = popupEditProfile.querySelector('.popup__form_profile');
const popupAddElementName = popupAddElement.querySelector('.popup__input_element_name');
const popupAddElementSrc = popupAddElement.querySelector('.popup__input_element_src');

function createCard(src, name, template, prepend) {
    const card = new Card(src, name, template);
    const cardElement = card.generateCard();

    // Добавляем в DOM
    if (prepend) {
        elements.prepend(cardElement);
    }
    else {
        elements.append(cardElement);
    }
    
}

function renderInitialCards() {
    for (let i = 0; i < 6; i ++) {
        createCard(initialCards[i].link, initialCards[i].name, '.card-element', false);
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
    createCard(popupAddElementSrc.value, popupAddElementName.value, '.card-element', true);
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