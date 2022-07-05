import '../pages/index.css';

import { Section } from "../components/Section.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithButton } from '../components/popupWithButton.js';
import { UserInfo } from "../components/UserInfo.js";
import { Api } from '../components/Api.js';

const content = document.querySelector('.content');
const elements = content.querySelector('.elements');
const avatar = content.querySelector('.profile__avatar')
const editAvatar = content.querySelector('.profile__avatar-cover');
const editButton = content.querySelector('.profile-info__edit-button');
const addButton = content.querySelector('.profile__add-button');
const popupEditProfileName = document.querySelector('.popup__input_profile_name');
const popupEditProfileDescription = document.querySelector('.popup__input_profile_description');
const formValidators = {};

const cardList = new Section({renderer: (item, myId) => {
    cardList.addItem(createCard(item, myId), true);
}}, elements);

const popupWithImg = new PopupWithImage('.popup_img');

const popupEditAvatar = new PopupWithForm('.popup_avatar', (formData) => {
    api.changeAvatar(formData, addButton);
    avatar.src = formData['avatar-src'];
    formValidators['avatar'].resetValidation();
    popupEditAvatar.close();
});
popupEditAvatar.setEventListeners();

const popupEditProfile = new PopupWithForm('.popup_profile', (formData) => {
    userInfo.setUserInfo(formData);
    api.setProfileInfo(formData);
    formValidators['profile'].resetValidation();
    popupEditProfile.close();
});
popupEditProfile.setEventListeners();

const popupAddElement = new PopupWithForm('.popup_add-element', (formData) => {
    const name = formData["element-name"];
    const link = formData["element-src"];
    api.addCard({name, link});
});
popupAddElement.setEventListeners();

const popupDeleteElement = new PopupWithButton('.popup_delete-element','.popup__button_delete-element', 
    (card, cardId) => {
    api.deleteCard(card, cardId)
})
popupDeleteElement.setEventListeners();

const userInfo = new UserInfo ( { nameSelector: '.profile-info__name', 
                                descriptionSelector: '.profile-info__description'} );

const api = new Api ({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-44',
    headers: {
        authorization: '3bce1e7f-df73-4941-a38f-482936fa7c03',
        'Content-Type': 'application/json'
        }
    }, ((initialCards, myId) => {
        cardList.renderItems(initialCards, myId);
    }), ((item, myId) => {
        cardList.addItem(createCard(item, myId), false);
        formValidators['element'].resetValidation();
        popupAddElement.close(); 
    }), ((card) => {
        card.remove();
        card = null;
        popupDeleteElement.close();
    }),((item, elementLike, LikeNumber) => {
        elementLike.classList.add('element__like_active');
        LikeNumber.textContent = item.likes.length;
    }), ((item, elementLike, LikeNumber) => {
        elementLike.classList.remove('element__like_active');
        LikeNumber.textContent = item.likes.length;
    })
    );

api.getInitialCards(cardList);

function beginValidation(obj) {
    const formList = Array.from(document.querySelectorAll(obj.formSelector));
    formList.forEach((formElement) => {
        const validator = new FormValidator(obj, formElement);
        const formName = formElement.getAttribute('name');
        formValidators[formName] = validator;
        validator.enableValidation();
    });
};

function createCard (item, myId) {
    const card = new Card(item, myId, '.card-element',
    () => {
        popupWithImg.open(item.link, item.name);
    }, (card, cardId) => {
        popupDeleteElement.open(card, cardId);
    },
    (cardId, liked, elementLike, LikeNumber) => {
        if (liked) {
            api.deleteLikeCard(cardId, elementLike, LikeNumber);
        }
        else {
            api.setLikeCard(cardId, elementLike, LikeNumber);
        }
        return !liked;
    });
            
    const cardElement = card.generateCard();
    return cardElement;
}

popupWithImg.setEventListeners();
editAvatar.addEventListener('click', () => {
    formValidators['avatar'].resetValidation();
    popupEditAvatar.open();
})
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

console.log(addButton);
beginValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
  }); 