import { div } from './div.js';
import { navigationLabelFactory } from './navigationLabelFactory.js';

export {navigation};

function navigation() {

    this.render = function() {
        let navigation = div();
        navigation.id = 'navigation';
        this.setStyle(navigation);
        this.setLabels(navigation);
        return navigation;
    }

    this.setStyle = function(navigation) {
        navigation.style.width = '100%';
        navigation.style.height = '40px';
        navigation.style.backgroundColor = 'black';
        navigation.style.position = 'fixed';
        navigation.style.bottom = '0';
    }

    this.setLabels = function(navigation) {
        let factory = new navigationLabelFactory();
		for (let i = 0; i < 5; i++) {
            let label = factory.render('bg.png', () => {
				alert('test - ' + i);
			});
            navigation.appendChild(label);
		}
    }
}