  export class Card {
    constructor (src, name, template, handleCardClick) {
        this._src = src;
        this._name = name;
        this._template = template;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector('.card-element')
            .content
            .querySelector('.element')
            .cloneNode(true);
        
        return cardElement;
    }

    _setEventListeners() {
        this._element.querySelector('.element__like').addEventListener('click', () => {
          this._changeLikeElementStatus();
        });
        this._element.querySelector('.element__trash').addEventListener('click', () => {
          this._removeElement();
        });
        this._elementImage.addEventListener('click', this._handleCardClick);
    }

    _changeLikeElementStatus() {
        this._element.querySelector('.element__like').classList.toggle('element__like_active');
    };

    _removeElement() {
        this._element.remove();
        this._element = null;
    };

    generateCard () {
        this._element = this._getTemplate();
        this._elementImage = this._element.querySelector('.element__image')
        this._setEventListeners();
    
        this._element.querySelector('.element__title').textContent = this._name;
        this._elementImage.src = this._src;
        this._elementImage.alt = this._name;
      
        return this._element;
      }
}