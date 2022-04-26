let content = document.querySelector('.content');
let editButton = content.querySelector('.profile-info__edit-button');
let popup = document.querySelector('.popup');
let form = popup.querySelector('.popup__form');
let closeButton = popup.querySelector('.popup__close-button');
let profileName = content.querySelector('.profile-info__name');
let profileDescription = content.querySelector('.profile-info__description');
let popupName = popup.querySelector('.popup__input_type_name');
let popupDescription = popup.querySelector('.popup__input_type_description');

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

editButton.addEventListener('click', enablePopup);
closeButton.addEventListener('click', disablePopup);
form.addEventListener('submit', formSubmitHandler); 