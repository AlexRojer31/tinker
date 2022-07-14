export {Ajax};

class Ajax {

    #request;

    constructor() {
		try {
			this.#request = new XMLHttpRequest();
		} catch (e) {
			try {
				this.#request = new ActiveXObject("Msxml2.XMLHTTP");
	    	} catch (e) {
	    		this.#request = new ActiveXObject("Microsoft.XMLHTTP");
	    	}
		}
    }

    #setRequestSettings() {
		this.#request.setRequestHeader('Accept', 'application/json');
		this.#request.setRequestHeader('Content-Type', 'application/json');
    }

	get(url, func) {
		this.#request.open('GET', url);
        this.#setRequestSettings();
		this.#request.onload = func;
		this.#request.send();
		return this.#request;
	}

	del(url, func) {
		this.#request.open('DELETE', url);
        this.#setRequestSettings();
		this.#request.onload = func;
		this.#request.send();
		return this.#request;
	}

	post(url, func, body) {
		this.#request.open('POST', url);
        this.#setRequestSettings();
		this.#request.onload = func;
		this.#request.send(JSON.stringify(body));
		return this.#request;
	}

	put(url, func, body) {
		this.#request.open('PUT', url);
        this.#setRequestSettings();
		this.#request.onload = func;
		this.#request.send(JSON.stringify(body));
		return this.#request;
	}

}