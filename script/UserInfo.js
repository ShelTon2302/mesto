export class UserInfo {
    constructor ({nameSelector, descriptionSelector}) {
        this._nameSelector = nameSelector;
        this._descriptionSelector = descriptionSelector;
        this._name = document.querySelector(this._nameSelector);
        this._description = document.querySelector(this._descriptionSelector);
    }

    getUserInfo () {
        return { name: this._name.textContent, 
            description: this._description.textContent };
    }

    setUserInfo (info) {
        this._name.textContent = info[0].value;
        this._description.textContent = info[1].value;
    }
}