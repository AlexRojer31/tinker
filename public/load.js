document.addEventListener('DOMContentLoaded', load);

function load() {
    let body = document.querySelector('body');
    let h = document.createElement('h1');
    h.innerHTML = 'Hello Tinker!';
    body.appendChild(h);
}