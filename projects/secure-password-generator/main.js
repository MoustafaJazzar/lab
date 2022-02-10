import './styles/main.scss'
import { MDCRipple } from '@material/ripple';
import { MDCSlider } from '@material/slider';
import { MDCSwitch } from '@material/switch';

import { formatValue, copyTextToClipboard } from './scripts/utils.js';
import generatePassword from './scripts/passwordGenerator.js';


let passwordSettings = {
    length: 8,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
}

let password;

const iconButtonRipple = new MDCRipple(document.querySelector('.mdc-icon-button'));
iconButtonRipple.unbounded = true;

const slider = new MDCSlider(document.querySelector('.mdc-slider'));
const sliderValue = document.querySelector('.app-password-length-value');
slider.setValue(passwordSettings.length);
sliderValue.textContent = formatValue(passwordSettings.length);

const appPassword = document.querySelector('.app-password');
const appCopyBtn = document.querySelector('.app-copy');
const appRegenerateBtn = document.querySelector('.app-regenerate');

const populatePassword = () => {
    password = generatePassword(passwordSettings);
    appPassword.value = password;
}

populatePassword();

slider.listen('MDCSlider:input', (e) => {
    passwordSettings = {
        ...passwordSettings,
        length: e.detail.value
    }
    sliderValue.textContent = formatValue(passwordSettings.length);

    populatePassword()
})

for (const el of document.querySelectorAll('.mdc-switch')) {
    const _switch = new MDCSwitch(el)
    _switch.root.addEventListener('click', (e) => {
        passwordSettings = {
            ...passwordSettings,
            [_switch.root.dataset.name]: _switch.selected
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