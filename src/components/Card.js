  export class Card {
    constructor (item, myId, template, handleCardClick, deleteFromServer, changeLikeStatus) {
      this._src = item.link;
      this._name = item.name;
      this._likeArr = item.likes
      this._likeNumber = this._likeArr.length;
      this._liked = false;
      this._cardId = item._id;
      this._myId = myId;
      this._authorId = item.owner._id;
      this._template = template;
      this._handleCardClick = handleCardClick;
      this._deleteFromServer = deleteFromServer;
      this._changeLikeStatus = changeLikeStatus;
    }

    _getTemplate() {
      const cardElement = document
          .querySelector(this._template)
          .content
          .querySelector('.element')
          .cloneNode(true);
        
      return cardElement;
    }

    _setEventListeners() {
      this._elementLike.addEventListener('click', () => {
        this._liked = this._changeLikeStatus(this._cardId, this._liked, this._elementLike, this._elementLikeNumber);
      });
      if (this._authorId === this._myId) {
        this._elementTrash.classList.add('element__trash_visible');
        this._elementTrash.addEventListener('click', () => {
          this._deleteFromServer(this._element, this._cardId);
        });
      };
      this._elementImage.addEventListener('click', this._handleCardClick);
    }

    isLiked(likeArr) {
      this._liked = likeArr.some((item) => {
        return item._id === this._myId;
      });

    };

    generateCard () {
      this._element = this._getTemplate();
      this._elementImage = this._element.querySelector('.element__image');
      this._elementLike = this._element.querySelector('.element__like');
      this._elementLikeNumber = this._element.querySelector('.element__like-number');
      this._elementTrash = this._element.querySelector('.element__trash');
      this.isLiked(this._likeArr);
      if (this._liked) {
        this._elementLike.classList.add('element__like_active');
      }
      this._setEventListeners();
    
      this._element.querySelector('.element__title').textContent = this._name;
      this._elementImage.src = this._src;
      this._elementImage.alt = this._name;
      this._elementLikeNumber.textContent = this._likeNumber;
      return this._element;
      }
}