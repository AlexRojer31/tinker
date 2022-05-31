import { div } from './div.js';

export {float};

function float() {
    let float = div();
    float.style.float = 'left';
    return float;
}