import { BodyToolBar } from "./BodyToolBar.js";
import { BodyToolBarLabel } from "./BodyToolBarLabel.js";
import { Application } from "./Application.js";
import { ContextToolBar } from "./ContextToolBar.js";
import { ContextToolBarLabel } from "./ContextToolBarLabel.js";
import { BodyLabel } from "./BodyLabel.js";
import { Ajax } from "./Ajax.js";

import { Saper } from "../applications/saper/Saper.js";

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
		this.#bodyContextToolBar.addLabel(new ContextToolBarLabel('review', 'bg.png', () => {
			document.location.href = '/';
		}));
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
		new BodyLabel('Saper', 'applications/saper/bomb.png', () => {
			new Saper();
        })
        .render(this.#body);
	}

	#setBodyToolBar() {
		this.#bodyToolBar.render(this.#body);
		this.#bodyToolBar.addLabel(
			new BodyToolBarLabel('CRUD CORS', 'bg.png', () => {
				let app = new Application('CRUD CORS');
				let ajax = new Ajax().get('http://home.alexrojer31.ru:8100/simple', show);
				function show() {
					let user = JSON.parse(ajax.response);
					app.getWorkSpace().innerHTML = user.name;
					app.render();
				}
			}));
	

	}

}
