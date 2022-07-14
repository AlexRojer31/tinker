import { Application } from "/components/Application.js";

import { Ajax } from "/tools/Ajax.js";

export {Temp};

class Temp {

    #application = new Application('Temp');
    #applicationWorkSpace = this.#application.getWorkSpace();

    constructor() {
        this.#application.render();
    }
    
}