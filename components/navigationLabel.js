import { label } from './label.js';

export {navigationLabel};

function navigationLabel() {
    
    this.render = function(src, callback) {
        let labelFactory = new label();
        let navigationLabel = labelFactory.render(src, '');
        navigationLabel.style.width = '40px';
        navigationLabel.style.margin = '5px';
        navigationLabel.style.overflow = 'hidden';
        navigationLabel.addEventListener('click', callback);
        return navigationLabel;
    }

}