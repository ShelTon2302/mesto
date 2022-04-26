let content = document.querySelector('.content');
let editButton = content.querySelector('.profile-info__edit-button');
let popup = document.querySelector('.popup');
let form = popup.querySelector('.popup__form');
let closeButton = popup.querySelector('.popup__close-button');
let profileName = content.querySelector('.profile-info__name');
let profileDescription = content.querySelector('.profile-info__description');
let popupName = popup.querySelector('.popup__input_type_name');
let popupDescription = popup.querySelector('.popup__input_type_description');
let elements = content.querySelector('.elements');

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
    for (let i = 0; i < 6; i += 1) {
        const elementTemplate = document.querySelector('#element').content;
        const startElement = elementTemplate.querySelector('.element').cloneNode(true);
        startElement.querySelector('.element__image').src = initialCards[i].link;
        startElement.querySelector('.element__image').alt = initialCards[i].name;
        startElement.querySelector('.element__title').textContent = initialCards[i].name;
        elements.append(startElement);
        
        console.log(startElement.querySelector('.element__image').src);
        console.log(startElement.querySelector('.element__image').alt);
        console.log(startElement.querySelector('.element__title').value);

    }
}

function enablePopup() {
    popupName.value = profileName.textContent;
    popupDescription.value = profileDescription.textContent;
    popup.classList.add('popup_visible');
}

function disablePopup() {
    popup.classList.remove('popup_visible');
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = popupName.value;
    profileDescription.textContent = popupDescription.value;
    disablePopup();
}

startElement();
editButton.addEventListener('click', enablePopup);
closeButton.addEventListener('click', disablePopup);
form.addEventListener('submit', formSubmitHandler); 