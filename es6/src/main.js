import Modal from './modal.js'
import Records from './records.js'
import Cookie from './cookie.js'

const modal = new Modal();
const records = new Records();

function postRecord(data) {
    fetch('/records',{method:'post',body: data})
        .then(response => response.json())
        .then(json => {
            records.renderRecords(json)       
            modal.close();
        })
        .catch(error => console.error(error));
}

function toggleDark() {
    const root = document.querySelector(":root");
    let colorScheme = root.style.getPropertyValue('color-scheme');
    colorScheme = (colorScheme == 'dark' ? 'light' : 'dark');
    root.style.setProperty('color-scheme', colorScheme)
    let value = JSON.stringify({colorScheme:colorScheme});

    Cookie.setCookie('_fe-c', value)
}

window.addEventListener('load', () => {
    let c = Cookie.getCookie('_fe-c');
    if (c && JSON.parse(c).colorScheme == 'dark') {
        document.querySelector(":root").style.setProperty('color-scheme', 'dark')
    }
    fetch('/categories')
        .then(response => response.json())
        .then(json => { 
            modal.load(json, postRecord);
            records.load(json);
        })
        .catch(error => console.error(error));
});

document.getElementById('addItem').addEventListener('click', modal.open);
document.getElementById('clearChecked').addEventListener('click', records.clearChecked)
document.querySelector('#dark-toggle a').addEventListener('click', toggleDark)


