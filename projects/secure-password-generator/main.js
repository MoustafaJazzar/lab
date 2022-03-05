import './styles/main.scss'


import { formatValue, copyTextToClipboard, rangeToPercent } from './scripts/utils.js';
import generatePassword from './scripts/passwordGenerator.js';


let passwordSettings = {
    length: 8,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
}

let password;


const slider = document.querySelector('#password-length-slider')
const sliderValue = document.querySelector('.app-password-length-value');
slider.value = (passwordSettings.length);
sliderValue.textContent = formatValue(passwordSettings.length);

const appPassword = document.querySelector('.app-password');
const appCopyBtn = document.querySelector('.app-copy');
const appRegenerateBtn = document.querySelector('.app-regenerate');

const populatePassword = () => {
    password = generatePassword(passwordSettings);
    appPassword.value = password;
}

slider.style.setProperty('--track-fill', rangeToPercent(slider))
populatePassword();

slider.addEventListener('input', e => {
    passwordSettings = {
        ...passwordSettings,
        length: e.target.value
    }

    e.target.style.setProperty('--track-fill', rangeToPercent(e.target))
    sliderValue.textContent = formatValue(passwordSettings.length);
    populatePassword();
})




for (const el of document.querySelectorAll('.app-password-control-switch')) {

    el.addEventListener('click', (e) => {
        passwordSettings = {
            ...passwordSettings,
            [e.target.name]: el.checked
        }
        populatePassword()
    })
}

appCopyBtn.addEventListener('click', () => {
    copyTextToClipboard(password);
})

appRegenerateBtn.addEventListener('click', () => {
    populatePassword()
})