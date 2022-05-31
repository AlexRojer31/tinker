import { labelFactory } from './labelFactory.js';

export {navigationLabelFactory};

function navigationLabelFactory() {
    
    this.render = function(src, callback) {
        let factory = new labelFactory();
        let navigationLabel = factory.render(src, '');
        navigationLabel.style.width = '40px';
        navigationLabel.style.margin = '5px';
        navigationLabel.style.overflow = 'hidden';
        navigationLabel.addEventListener('click', callback);
        return navigationLabel;
    }

}