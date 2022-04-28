let content = document.querySelector('.content');
let editButton = content.querySelector('.profile-info__edit-button');
let profileName = content.querySelector('.profile-info__name');
let profileDescription = content.querySelector('.profile-info__description');
let addButton = content.querySelector('.profile__add-button');
let elements = content.querySelector('.elements');
let elementLike;
let elementTrash;
let popupEditProfile = document.querySelector('.popup-edit-profile');
let formEditProfile = popupEditProfile.querySelector('.popup-edit-profile__form');
let closeEditProfileButton = popupEditProfile.querySelector('.popup-edit-profile__close-button');
let popupEditProfileName = popupEditProfile.querySelector('.popup-edit-profile__input_type_name');
let popupEditProfileDescription = popupEditProfile.querySelector('.popup-edit-profile__input_type_description');
let popupAddElement = document.querySelector('.popup-add-element');
let formAddElement = popupAddElement.querySelector('.popup-add-element__form');
let closeAddElementButton = popupAddElement.querySelector('.popup-add-element__close-button');
let popupAddElementName = popupAddElement.querySelector('.popup-add-element__input_type_name');
let popupAddElementSrc = popupAddElement.querySelector('.popup-add-element__input_type_src');

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
    for (let i = 0; i < elementLike.length; i++) {
        elementLike[i].addEventListener('click', (eve) => changeLikeElementStatus(eve));
        elementTrash[i].addEventListener('click', (eve) => elementRemove(eve));
    };
}

function enablePopupEditProfile() {
    popupEditProfileName.value = profileName.textContent;
    popupEditProfileDescription.value = profileDescription.textContent;
    popupEditProfile.classList.add('popup_visible');
}

function disablePopup(popup) {
    popup.classList.remove('popup_visible');
}

function enablePopupAddElement() {
    popupAddElementName.value = '';
    popupAddElementSrc.value = '';
    popupAddElement.classList.add('popup_visible');
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
    elementLike[0].addEventListener('click', (eve) => changeLikeElementStatus(eve))
    elementTrash[0].addEventListener('click', (eve) => elementRemove(eve))
    disablePopup(popupAddElement);
}

function changeLikeElementStatus(eve) {
        if (eve.target.classList.contains('element__like_active')) {
            eve.target.classList.remove('element__like_active');
        }
        else {
            eve.target.classList.add('element__like_active');
        };
}

function elementRemove(eve) {
    console.log(eve.path[1]);
    eve.path[1].remove();

}

startElement();
editButton.addEventListener('click', enablePopupEditProfile);
addButton.addEventListener('click', enablePopupAddElement);
closeEditProfileButton.addEventListener('click', () => disablePopup(popupEditProfile));
closeAddElementButton.addEventListener('click', () => disablePopup(popupAddElement));
formEditProfile.addEventListener('submit', editProfileFormSubmitHandler);
formAddElement.addEventListener('submit', addElementFormSubmitHandler);
/*for (let i = 0; i < elementLike.length; i++) {
    elementLike[i].addEventListener('click', (eve) => changeLikeElementStatus(eve));
}






/*elements.addEventListener("click", event => clickElementButton(event.this));



elementLike = elements.querySelectorAll('.element__like');*/
console.log(elementTrash);