import { Popup } from "./popup.js";

export class PopupWithImage extends Popup {
    constructor (popupSelector) {
        super (popupSelector);
        this._popupImg = this._popup.querySelector('.popup__img');
        this._popupDescription = this._popup.querySelector('.popup__description');
    }

    open (src, name) {
        this._popupImg.src = src;
        this._popupImg.alt = name;
        this._popupDescription.textContent = name;
        super.open();
    }
}