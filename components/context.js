import { div } from './div.js';
import { paragraf } from './paragraf.js';

export {context};

function context() {

	let body = document.getElementById('body');
	
	this.open = function() {
		event.preventDefault();
		event.stopPropagation();
		let context = document.getElementById('context');
		if (context !== null) {
			let parent = context.parentElement;
			parent.removeChild(context);
			this.render();
		} else {
			this.render();
		}
	}
	
	this.close = function() {
		let context = document.getElementById('context');
		body.removeChild(context);
	}
	
	this.render = function() {
		let context = new div();
		context.id = 'context';
		this.style(context);
		body.appendChild(context);
	}
	
	this.style = function(context) {
		context.style.backgroundColor = 'white';
		context.style.padding = '5px';
		context.style.position = 'fixed';
		context.style.zIndex = '1000000';
		context.style.left = event.clientX + 'px';
		context.style.top = event.clientY + 'px';
	}
	
	this.action = function(name, action) {
		let p = new paragraf();
        p.innerHTML = name;
		p.style.color = 'black';
		p.style.textAlign = 'center';
		p.addEventListener('click', action);
		let context = document.getElementById('context');
		context.appendChild(p);
	}
	
}