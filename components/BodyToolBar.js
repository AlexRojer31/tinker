export {BodyToolBar};

class BodyToolBar {

    #toolBar = document.createElement('div');

    constructor() {
        this.#setStyle();
    }

    render(root) {
        this.#toolBar.id = 'bodyToolBar';
        if (document.getElementById(this.#toolBar.id) !== null) {
            return false;
        }
        root.appendChild(this.#toolBar);
    }

    #setStyle() {
        this.#toolBar.classList.add('clearfix');
        this.#toolBar.style.width = '100%';
        this.#toolBar.style.height = 'auto';
        this.#toolBar.style.backgroundColor = 'black';
        this.#toolBar.style.position = 'fixed';
        this.#toolBar.style.bottom = '0';
    }
	
	addLabel(Label) {
        Label.render(this.#toolBar);
	}
}