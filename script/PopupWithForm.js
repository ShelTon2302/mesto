import { Popup } from "./popup.js";

export class PopupWithForm extends Popup {
    constructor (popupSelector, submitHandler) {
        super (popupSelector);
        this._submitHandler = submitHandler;
        this._popupForm = this._popup.querySelector('.popup__form')
    }

    _getInputValues () {
        this._inputList = Array.from(this._popupForm.querySelectorAll('.popup__input'));
        const inputValues = [];
        this._inputList.forEach((inputElement) => {
            inputValues.push({ name: inputElement.name, value: inputElement.value});
        });
        return inputValues;
    }

    setEventListeners () {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', this._submitHandler);
    }

    close () {
        super.close();
        this._popupForm.reset();
    }
}