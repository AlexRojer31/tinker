export {BodyLabel};

class BodyLabel {

    #label = document.createElement('div');
    #img = document.createElement('img');
    #title = document.createElement('h3');

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
        this.#title.innerHTML = this.#name;
        this.#label.appendChild(this.#img);
        this.#label.appendChild(this.#title);
    }

    #setStyle() {
		this.#label.classList.add('button');
        this.#label.style.width = '40px';
        this.#label.style.float = 'left';
        this.#label.style.margin = '5px';
        this.#label.style.marginLeft = '25px';
        this.#label.style.display = 'flex';
        this.#label.style.flexDirection = 'column';
        this.#label.style.alignItems = 'center';
        this.#img.style.width = '100%';
        this.#title.style.fontFamily = 'courier new';
        this.#title.style.fontSize = '18px';
        this.#title.style.color = 'white';
        this.#title.style.textAlign = 'center';
    }

}