let content = document.querySelector('.content');
let editButton = content.querySelector('.profile-info__edit-button');
let addButton = content.querySelector('.profile__add-button');
let saveButton = content.querySelector('.pop-up__button');
let closeButton = content.querySelector('.pop-up__close');
let popup = content.querySelector('.overlay');
let profileName = content.querySelector('.profile-info__name')
let profileDescription = content.querySelector('.profile-info__description')
let popupName = content.querySelector('.pop-up__input_type_name')
let popupDescription = content.querySelector('.pop-up__input_type_description')


function enablePopUp() {
    popup.classList.remove('overlay_display_none');
    popupName.setAttribute('placeholder', profileName.textContent)
    popupDescription.setAttribute('placeholder', profileDescription.textContent)
}

function disablePopUp() {
    popup.classList.add('overlay_display_none');
}

function saveProfile() {
    profileName.textContent = popupName.value;
    profileDescription.textContent = popupDescription.value;
    popupName.value = '';
    popupDescription.value = '';

    disablePopUp();
}

editButton.addEventListener('click', enablePopUp);
closeButton.addEventListener('click', disablePopUp);
saveButton.addEventListener('click', saveProfile)

console.log(profileDescription.textContent);
console.log(profileName.textContent);
console.log(popupDescription.getAttribute('placeholder'));
console.log(popupName.value);