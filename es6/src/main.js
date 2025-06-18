import Modal from './modal.js'
import Records from './records.js'

const modal = new Modal();
const records = new Records();
const $ = function(q) {
    return document.querySelector(q);
}

window.addEventListener('load', () => {
    fetch('/categories')
        .then(response => response.json())
        .then(json => { 
            console.log(JSON.stringify(json))
            modal.load(json);
            records.load(json);
        })
        .catch(error => console.error(error));
});

$('#addItem').addEventListener('click', modal.open);
$('#clearChecked').addEventListener('click', records.clearChecked)
$('#category').addEventListener('change', (e) => {modal.fetchItems(e.target.value)})
$('#recordForm').addEventListener('submit', (e) => {modal.addRecord(e, records.fetchRecords)});
$('.x').addEventListener('click', modal.close);

