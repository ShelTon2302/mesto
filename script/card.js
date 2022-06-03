const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ]; 

  class Card {
    constructor (src, name, template) {
        this._src = src;
        this._name = name;
        this._template = template;
        this._popupImg = document.querySelector('.popup_img');
        this._popupImgImg = this._popupImg.querySelector('.popup__img');
        this._popupImgDescription = this._popupImg.querySelector('.popup__description');
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
        this._element.querySelector('.element__image').addEventListener('click', () => {
            this._openPopupImg();
        });
    }

    _changeLikeElementStatus() {
        this._element.querySelector('.element__like').classList.toggle('element__like_active');
    };

    _removeElement() {
        this._element.closest('.element').remove();
    };

    _openPopupImg() {
        this._popupImgImg.src = this._src;
        this._popupImgImg.alt = this._name;
        this._popupImgDescription.textContent = this._name;
        this._popupImg.classList.add('popup_visible');
        document.addEventListener('keydown', (evt) => {
          this._closeByEscape(evt);
        });
    };

    _closeByEscape(evt) {
      if (evt.key === 'Escape') {
        document.removeEventListener('keydown', (evt) => {
          this._closeByEscape(evt);
        });
        this._popupImg.classList.remove('popup_visible');
      };
  };

    generateCard () {
        this._element = this._getTemplate();
        this._setEventListeners();
    
        this._element.querySelector('.element__title').textContent = this._name;
        this._element.querySelector('.element__image').src = this._src;
        this._element.querySelector('.element__image').alt = this._name;
      
        return this._element;
      }
}

export { Card, initialCards };