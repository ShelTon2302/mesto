export class Section {
    constructor ({items, renderer}, container) {
        this._renderedItems = items;
        this._container = container;
        this._renderer = renderer;        
    }

    renderItems () {
        this._renderedItems.forEach(item => {
            this._renderer(item);
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