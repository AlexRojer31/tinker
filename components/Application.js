import { ContextToolBar } from "./ContextToolBar.js";
import { ContextToolBarLabel } from "./ContextToolBarLabel.js";

export {Application};

class Application {

    #application = document.createElement('div');
    #applicationHeader = document.createElement('div');
    #applicationWorkSpace = document.createElement('div');
    #applicationContextToolBar = new ContextToolBar();
    #applicationEvents = new Map();

    #applicationId;
    #applicationName;
    #applicationIcon;

    #width;
    #height;
    #left;
    #top;

    constructor(applicationName = 'default application', applicationIcon = 'bg.png', width = 400, height = 400, left = 0, top = 0) {
        this.#applicationName = applicationName;
        this.#applicationIcon = applicationIcon;
        this.#width = width;
        this.#height = height;
        this.#left = left;
        this.#top = top;
        this.#generateId();
        this.#createComponents();
        this.#setStyle();
    }

    render(root = document.querySelector('body')) {
        if (document.getElementById(this.#applicationId) !== null) {
            return false;
        }
        root.appendChild(this.#application);
    }

    destroy() {
        this.#application.parentElement.removeChild(this.#application);
    }

    getApplication() {
        return document.getElementById(this.#applicationId);
    }

    getWorkSpace() {
        return this.#applicationWorkSpace;
    }

    #generateId() {
        this.#applicationId = this.#applicationName.replaceAll(' ', '_');
    }

    #createComponents() {
        this.#application.id = this.#applicationId;
        this.#application.appendChild(this.#applicationHeader);
        this.#application.appendChild(this.#applicationWorkSpace);
        this.#applicationHeader.classList.add('clearfix');

        this.#eventConstruct();
        this.#createApplicationIcon();
        this.#createApplicationHeadline();
        this.#createApplicationCloseButton();
        this.#createApplicationExpandButton();
        this.#creareApplicationRollupButton();
        
        this.#setContextToolBarEvents();
        this.#setEventListeners();
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

    #eventConstruct() {
        let obj = this;
        let body = document.querySelector('body');
        let bodyToolBar = document.getElementById('bodyToolBar');
        let app = this.#application;
        let header = this.#applicationHeader;

        function grab() {
            if (header.style.cursor == 'grab') {
                header.style.cursor = 'auto';
            } else {
                header.style.cursor = 'grab';
            }
        }

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
                    obj.setLeft((pageX - shiftX));
                    obj.setTop((pageY - shiftY)); 
				}	
				function stopMove() {
					app.style.zIndex = '1';
					document.removeEventListener('mousemove', moveElem);
				}
			} else {
				return false;
			}
        }
		
		function resizer() {
			let elemBottom = app.offsetHeight + app.offsetTop;
			let elemRight = app.offsetWidth + app.offsetLeft;
			let cursorY = event.clientY;
			let cursorX = event.clientX;
			let topD = elemBottom - 5;
			let bottomD = elemBottom + 5;
			let leftD = elemRight - 5;
			let rigthD = elemRight + 5;
			if (topD < cursorY && cursorY < bottomD) {
				app.style.cursor = 's-resize';
				app.addEventListener('mousedown', sResize);
			} else {
				if (leftD < cursorX && cursorX < rigthD) {
					app.style.cursor = 'e-resize';
					app.addEventListener('mousedown', eResize);
				} else {
					app.style.cursor = 'auto';
					app.removeEventListener('mousedown', sResize);
					app.removeEventListener('mousedown', eResize);
				}
			}
		}
		
		function sResize() {
			if (event.which == 1) {
				let shiftY = event.clientY - app.offsetHeight;
				
				document.addEventListener('mousemove', resizeElemY);
				app.addEventListener('mouseup', stopResize);
				
				function resizeElemY() {
					elemNewResize(event.clientY);
				}	
				
				function elemNewResize(pageY) {
					let newHeight = pageY - shiftY;
					app.style.height = newHeight + 'px';
                    obj.setHeight(newHeight);
				}	
				
				function stopResize() {
					document.removeEventListener('mousemove', resizeElemY);
				}
			} else {
				return false;
			}
		}
		
		function eResize() {
			if (event.which == 1) {
				let shiftX = event.clientX - app.offsetWidth;
				
				document.addEventListener('mousemove', resizeElemX);
				app.addEventListener('mouseup', stopResize);
				
				function resizeElemX() {
					elemNewResize(event.clientX);
				}	
				
				function elemNewResize(pageX) {
					let newWidth = pageX - shiftX;
					app.style.width = newWidth + 'px';
                    obj.setWidth(newWidth);
				}	
				
				function stopResize() {
					document.removeEventListener('mousemove', resizeElemX);
				}
			} else {
				return false;
			}
		}

        function roll() {
            app.style.position = 'relative';
            app.style.top = 0;
            app.style.left = 0;
            app.style.float = 'left';
            app.style.width = 40 + 'px';
            app.style.height = 30 + 'px';
            app.parentElement.removeChild(app);
            bodyToolBar.appendChild(app);
            header.removeEventListener('mousedown', move);
            app.addEventListener('mousedown', unroll);  
        }

        function unroll() {
            if (event.which != 1) {
                return false;
            }
            app.style.width = obj.getWidth() + 'px';
            app.style.height = obj.getHeight() + 'px';
            app.style.float = 'none';
            app.style.position = 'fixed';
            app.style.left = obj.getLeft() + 'px';
            app.style.top = obj.getTop() + 'px';
            bodyToolBar.removeChild(app);
            body.appendChild(app);
            header.addEventListener('mousedown', move);
            app.removeEventListener('mousedown', unroll);     
        }

        function expand() {
            if (app.style.width != document.documentElement.clientWidth + 'px') {
                app.style.width = document.documentElement.clientWidth + 'px';
                app.style.height = (document.documentElement.clientHeight - 40) + 'px';
                app.style.left = 0;
                app.style.top = 0;
                obj.setLeft(0);
                obj.setTop(0);
                obj.setWidth(document.documentElement.clientWidth);
                obj.setHeight((document.documentElement.clientHeight - 40));
                header.removeEventListener('mousedown', move);  
            } else {
                app.style.width = (obj.getWidth()-50) + 'px';
                app.style.height = (obj.getHeight()-50) + 'px';
                app.style.left = obj.getLeft() + 'px';
                app.style.top = obj.getTop() + 'px';
                obj.setWidth((obj.getWidth()-50));
                obj.setHeight((obj.getHeight()-50));
                header.addEventListener('mousedown', move);       
            }
        }

        function close() {
            obj.destroy();
        }

		function selected() {
			let selected = document.querySelectorAll('.selected');
			for (let i = 0;i < selected.length;i++) {
				selected[i].style.zIndex = '1';
				selected[i].style.boxShadow = 'none';
				selected[i].classList.remove('selected');
			}
			app.style.zIndex = '1000';
			app.style.boxShadow = '3px 3px 25px black';
			app.classList.add('selected');
		}

        this.#applicationEvents.set('grab', grab);
        this.#applicationEvents.set('move', move);
        this.#applicationEvents.set('resizer', resizer);
        this.#applicationEvents.set('roll', roll);
        this.#applicationEvents.set('expand', expand);
        this.#applicationEvents.set('close', close);
        this.#applicationEvents.set('selected', selected);
    }

    #createApplicationIcon() {
        if (this.#applicationIcon != '') {
            let img = document.createElement('img');
            img.src = this.#applicationIcon;
            img.title = this.#applicationName;
            img.style.float = 'left';
            img.style.width = '30px';
            img.style.marginRight = '10px';
            this.#applicationHeader.appendChild(img);
        }
    }

    #createApplicationHeadline() {
        let headline = document.createElement('h3');
        headline.innerHTML = this.#applicationName;
        headline.style.float = 'left';
        headline.style.color = 'white';
        this.#applicationHeader.appendChild(headline);
    }

    #createApplicationCloseButton() {
        let closeButton = document.createElement('h3');
        closeButton.classList.add('button');
        closeButton.innerHTML = '&#x2716';
        closeButton.style.float = 'right';
        closeButton.style.color = 'white';
        closeButton.style.marginRight = '10px';
        closeButton.addEventListener('click', this.#applicationEvents.get('close'));
        this.#applicationHeader.appendChild(closeButton);
    }

    #createApplicationExpandButton() {
        let expandButton = document.createElement('h3');
        expandButton.classList.add('button');
        expandButton.innerHTML = '&#x2610';
        expandButton.style.float = 'right';
        expandButton.style.color = 'white';
        expandButton.style.marginRight = '10px';
        expandButton.addEventListener('click', this.#applicationEvents.get('expand'));
        this.#applicationHeader.appendChild(expandButton);
    }

    #creareApplicationRollupButton() {
        let rollUpButton = document.createElement('h3');
        rollUpButton.classList.add('button');
        rollUpButton.innerHTML = '_';
        rollUpButton.style.float = 'right';
        rollUpButton.style.color = 'white';
        rollUpButton.style.marginRight = '10px';
        rollUpButton.addEventListener('click', this.#applicationEvents.get('roll'));
        this.#applicationHeader.appendChild(rollUpButton);
    }

    #setContextToolBarEvents() {
		this.#applicationContextToolBar.addLabel(new ContextToolBarLabel('close', 'bg.png', this.#applicationEvents.get('close')));
		this.#applicationContextToolBar.addLabel(new ContextToolBarLabel('expand', 'bg.png', this.#applicationEvents.get('expand')));
		this.#applicationContextToolBar.addLabel(new ContextToolBarLabel('roll', 'bg.png', this.#applicationEvents.get('roll')));
    }

    #setEventListeners() {
        this.#application.addEventListener('mousemove', this.#applicationEvents.get('resizer'));
        this.#application.addEventListener('click', this.#applicationEvents.get('selected'));
        this.#application.addEventListener('click', () => {
            ContextToolBar.CLEAR();
        });
		this.#application.addEventListener('contextmenu', () => {
			event.stopPropagation();
			event.preventDefault();
		});
        
        this.#applicationHeader.addEventListener('mousedown', this.#applicationEvents.get('move'));
        this.#applicationHeader.addEventListener('mouseover', this.#applicationEvents.get('grab'));
        this.#applicationHeader.addEventListener('mouseout', this.#applicationEvents.get('grab'));
		this.#applicationHeader.addEventListener('contextmenu', () => {
			event.stopPropagation();
			event.preventDefault();
            this.#applicationContextToolBar.render(this.#application);
		});
    }

    getLeft() {
        return this.#left;
    }

    getTop() {
        return this.#top;
    }

    getWidth() {
        return this.#width;
    }

    getHeight() {
        return this.#height;
    }

    setLeft(left) {
        this.#left = left;
    }

    setTop(top) {
        this.#top = top;
    }

    setWidth(width) {
        this.#width = width;
    }

    setHeight(height) {
        this.#height = height;
    }

}