import { BodyToolBar } from './BodyToolBar.js';
import { BodyToolBarLabel } from './BodyToolBarLabel.js';
import { ContextToolBar } from './ContextToolBar.js';
import { ContextToolBarLabel } from './ContextToolBarLabel.js';
import { BodyLabel } from './BodyLabel.js';

// import { Snap } from '../../applications/snap/Snap.js';
import { Temp } from '../../applications/temp/Temp.js';
import { Application } from './Application.js';

import { Ajax } from '../tools/Ajax.js';

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
		this.#bodyContextToolBar.addLabel(new ContextToolBarLabel('review', 'def.svg', () => {
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
		this.#body.style.backgroundColor = 'rgb(50, 50, 50)';
		//this.#body.style.background = 'url("bg.jpg") no-repeat center center';
		//this.#body.style.backgroundAttachment = 'fixed';
		//this.#body.style.backgroundAttachment = '100%';
		//this.#body.style.backgroundSize = 'cover';
	}
	
	#setBodyLabels() {
		new BodyLabel('App', 'def.svg', () => {
			let app = new Application();
			app.getWorkSpace().innerHTML = 'app';
			app.render();
        })
        .render(this.#body);
		// new BodyLabel('Snap', 'def.svg', () => {
		// 	new Snap();
        // })
        // .render(this.#body);
	}

	#setBodyToolBar() {
		this.#bodyToolBar.render(this.#body);
		this.#bodyToolBar.addLabel(
			new BodyToolBarLabel('App', 'def.svg', () => {
				new Temp();
			}));
	}

}
