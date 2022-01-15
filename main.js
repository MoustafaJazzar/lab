import './style.scss'
import projects from './projects.json';


let container = document.querySelector('.main');
let year = document.querySelector('.year');

let getData = async(file) => {
    const _projects = await fetch(file)
    projects = await _projects.json()
}

let formatDateBage = ({ date }) => {
    let node = document.createElement('time');
    const _date = new Date(date).toISOString();
    node.setAttribute('datetime', _date);
    node.className = 'badge';
    node.innerText = date;
    return node;
}

let fotmatLink = ({ link, name }) => {
    let node = document.createElement('a');
    node.className = 'link';
    node.href = link
    node.innerText = name;
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
        let badge = formatDateBage(project)
        let link = fotmatLink(project);
        let card = formatCard()

        card.appendChild(badge)
        card.appendChild(link)

        container.appendChild(card)
    })
}

init()