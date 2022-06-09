export {BodyLabel};

class BodyLabel {

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
		this.#label.classList.add('button');
        this.#label.style.width = '40px';
        this.#label.style.float = 'left';
        this.#label.style.margin = '5px';
        this.#img.style.width = '100%';
        this.#title.style.width = '100%';
        this.#title.style.textAlign = 'center';
    }

}