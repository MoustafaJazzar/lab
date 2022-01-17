import './style.scss'

const classes = [
    'basic',
    'dense',
    'text-over',
    'text-over-minimal',
    'text-over-extended',
    'media-first',
    'media-first-minimal',
    'legacy'
];
const container = document.querySelector('.container main');
const template = document.querySelector('#card');

for (const c of classes) {
    const clone = template.content.cloneNode(true);
    const card = document.createElement('div');
    card.classList.add('card', c);
    card.appendChild(clone);
    container.appendChild(card);
}