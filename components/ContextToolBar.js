export {ContextToolBar};

class ContextToolBar {

    #toolBar = document.createElement('div');

    static CLEAR() {
        let contexts = document.querySelectorAll('.context');
        for (let i = 0; i < contexts.length; i++) {
            contexts[i].parentElement.removeChild(contexts[i]);
            contexts[i].classList.remove('context');
        }
    }

    constructor() {
        this.#setStyle();
    }

    render(parent) {
        ContextToolBar.CLEAR();
        parent.appendChild(this.#toolBar);
		this.#toolBar.classList.add('context');
		this.#toolBar.style.left = event.clientX + 'px';
		this.#toolBar.style.top = event.clientY + 'px';
    }

    #setStyle() {
		this.#toolBar.classList.add('context');
		this.#toolBar.style.backgroundColor = 'black';
		this.#toolBar.style.position = 'fixed';
		this.#toolBar.style.zIndex = '1000000';
    }
	
	addLabel(name = 'default', icon = 'bg.png' , action = () => {}) {
        let box = document.createElement('div');
        box.classList.add('clearfix');
		box.classList.add('button');
        let img = document.createElement('img');
        img.src = icon;
        img.title = name;
        img.style.float = 'left';
        img.style.width = '30px';
        img.style.marginRight = '10px';
        let headline = document.createElement('h3');
        headline.innerHTML = name;
        headline.style.float = 'left';
        headline.style.color = 'white';
        box.appendChild(img);
        box.appendChild(headline);
        box.addEventListener('click', action);
        box.addEventListener('click', () => {
            this.#toolBar.parentElement.removeChild(this.#toolBar);
        });
        this.#toolBar.appendChild(box);
	}
}