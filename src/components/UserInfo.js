export let myId = '';

export class UserInfo {
    constructor ({nameSelector, descriptionSelector, avatarSelector}) {
        this._nameSelector = nameSelector;
        this._descriptionSelector = descriptionSelector;
        this._avatarSelector = avatarSelector;
        this._myId = myId;
        this._name = document.querySelector(this._nameSelector);
        this._description = document.querySelector(this._descriptionSelector);
        this._avatar = document.querySelector(this._avatarSelector);
    }

    getUserInfo () {
        return { 'name': this._name.textContent, 
                'about': this._description.textContent,
                'avatar': this._avatar.src,
                '_id': myId };
    }

    setUserInfo (info) {
        this._name.textContent = info.name;
        this._description.textContent = info.about;
        this._avatar.src = info.avatar;
        myId = info._id;
    }
}