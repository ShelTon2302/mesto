export class Api {
    constructor ({baseUrl, headers}) {
        this._UrlProfile = `${baseUrl}/users/me`;
        this._UrlAvatar = `${baseUrl}/users/me/avatar`;
        this._UrlCards = `${baseUrl}/cards`;
        this._headers = headers;
        this._editProfileName = document.querySelector('.profile-info__name');
        this._editProfileDescription = document.querySelector('.profile-info__description');
        this._avatar = document.querySelector('.profile__avatar');
        this._myId = '';
    }

    getProfileInfo (callback) {
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
            .then(() => {
                callback();
            })
            .catch((err) => {
                console.log(`Загрузка информации профиля не выполнена: ${err}`);
            })
    }

    setProfileInfo (formData) {
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

    getInitialCards (cardList, callback) {
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
                console.log(initialCards);
                callback(cardList, initialCards, this._myId);
            })
            .catch((err) => {
                console.log(`Загрузка карточек не выполнена: ${err}`);
            })
    }

    //findCard (Data) {
    //    const card = {};
    //    fetch(this._UrlCards, {
    //        headers: this._headers,
    //        body: JSON.stringify({
    //            name: Data.name,
    //            link: Data.link
    //        })
    //    })
    //        .then(res => {
    //            if (res.ok) {
    //                return res.json()
    //            }
    //            else {
    //                return Promise.reject(`Ошибка: ${res.status}`);
    //            }
    //        })
    //        .then((result) => {
    //            card = result;
    //        })
    //        .catch((err) => {
    //            console.log(`Карточка не найдена: ${err}`);
    //        });
    //    return card;
    //}


    addCard (Data, renderCard) {
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
               renderCard(result, this._myId);
            })
            .catch((err) => {
                console.log(`Добавление карточки не выполнено: ${err}`);
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
                callback(card);
            })
            .catch((err) => {
                console.log(`Удаление карточки не выполнено: ${err}`);
            });
    }

    setLikeCard (cardId, elementLike, LikeNumber, callback) {
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
                callback(result, elementLike, LikeNumber);
            });
    }

    deleteLikeCard (cardId, elementLike, LikeNumber, callback) {
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
                callback(result, elementLike, LikeNumber);
            })
    }
}