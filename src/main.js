import './style.scss'
import projects from '../projects/projects.json';
import linkIcon from './icons/link.svg'

console.log(linkIcon);
let BASE_URL = 'https://lab.moustafajazzar.com/';
let container = document.querySelector('.main');
let year = document.querySelector('.year');


let formatDateBage = ({ date }) => {
    let node = document.createElement('time');
    const _date = new Date(date).toISOString();
    node.setAttribute('datetime', _date);
    node.className = 'badge';
    node.innerText = date;
    return node;
}

let formateSlug = (str) => {
    return str.toLowerCase().replace(/ /g, '-');
}

let formateLinkIcon = () => {
    let node = document.createElement('img');
    node.src = linkIcon;
    node.className = 'icon';
    return node;
}

let fotmatLink = ({ name, date }) => {
    let node = document.createElement('a');
    let text = document.createElement('span');
    let slug = formateSlug(name);
    let badge = formatDateBage({ date });
    let icon = formateLinkIcon()
    node.className = 'link';
    node.href = `${BASE_URL}${slug}`;
    text.innerText = name;
    node.appendChild(badge);
    node.appendChild(text);
    node.appendChild(icon);
    return node;
}

let formatCard = () => {
    let node = document.createElement('div');
    node.className = 'card';
    return node;
}

let init = async() => {
    year.innerText = new Date().getFullYear()
    projects.map(project => {
        // let badge = formatDateBage(project)
        let link = fotmatLink(project);
        // let card = formatCard()

        // card.appendChild(badge)
        // card.appendChild(link)

        container.appendChild(link)
    })
}

init()