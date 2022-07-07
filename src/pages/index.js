import '../pages/index.css';

import { Section } from "../components/Section.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithButton } from '../components/popupWithButton.js';
import { UserInfo, myId } from "../components/UserInfo.js";
import { Api } from '../components/Api.js';

const content = document.querySelector('.content');
const elements = content.querySelector('.elements');
const editAvatar = content.querySelector('.profile__avatar-cover');
const editButton = content.querySelector('.profile-info__edit-button');
const addButton = content.querySelector('.profile__add-button');
const popupEditProfileName = document.querySelector('.popup__input_profile_name');
const popupEditProfileDescription = document.querySelector('.popup__input_profile_description');
const popupProfileButton = document.querySelector('.popup__save-button_profile');
const popupAddCadrButton = document.querySelector('.popup__save-button_add-element');
const formValidators = {};

const cardList = new Section({renderer: (item, myId) => {
    cardList.addItem(createCard(item, myId), true);
}}, elements);

const popupWithImg = new PopupWithImage('.popup_img');

const popupEditAvatar = new PopupWithForm('.popup_avatar', (formData) => {
    api.changeAvatar(formData)
        .then((result) => {
            userInfo.setUserInfo(result);
            formValidators['avatar'].resetValidation();
            popupEditAvatar.close();
        })
        .catch((err) => {
            console.log(`Аватар не изменен: ${err}`);
        });
});
popupEditAvatar.setEventListeners();

const popupEditProfile = new PopupWithForm('.popup_profile', (formData) => {
    renderLoad(popupProfileButton, true, 'Создать');
    api.setProfileInfo(formData)
        .then((result) => {
            userInfo.setUserInfo(result);
            formValidators['profile'].resetValidation();
            popupEditProfile.close();
        })
        .then(() => {
            
        })
        .catch((err) => {
            console.log(`Данные профиля не установлены: ${err}`);
        })
        .finally(() => {
            renderLoad(popupProfileButton, false, 'Создать');
        });
    
});
popupEditProfile.setEventListeners();

const popupAddElement = new PopupWithForm('.popup_add-element', (formData) => {
    const name = formData["element-name"];
    const link = formData["element-src"];
    renderLoad(popupAddCadrButton, true, 'Сохранить');
    api.addCard({name, link})
        .then((result) => {
            console.log(result);
            cardList.addItem(createCard(result, myId), false);
            formValidators['element'].resetValidation();
            popupAddElement.close(); 
        })
        .catch((err) => {
            console.log(`Добавление карточки не выполнено: ${err}`);
        })
        .finally(() => {
            renderLoad(popupAddCadrButton, false, 'Сохранить');
        });

        
});
popupAddElement.setEventListeners();

const popupDeleteElement = new PopupWithButton('.popup_delete-element','.popup__button_delete-element', 
    (card, cardId) => {
    api.deleteCard(cardId)
        .then(() => {
            card.remove();
            card = null;
            popupDeleteElement.close();
        })
        .catch((err) => {
            console.log(`Удаление карточки не выполнено: ${err}`);
        });

})
popupDeleteElement.setEventListeners();

const userInfo = new UserInfo ( { nameSelector: '.profile-info__name', 
    descriptionSelector: '.profile-info__description', avatarSelector:
    '.profile__avatar'}, myId );

const api = new Api ({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-44',
    headers: {
        authorization: '3bce1e7f-df73-4941-a38f-482936fa7c03',
        'Content-Type': 'application/json'
        }
    });

Promise.all([api.getProfileInfo(), api.getInitialCards()])
    .then(([userData, initialCards]) => {
        userInfo.setUserInfo(userData);
        cardList.renderItems(initialCards, myId);
    })
    .catch((err) => {
        console.log(`Карточки не загружены: ${err}`);
    });

function beginValidation(obj) {
    const formList = Array.from(document.querySelectorAll(obj.formSelector));
    formList.forEach((formElement) => {
        const validator = new FormValidator(obj, formElement);
        const formName = formElement.getAttribute('name');
        formValidators[formName] = validator;
        validator.enableValidation();
    });
};

function renderLoad (popupButton, isLoad, text) {
    if (isLoad) {
        popupButton.textContent = 'Сохранение...'
    }
    else {
        popupButton.textContent = text;
    }
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
            api.removeLikeCard(cardId)
                .then((result) => {
                    elementLike.classList.remove('element__like_active');
                    LikeNumber.textContent = result.likes.length;
                })
                .catch((err) => {
                    console.log(`Like с карточки не снят: ${err}`);
                });
        }
        else {
            api.setLikeCard(cardId)
                .then((result) => {
                    elementLike.classList.add('element__like_active');
                    LikeNumber.textContent = result.likes.length;
                })
                .catch((err) => {
                    console.log(`Like карточки не добавлен: ${err}`);
                });
;
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
    popupEditProfileName.value = formData.name;
    popupEditProfileDescription.value = formData.about;
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