import { context } from './context.js';
import { navigation } from './navigation.js';

export {body};

function body() {

	let body = document.querySelector('body');
	
	this.render = function() {
		body.id = 'body';
		this.setStyle();
		this.setContext();
		this.setNavigation();
	}
	
	this.setStyle = function() {
		body.style.position = 'relative';
		this.background();
	}
	
	this.setContext = function() {
        let contextMenu = new context();
		document.addEventListener('contextmenu', open);
		document.addEventListener('click', close);
		
		function open() {
            contextMenu.open();
			contextMenu.action('white', white);
			contextMenu.action('black', black);

			function black() {
				alert('black');
			}

			function white() {
				alert('white');
			}
        }
		
		function close() {
            contextMenu.close();
		}
	}

	this.setNavigation = function() {
		let navigationBar = new navigation();
		body.appendChild(navigationBar.render());
	}
	
	this.background = function() {
		body.style.backgroundImage = 'url("bg.png")';
		body.style.backgroundRepeat = 'no-repeat';
		body.style.backgroundPosition = 'center center';
		body.style.backgroundAttachment = 'fixed';
		body.style.backgroundAttachment = '100%';
		body.style.backgroundSize = 'cover';
	}
	
}