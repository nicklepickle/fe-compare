import Modal from './modal.js'
import Records from './records.js'

const modal = new Modal();
const records = new Records();
const $ = function(q) {
    return document.querySelector(q);
}

window.addEventListener('load', () => {
    modal.load();
    records.load();
});

$('#addItem').addEventListener('click', modal.open);
$('#clearChecked').addEventListener('click', records.clearChecked)
$('#category').addEventListener('change', (e) => {modal.fetchItems(e.target.value)})
$('#recordForm').addEventListener('submit', (e) => {records.addRecord(e, modal.close);} );
$('.x').addEventListener('click', modal.close);

