import { Label } from "./Label.js";
import { Application } from "./Application.js";

export {ToolBar};

class ToolBar {

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
        this.#toolBar.classList.add('clearfix');
    }

    #setStyle() {
        this.#toolBar.style.width = '100%';
        this.#toolBar.style.height = 'auto';
        this.#toolBar.style.backgroundColor = 'black';
        this.#toolBar.style.position = 'fixed';
        this.#toolBar.style.bottom = '0';
    }
	
	setLabel(label) {
        label.render(this.#toolBar);
	}
}