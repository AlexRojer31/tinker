import { div } from './div.js';

export {navigation};

function navigation() {

    this.render = function() {
        let navigation = new div();
        navigation.id = 'navigation';
        this.setStyle(navigation);
        return navigation;
    }

    this.setStyle = function(navigation) {
        navigation.style.width = '100%';
        navigation.style.height = '40px';
        navigation.style.backgroundColor = 'black';
        navigation.style.position = 'fixed';
        navigation.style.bottom = '0';
    }
}