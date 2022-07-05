export class Api {
    constructor ({baseUrl, headers}, renderInitCards, addNewCard, deleteOneCard, isLike, notLike) {
        this._UrlProfile = `${baseUrl}/users/me`;
        this._UrlAvatar = `${baseUrl}/users/me/avatar`;
        this._UrlCards = `${baseUrl}/cards`;
        this._headers = headers;
        this._renderInitCards = renderInitCards;
        this._addNewCard = addNewCard;
        this._deleteOneCard = deleteOneCard;
        this._isLike =isLike;
        this._notLike = notLike;
        this._popupProfileButton = document.querySelector('.popup__save-button_profile');
        this._popupAddCadrButton = document.querySelector('.popup__save-button_add-element');
        this._editProfileName = document.querySelector('.profile-info__name');
        this._editProfileDescription = document.querySelector('.profile-info__description');
        this._avatar = document.querySelector('.profile__avatar');
    }

    getProfileInfo () {
        console.log(this._popupProfileButton);
        fetch(this._UrlProfile, {
            headers: this._headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                else {
                    return Promise.reject(`Ошибка: ${res.status}`);
                }
            })
            .then((result) => {
                this._editProfileName.textContent = result.name;
                this._editProfileDescription.textContent = result.about;
                this._avatar.src = result.avatar;
                this._myId = result._id;
            })
            .catch((err) => {
                console.log(`Загрузка информации профиля не выполнена: ${err}`);
            })
    }

    setProfileInfo (formData) {
        this._renderLoad(this._popupProfileButton, true, 'Создать');
        fetch(this._UrlProfile, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: formData['profile-name'],
                about: formData['profile-description']
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                else {
                    return Promise.reject(`Ошибка: ${res.status}`);
                }
            })
            .catch((err) => {
                console.log(`Данные профиля не установлены: ${err}`);
            })
            .finally(() => {
                this._renderLoad(this._popupProfileButton, false, 'Создать');
            });
    }

    changeAvatar (formData) {
        fetch(this._UrlAvatar, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: formData['avatar-src'],
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                else {
                    return Promise.reject(`Ошибка: ${res.status}`);
                }
            })
            .catch((err) => {
                console.log(`Аватар не изменен: ${err}`);
            });
    }

    getInitialCards () {
        fetch(this._UrlCards, {
        headers: this._headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                else {
                    return Promise.reject(`Ошибка: ${res.status}`);
                }
             })
            .then((result) => {
                const initialCards = result;
                console.log(initialCards,'1');
                this.getProfileInfo();
                return initialCards;
            })
            .then((initialCards) => {
                console.log(initialCards, this._myId);
                this._renderInitCards(initialCards, this._myId);
            })
            .catch((err) => {
                console.log(`Загрузка карточек не выполнена: ${err}`);
            })
    }

    addCard (Data) {
        this._renderLoad(this._popupAddCadrButton, true, 'Сохранить');
        fetch(this._UrlCards, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: Data.name,
                link: Data.link
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                else {
                    return Promise.reject(`Ошибка: ${res.status}`);
                }
            })
            .then((result) => {
               this._addNewCard(result, this._myId);
            })
            .catch((err) => {
                console.log(`Добавление карточки не выполнено: ${err}`);
            })
            .finally(() => {
                this._renderLoad(this._popupAddCadrButton, false, 'Сохранить');
            });
    }

    deleteCard (card, cardId, callback) {
        console.log(cardId);
        console.log(`${this._UrlCards}/${cardId}`);
        fetch(`${this._UrlCards}/${cardId}`, {
            method: 'DELETE',
            headers: this._headers,
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }   
                else {
                    return Promise.reject(`Ошибка: ${res.status}`);
                }
            })
            .then(() => {
                this._deleteOneCard(card);
            })
            .catch((err) => {
                console.log(`Удаление карточки не выполнено: ${err}`);
            });
    }

    setLikeCard (cardId, elementLike, LikeNumber) {
        fetch(`${this._UrlCards}/${cardId}/Likes`, {
            method: 'PUT',
            headers: this._headers,
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                else {
                    return Promise.reject(`Ошибка: ${res.status}`);
                }
            })
            .then((result) => {
                this._isLike(result, elementLike, LikeNumber);
            });
    }

    deleteLikeCard (cardId, elementLike, LikeNumber) {
        fetch(`${this._UrlCards}/${cardId}/Likes`, {
            method: 'DELETE',
            headers: this._headers,
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                else {
                    return Promise.reject(`Ошибка: ${res.status}`);
                }
            })
            .then((result) => {
                this._notLike(result, elementLike, LikeNumber);
            })
    }

    _renderLoad (popupButton, isLoad, text) {
        if (isLoad) {
            popupButton.textContent = 'Сохранение...'
        }
        else {
            popupButton.textContent = text;
        }
    }
    
}