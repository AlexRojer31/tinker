import { ToolBar } from "./ToolBar.js";
import { Label } from "./Label.js";
import { Application } from "./Application.js";
import { ContextToolBar } from "./ContextToolBar.js";

export {Body};

class Body {

    #body;
    #toolBar;
	#contextToolBar;

    static body() {
        return document.querySelector('body');
    }

    constructor() {
        this.#body = Body.body();
		if (this.#body.id == 'body') {
			return false;
		}
        this.#body.id = 'body';
        this.#toolBar = new ToolBar();
		this.#toolBar.render(this.#body);
		this.#toolBar.setLabel(
			new Label('', 'bg.png', () => {
				new Application('My first application').render();
			}));
		this.#toolBar.setLabel(
			new Label('', 'bg.png', () => {
				new Application('My second application').render();
			}));
        this.#setStyle();
		this.#setLabels();
		this.#contextToolBar = new ContextToolBar();
    }
	
	#setStyle() {
		this.#body.style.position = 'relative';
		this.#body.style.backgroundImage = 'url("bg.png")';
		this.#body.style.backgroundRepeat = 'no-repeat';
		this.#body.style.backgroundPosition = 'center center';
		this.#body.style.backgroundAttachment = 'fixed';
		this.#body.style.backgroundAttachment = '100%';
		this.#body.style.backgroundSize = 'cover';
	}
	
	#setLabels() {
		new Label('My App', 'bg.png', () => {
            new Application('My Body App').render();
        })
        .render(this.#body);
	}

}
