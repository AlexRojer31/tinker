import { BodyToolBar } from "./BodyToolBar.js";
import { Label } from "./Label.js";
import { Application } from "./Application.js";
import { ContextToolBar } from "./ContextToolBar.js";

export {Body};

class Body {

    #body = Body.BODY();
    #bodyToolBar = new BodyToolBar();
	#bodyContextToolBar= new ContextToolBar();

    static BODY() {
        return document.querySelector('body');
    }

    constructor() {
		if (this.#body.id == 'body') {
			return false;
		}
        this.#body.id = 'body';
        this.#setStyle();
		this.#setBodyLabels();
		this.#setBodyToolBar();
		this.#setContextToolBarEvents();
		this.#setEventListeners();
    }

    #setContextToolBarEvents() {
		this.#bodyContextToolBar.addLabel('review', 'bg.png', () => {
			document.location.href = '/';
		});
    }

    #setEventListeners() {
        document.addEventListener('click', () => {
            ContextToolBar.CLEAR();
        });
		document.addEventListener('contextmenu', () => {
			event.stopPropagation();
			event.preventDefault();
            this.#bodyContextToolBar.render(this.#body);
		});
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
	
	#setBodyLabels() {
		new Label('My App', 'bg.png', () => {
            new Application('My Body App').render();
        })
        .render(this.#body);
	}

	#setBodyToolBar() {
		this.#bodyToolBar.render(this.#body);
		this.#bodyToolBar.setLabel(
			new Label('', 'bg.png', () => {
				new Application('My first application').render();
			}));
		this.#bodyToolBar.setLabel(
			new Label('', 'bg.png', () => {
				new Application('My second application').render();
			}));
	}

}
