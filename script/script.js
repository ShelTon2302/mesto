let content = document.querySelector('.content');
let editButton = content.querySelector('.profile-info__edit-button');
let popup = document.querySelector('.popup');
let form = popup.querySelector('.popup__form');
let closeButton = popup.querySelector('.popup__closeButton');
let profileName = content.querySelector('.profile-info__name');
let profileDescription = content.querySelector('.profile-info__description');
let popupName = popup.querySelector('input[name="name"]');
let popupDescription = popup.querySelector('input[name="description"]');
let likeButton = content.querySelector('.element__like');

function enablePopup() {
    popupName.value = profileName.textContent;
    popupDescription.value = profileDescription.textContent;
    popup.classList.add('popup_state_visible');
}

function disablePopup() {
    popup.classList.remove('popup_state_visible');
}

function saveProfile() {
    profileName.textContent = popupName.value;
    profileDescription.textContent = popupDescription.value;
    disablePopup();
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    const nameForm = popupName.value;
    const infoForm = popupDescription.value;
    profileName.textContent = nameForm;
    profileDescription.textContent = infoForm;
    disablePopup();
}

editButton.addEventListener('click', enablePopup);
closeButton.addEventListener('click', disablePopup);
form.addEventListener('submit', formSubmitHandler); 