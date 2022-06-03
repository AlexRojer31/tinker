export {ContextToolBar};

class ContextToolBar {

    #toolBar;

    constructor() {
        this.#createComponent();
        this.#setStyle();
    }

    render(root) {
        this.#toolBar.id = root.id + 'ToolBar';
        if (document.getElementById(this.#toolBar.id) !== null) {
            return false;
        }
        root.appendChild(this.#toolBar);
    }

    #createComponent() {
        this.#toolBar = document.createElement('div');
    }

    #setStyle() {
        this.#toolBar.style.width = '100%';
        this.#toolBar.style.height = '40px';
        this.#toolBar.style.backgroundColor = 'black';
        this.#toolBar.style.position = 'fixed';
        this.#toolBar.style.bottom = '0';
    }
	
	setLabel(label) {
        label.render(this.#toolBar);
	}
}