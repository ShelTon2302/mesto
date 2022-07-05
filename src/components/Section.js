export class Section {
    constructor ({renderer}, container) {
        //this._renderedItems = items;
        this._container = container;
        this._renderer = renderer;        
    }

    renderItems (items, myId) {
        items.forEach(item => {
            this._renderer(item, myId);
        });
    }

    addItem (element, type) {
        if (type) {
            this._container.append(element);
        } else {
            this._container.prepend(element);
        }   
    }
}