const popupImg = document.querySelector('.popup_img');
const popupImgImg = popupImg.querySelector('.popup__img');
const popupImgDescription = popupImg.querySelector('.popup__description');

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

function openPopupImg(src, name) {
    popupImgImg.src = src;
    popupImgImg.alt = name;
    popupImgDescription.textContent = name;
    openPopup(popupImg);
};

export { openPopup, closePopup, closeByEscape, openPopupImg };