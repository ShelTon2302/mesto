export class Api {
    constructor ( {baseUrl, headers} ) {
        this._UrlProfile = `${baseUrl}/users/me`;
        this._UrlAvatar = `${baseUrl}/users/me/avatar`;
        this._UrlCards = `${baseUrl}/cards`;
        this._headers = headers;
    }

    _checkResponce(res) {
        if (res.ok) {
            return res.json()
        }
        else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    }

    getProfileInfo () {
        return fetch(this._UrlProfile, {
            headers: this._headers
        })
            .then(this._checkResponce)
    }

    setProfileInfo (formData) {
        return fetch(this._UrlProfile, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: formData['profile-name'],
                about: formData['profile-description']
            })
        })
            .then(this._checkResponce)
    }

    changeAvatar (formData) {
        return fetch(this._UrlAvatar, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: formData['avatar-src'],
            })
        })
            .then(this._checkResponce)
    }

    getInitialCards () {
        return fetch(this._UrlCards, {
        headers: this._headers
        })
            .then(this._checkResponce)
    }

    addCard (Data) {
        return fetch(this._UrlCards, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: Data.name,
                link: Data.link
            })
        })
            .then(this._checkResponce)

    }

    deleteCard (cardId) {
        return fetch(`${this._UrlCards}/${cardId}`, {
            method: 'DELETE',
            headers: this._headers,
        })
            .then(this._checkResponce)
    }

    setLikeCard (cardId) {
        return fetch(`${this._UrlCards}/${cardId}/Likes`, {
            method: 'PUT',
            headers: this._headers,
        })
            .then(this._checkResponce)
    }

    removeLikeCard (cardId) {
        return fetch(`${this._UrlCards}/${cardId}/Likes`, {
            method: 'DELETE',
            headers: this._headers,
        })
            .then(this._checkResponce)
    }
}