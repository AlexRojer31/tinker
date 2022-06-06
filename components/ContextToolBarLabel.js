export {ContextToolBarLabel};

class ContextToolBarLabel {

    #label = document.createElement('div');
    #img = document.createElement('img');
    #title = document.createElement('h3');

    #name;
    #src;
    #action;

    constructor(name = 'default', src = 'bg.png', action = () => {}) {
        this.#name = name;
        this.#src = src;
        this.#action = action;
        this.#createComponents();
        this.#setStyle();
    }

    render(root) {
        root.appendChild(this.#label);
    }

    #createComponents() {
        this.#label.addEventListener('click', this.#action);
        this.#img.src = this.#src;
        this.#title.innerHTML = this.#name;
        this.#label.appendChild(this.#img);
        this.#label.appendChild(this.#title);
    }

    #setStyle() {
        this.#label.classList.add('clearfix');
		this.#label.classList.add('button');
        this.#img.style.marginRight = '15px';
        this.#img.style.width = '40px';
        this.#img.style.float = 'left';
        this.#title.style.width = 'auto';
        this.#title.style.textAlign = 'center';
        this.#title.style.color = 'white';
        this.#title.style.marginRight = '5px';
        this.#title.style.float = 'left';
    }
}