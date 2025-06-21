import Modal from './modal.js'
import Records from './records.js'

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

window.addEventListener('load', () => {
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



