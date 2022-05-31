import { div } from './div.js';

export {flex};

function flex() {
    let flex = div();
    flex.style.display = 'flex';
    return flex;
}