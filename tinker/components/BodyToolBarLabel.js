export {BodyToolBarLabel};

class BodyToolBarLabel {

    #label = document.createElement('div');
    #img = document.createElement('img');

    #name;
    #src;
    #action;

    constructor(name, src, action) {
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
        this.#img.title = this.#name;
        this.#label.appendChild(this.#img);
    }

    #setStyle() {
		this.#label.classList.add('button');
        this.#label.style.width = '30px';
        this.#label.style.height = '30px';
        this.#label.style.overflow = 'hidden';
        this.#label.style.float = 'left';
        this.#img.style.width = '100%';
    }
    
}