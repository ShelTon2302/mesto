export class Popup {
    constructor (popupSelector) {
        this._popup = document.querySelector(popupSelector);
    }

    _handleEscClose (evt) {
        if (evt.key === 'Escape') {
            this.close();
        };
    }

    setEventListeners () {
        this._popup.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup_visible')) {
                this.close();
            }
            if (evt.target.classList.contains('popup__close-button')) {
                this.close();
            }
        })
    }

    open () {
        this._popup.classList.add('popup_visible');
        document.addEventListener('keydown', this._handleEscClose.bind(this));
    }

    close () {
        document.removeEventListener('keydown', this._handleEscClose.bind(this));
        this._popup.classList.remove('popup_visible');
    }
}