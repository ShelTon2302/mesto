import { Popup } from "./popup.js";

export class PopupWithButton extends Popup {
    constructor (popupSelector, buttonSelector, clickButton) {
        super (popupSelector);
        this._button = this._popup.querySelector(buttonSelector);
        this._clickButton = clickButton;
        //this._cardId ='';
    }

    setEventListeners () {
        super.setEventListeners();
        this._button.addEventListener('click', () => {
            this._clickButton(this._card, this._cardId);
        });
    }

    open(card, cardId) {
        super.open();
        this._card = card
        this._cardId = cardId;
        console.log(this._card, this._cardId)
    }
}