export class UserInfo {
    constructor ({nameSelector, descriptionSelector}) {
        this._nameSelector = nameSelector;
        this._descriptionSelector = descriptionSelector;
        this._name = document.querySelector(this._nameSelector);
        this._description = document.querySelector(this._descriptionSelector);
    }

    getUserInfo () {
        return { 'profile-name': this._name.textContent, 
            'profile-description': this._description.textContent };
    }

    setUserInfo (info) {
        this._name.textContent = info['profile-name'];
        this._description.textContent = info['profile-description'];
    }
}