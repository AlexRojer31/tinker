import { float } from './float.js';
import { img } from './img.js';
import {headline} from './headline.js';

export {labelFactory};

function labelFactory() {

    this.render = function(src, title, callback) {
        let label = float(); 
        let imgItem = img();
        let labelName = headline(4);
        label.style.margin = '15px';
        label.style.maxWidth = '50px';
        imgItem.style.width = '100%';
        imgItem.style.height = 'auto';
        imgItem.style.display = 'block';
        imgItem.src = src;
        labelName.style.textAlign = 'center';
        labelName.innerHTML = title;
        label.appendChild(imgItem);
        label.appendChild(labelName);
        label.addEventListener('click', callback);
        return label;
    }
    
}