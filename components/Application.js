import { Body } from "./Body.js";

export {Application};

class Application {

    #application;
    #applicationHeader;

    #applicationName;
    #applicationIcon;
    #width;
    #height;
    #applicationId;

    constructor(applicationName, applicationIcon = 'bg.png', width = 400, height = 400) {
        this.#applicationName = applicationName;
        this.#applicationIcon = applicationIcon;
        this.#width = width;
        this.#height = height;
        this.#generateId();
        this.#createComponent();
        this.#setStyle();
        this.#setEventListeners();
    }

    render(root = Body.body()) {
        if (document.getElementById(this.#applicationId) !== null) {
            return false;
        }
        root.appendChild(this.#application);
    }

    #generateId() {
        this.#applicationId = this.#applicationName.replaceAll(' ', '_');
    }

    #createComponent() {
        this.#application = document.createElement('div');
        this.#application.id = this.#applicationId;
        this.#applicationHeader = document.createElement('div');
        this.#applicationHeader.classList.add('clearfix');
        if (this.#applicationIcon != '') {
            let img = document.createElement('img');
            img.src = this.#applicationIcon;
            img.style.float = 'left';
            img.style.width = '30px';
            img.style.marginRight = '10px';
            this.#applicationHeader.appendChild(img);
        }
        let headline = document.createElement('h3');
        headline.innerHTML = this.#applicationName;
        headline.style.float = 'left';
        headline.style.color = 'white';
        this.#applicationHeader.appendChild(headline);
        let closeButton = document.createElement('h3');
        closeButton.innerHTML = '&#x2716';
        closeButton.style.float = 'right';
        closeButton.style.color = 'white';
        closeButton.style.marginRight = '10px';
        closeButton.addEventListener('click', () => {
            this.#application.parentElement.removeChild(this.#application);
        });
        this.#applicationHeader.appendChild(closeButton);
        let expandButton = document.createElement('h3');
        expandButton.innerHTML = '&#x2610';
        expandButton.style.float = 'right';
        expandButton.style.color = 'white';
        expandButton.style.marginRight = '10px';
        this.#applicationHeader.appendChild(expandButton);
        let rollUpButton = document.createElement('h3');
        rollUpButton.innerHTML = '_';
        rollUpButton.style.float = 'right';
        rollUpButton.style.color = 'white';
        rollUpButton.style.marginRight = '10px';
        this.#applicationHeader.appendChild(rollUpButton);

        this.#application.appendChild(this.#applicationHeader);
    }

    #setStyle() {
        this.#application.style.width = this.#width + 'px';
        this.#application.style.height = this.#height + 'px';
        this.#application.style.overflow = 'hidden';
        this.#application.style.position = 'fixed';
        this.#application.style.zIndex = 1;
        this.#application.style.left = 0;
        this.#application.style.top = 0;
        this.#application.style.backgroundColor = 'grey';
        this.#applicationHeader.style.padding = '5px';
        this.#applicationHeader.style.width = '100%';
        this.#applicationHeader.style.height = 'auto';
        this.#applicationHeader.style.backgroundColor = 'black';

    }

    #setEventListeners() {
        let app = this.#application;

        this.#applicationHeader.addEventListener('mousedown', move);

		function move() {
			if (event.which == 1) {
				
				app.style.zIndex = '1000000';
				
				let shiftX = event.clientX - app.offsetLeft;
				let shiftY = event.clientY - app.offsetTop;
				
				document.addEventListener('mousemove', moveElem);
				app.addEventListener('mouseup', stopMove);
				
				function moveElem() {
					elemPosition(event.clientX, event.clientY);
				}	
				
				function elemPosition(pageX, pageY) {
					app.style.left = (pageX - shiftX) + 'px';
					app.style.top = (pageY - shiftY) + 'px';
				}	
				
				function stopMove() {
					app.style.zIndex = '1';
					document.removeEventListener('mousemove', moveElem);
				}
			} else {
				return false;
			}
        }
    }


}