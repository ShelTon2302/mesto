import '../pages/index.css';

import { Section } from "./Section.js";
import { Card } from "./Card.js";
import { initialCards } from "./initialcards.js";
import { FormValidator } from "./FormValidator.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { UserInfo } from "./UserInfo.js";

const content = document.querySelector('.content');
const elements = content.querySelector('.elements');
const editButton = content.querySelector('.profile-info__edit-button');
const addButton = content.querySelector('.profile__add-button');
const popupEditProfile = document.querySelector('.popup_profile')
const formEditProfile = popupEditProfile.querySelector('.popup__form_profile');
const editProfileSubmitButton = formEditProfile.querySelector('.popup__save-button');
const popupEditProfileName = popupEditProfile.querySelector('.popup__input_profile_name');
const popupEditProfileDescription = popupEditProfile.querySelector('.popup__input_profile_description');
const popupAddElement = document.querySelector('.popup_add-element');
const popupAddElementName = popupAddElement.querySelector('.popup__input_element_name');
const popupAddElementSrc = popupAddElement.querySelector('.popup__input_element_src');
const formAddElement = popupAddElement.querySelector('.popup__form_add-element');
const addElementSubmitButton = formAddElement.querySelector('.popup__save-button');
const formValidators = [];

const cardList = new Section({items: initialCards, renderer: (item) => {
    const card = new Card(item.link, item.name, '.card-element',
    () => {
        popupWithImg.open(item.link, item.name);
    });
            
    const cardElement = card.generateCard();

    cardList.addItem(cardElement, true);

}}, elements);

const popupWithImg = new PopupWithImage('.popup_img');


const formProfile = new PopupWithForm('.popup_profile', (evt) => {
    evt.preventDefault();
    userInfo.setUserInfo(formProfile._getInputValues());
    formValidators.find(item => item.name == 'profile').disabledButton(editProfileSubmitButton);
    formProfile.close();
});
formProfile.setEventListeners();

const formElement = new PopupWithForm('.popup_add-element', (evt) => {
    evt.preventDefault();
    const name = popupAddElementName.value;
    const link = popupAddElementSrc.value;
    const card = new Card(link, name, '.card-element',
    () => {
        popupWithImg.open(link, name);
    });
    const cardElement = card.generateCard();
    cardList.addItem(cardElement, false);
    cardList.renderItems();
    
    formValidators.find(item => item.name == 'element').disabledButton(addElementSubmitButton);
    formElement.close();
});
formElement.setEventListeners();

const userInfo = new UserInfo ( { nameSelector: '.profile-info__name', 
                                descriptionSelector: '.profile-info__description'} );

function beginValidation(obj) {
    const formList = Array.from(document.querySelectorAll(obj.formSelector));
    formList.forEach((formElement) => {
        const formValidator = new FormValidator(obj, formElement);
        formValidators.push(formValidator);
        formValidator.enableValidation();
    });
};

cardList.renderItems();
popupWithImg.setEventListeners();
editButton.addEventListener('click', () => {
    const info = userInfo.getUserInfo();
    popupEditProfileName.value = info.name;
    popupEditProfileDescription.value = info.description;
    formProfile.open();
});
addButton.addEventListener('click', formElement.open.bind(formElement));

beginValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
  }); 