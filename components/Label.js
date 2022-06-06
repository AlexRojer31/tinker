export {Label};

class Label {

    #label;
    #img;
    #title;

    #name;
    #src;
    #callback;

    constructor(name, src, callback) {
        this.#name = name;
        this.#src = src;
        this.#callback = callback;
        this.#createComponent();
        this.#setStyle();
    }

    render(root) {
        root.appendChild(this.#label);
    }

    #createComponent() {
        this.#label = document.createElement('div');
        this.#label.addEventListener('click', this.#callback);
        this.#img = document.createElement('img');
        this.#img.src = this.#src;
        this.#title = document.createElement('h3');
        this.#title.innerHTML = this.#name;
        this.#label.appendChild(this.#img);
        this.#label.appendChild(this.#title);
    }

    #setStyle() {
        this.#label.style.width = '40px';
        this.#label.style.float = 'left';
        this.#label.style.margin = '5px';
        this.#img.style.width = '100%';
        this.#title.style.width = '100%';
        this.#title.style.textAlign = 'center';
    }
    
}