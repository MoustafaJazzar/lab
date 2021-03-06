import './main.scss'
import projects from '../projects/projects.json';
import linkIcon from './images/link.svg?raw'

const container = document.querySelector('.main');
const year = document.querySelector('.year');


const createDateBadge = ({ date }) => {
    const node = document.createElement('time');
    const text = document.createElement('span');
    const _date = new Date(date).toISOString();

    node.setAttribute('datetime', _date);
    node.className = 'badge';

    text.innerText = date;
    node.appendChild(text);

    return node;
}

const createLinkIcon = () => {
    const node = document.createElement('span');
    node.innerHTML = linkIcon;
    node.className = 'icon';

    return node;
}

const createLink = ({ name, date, slug }) => {
    const node = document.createElement('a');
    const text = document.createElement('span');
    text.className = "link-text"

    const badge = createDateBadge({ date });
    const icon = createLinkIcon()

    node.className = 'link';
    node.href = `/${slug}/`;
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