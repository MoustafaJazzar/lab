import './style.scss'
import projects from '../projects/projects.json';
import linkIcon from './images/link.svg?raw'

const BASE_URL = 'https://lab.moustafajazzar.com/';
const container = document.querySelector('.main');
const year = document.querySelector('.year');


const createDateBage = ({ date }) => {
    const node = document.createElement('time');
    const text = document.createElement('span');
    const _date = new Date(date).toISOString();

    node.setAttribute('datetime', _date);
    node.className = 'badge';

    text.innerText = date;
    node.appendChild(text);

    return node;
}

const formateSlug = (str) => {
    return str.toLowerCase().replace(/ /g, '-')
};


const createLinkIcon = () => {
    const node = document.createElement('span');
    node.innerHTML = linkIcon;
    node.className = 'icon';

    return node;
}

const createLink = ({ name, date }) => {
    const node = document.createElement('a');
    const text = document.createElement('span');
    text.className = "link-text"

    const slug = formateSlug(name);
    const badge = createDateBage({ date });
    const icon = createLinkIcon()

    node.className = 'link';
    node.href = `${BASE_URL}${slug}/`;
    text.innerText = name;

    node.append(badge, text, icon)

    return node;
}

const init = async() => {
    year.innerText = new Date().getFullYear()

    projects.map(project => {
        const link = createLink(project);
        container.appendChild(link)
    })
}

init()