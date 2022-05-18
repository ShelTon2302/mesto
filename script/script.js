const content = document.querySelector('.content');
const editButton = content.querySelector('.profile-info__edit-button');
const profileName = content.querySelector('.profile-info__name');
const profileDescription = content.querySelector('.profile-info__description');
const addButton = content.querySelector('.profile__add-button');
const elements = content.querySelector('.elements');
const popups = document.querySelectorAll('.popup');
const popupEditProfile = document.querySelector('.popup_profile');
const formEditProfile = popupEditProfile.querySelector('.popup__form_profile');
const popupEditProfileName = popupEditProfile.querySelector('.popup__input_profile_name');
const popupEditProfileDescription = popupEditProfile.querySelector('.popup__input_profile_description');
const popupAddElement = document.querySelector('.popup_add-element');
const formAddElement = popupAddElement.querySelector('.popup__form_add-element');
const popupAddElementName = popupAddElement.querySelector('.popup__input_element_name');
const popupAddElementSrc = popupAddElement.querySelector('.popup__input_element_src');
const popupImg = document.querySelector('.popup_img');
const popupImgImg = popupImg.querySelector('.popup__img');
const popupImgDescription = popupImg.querySelector('.popup__description');
const elementTemplate = document.querySelector('#element').content;

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

function addElement (src, name) {
    const cloneElement = elementTemplate.querySelector('.element').cloneNode(true);
    const cloneElementImg = cloneElement.querySelector('.element__image');
    cloneElementImg.src = src;
    cloneElementImg.alt = name;
    cloneElement.querySelector('.element__title').textContent = name;
    cloneElement.querySelector('.element__like').addEventListener('click', (evt) => changeLikeElementStatus(evt));
    cloneElement.querySelector('.element__trash').addEventListener('click', (evt) => removeElement(evt));
    cloneElementImg.addEventListener('click', () => openPopupImg(src, name));
    return cloneElement;
};

function prependItem(src,name) {
    elements.prepend(addElement(src, name));
};

function removeElement(evt) {
    evt.target.closest('.element').remove();
};

function renderInitialCards() {
    for (let i = 0; i < 6; i ++) {
        prependItem(initialCards[i].link, initialCards[i].name);
    };
};

function changeLikeElementStatus(evt) {
    evt.target.classList.toggle('element__like_active');
};

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
    formEditProfile.querySelector('.popup__save-button').removeAttribute('disabled');
    openPopup(popupEditProfile);
};

function openPopupAddElement() {
    formAddElement.reset();
    formEditProfile.querySelector('.popup__save-button').setAttribute('disabled','');
    openPopup(popupAddElement);
};

function openPopupImg(src, name) {
    popupImgImg.src = src;
    popupImgImg.alt = name;
    popupImgDescription.textContent = name;
    openPopup(popupImg);
};

function submitHandlerEditProfileForm (evt) {
    evt.preventDefault();
    profileName.textContent = popupEditProfileName.value;
    profileDescription.textContent = popupEditProfileDescription.value;
    closePopup(popupEditProfile);
};

function submitHandlerAddElementForm (evt) {
    evt.preventDefault();
    prependItem(popupAddElementSrc.value, popupAddElementName.value);
    closePopup(popupAddElement);
};

renderInitialCards();
editButton.addEventListener('click', openPopupEditProfile);
addButton.addEventListener('click', openPopupAddElement);
formEditProfile.addEventListener('submit', submitHandlerEditProfileForm);
formAddElement.addEventListener('submit', submitHandlerAddElementForm);
