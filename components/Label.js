export {Label};

class Label {

    #label = document.createElement('div');

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

}