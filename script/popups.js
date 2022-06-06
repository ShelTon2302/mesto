const popups = document.querySelectorAll('.popup');
const popupEditProfile = document.querySelector('.popup_profile');
const popupEditProfileName = popupEditProfile.querySelector('.popup__input_profile_name');
const popupEditProfileDescription = popupEditProfile.querySelector('.popup__input_profile_description');
const popupAddElement = document.querySelector('.popup_add-element');
const formAddElement = popupAddElement.querySelector('.popup__form_add-element');
const popupImg = document.querySelector('.popup_img');
const popupImgImg = popupImg.querySelector('.popup__img');
const popupImgDescription = popupImg.querySelector('.popup__description');

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_visible')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__close-button')) {
            closePopup(popup)
        }
    })
})

function openPopup(popup) {
    popup.classList.add('popup_visible');
    document.addEventListener('keydown', closeByEscape);
};

function closePopup(popup) {
    document.removeEventListener('keydown', closeByEscape);
    popup.classList.remove('popup_visible');
};

function closeByEscape(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_visible');
        closePopup(openedPopup);
    };
};

function openPopupEditProfile() {
    popupEditProfileName.value = profileName.textContent;
    popupEditProfileDescription.value = profileDescription.textContent;
    openPopup(popupEditProfile);
};

function openPopupAddElement() {
    formAddElement.reset();
    formAddElement.querySelector('.popup__save-button').setAttribute('disabled','');
    openPopup(popupAddElement);
};

function openPopupImg(src, name) {
    popupImgImg.src = src;
    popupImgImg.alt = name;
    popupImgDescription.textContent = name;
    openPopup(popupImg);
};

export { popupEditProfile, popupAddElement, formAddElement, openPopup, closePopup, 
         closeByEscape, openPopupEditProfile, openPopupAddElement, openPopupImg };