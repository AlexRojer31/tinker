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
        this.#toolBar.addEventListener('click', () => {
            this.#toolBar.parentElement.removeChild(this.#toolBar);
        });
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
		this.#toolBar.style.backgroundColor = 'white';
		this.#toolBar.style.boxShadow = '1px 1px 3px black';
		this.#toolBar.style.position = 'fixed';
		this.#toolBar.style.zIndex = '1000000';
    }
	
	addLabel(ContextToolBarLabel) {
        ContextToolBarLabel.render(this.#toolBar);
	}
}