import '../pages/index.css';

import { Section } from "../components/Section.js";
import { Card } from "../components/Card.js";
import { initialCards } from "../utils/initialcards.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";

const content = document.querySelector('.content');
const elements = content.querySelector('.elements');
const editButton = content.querySelector('.profile-info__edit-button');
const addButton = content.querySelector('.profile__add-button');
const popupEditProfileName = document.querySelector('.popup__input_profile_name');
const popupEditProfileDescription = document.querySelector('.popup__input_profile_description');
const formValidators = {};

const cardList = new Section({items: initialCards, renderer: (item) => {
    cardList.addItem(createCard(item), true);
}}, elements);

const popupWithImg = new PopupWithImage('.popup_img');


const popupEditProfile = new PopupWithForm('.popup_profile', (formData) => {
    userInfo.setUserInfo(formData);
    formValidators['profile'].resetValidation();
    popupEditProfile.close();
});
popupEditProfile.setEventListeners();

const popupAddElement = new PopupWithForm('.popup_add-element', (formData) => {
    const name = formData["element-name"];
    const link = formData["element-src"];;
    cardList.addItem(createCard({name, link}), false);
    
    formValidators['element'].resetValidation();
    popupAddElement.close();
});
popupAddElement.setEventListeners();

const userInfo = new UserInfo ( { nameSelector: '.profile-info__name', 
                                descriptionSelector: '.profile-info__description'} );

function beginValidation(obj) {
    const formList = Array.from(document.querySelectorAll(obj.formSelector));
    formList.forEach((formElement) => {
        const validator = new FormValidator(obj, formElement);
        const formName = formElement.getAttribute('name');
        formValidators[formName] = validator;
        validator.enableValidation();
    });
};

function createCard (item) {
    const card = new Card(item.link, item.name, '.card-element',
    () => {
        popupWithImg.open(item.link, item.name);
    });
            
    const cardElement = card.generateCard();
    return cardElement;
}

cardList.renderItems();
popupWithImg.setEventListeners();
editButton.addEventListener('click', () => {
    formValidators['profile'].resetValidation();
    const formData = userInfo.getUserInfo();
    popupEditProfileName.value = formData['profile-name'];
    popupEditProfileDescription.value = formData['profile-description'];
    popupEditProfile.open();
});
addButton.addEventListener('click', () => {
    formValidators['element'].resetValidation();
    popupAddElement.open();
});


beginValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
  }); 