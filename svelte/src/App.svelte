<script>
  import { onMount } from "svelte";
  import Records from './lib/Records.svelte'
  import Modal from './lib/Modal.svelte'

  let categories= $state([]);
  let records= $state([]);

  function fetchRecords() {

   }

  onMount( function () {

    document.getElementById('addItem').addEventListener('click', () => {
      document.getElementById('modal').classList.remove('hidden');
    });

    document.getElementById('clearChecked').addEventListener('click', () => {
      fetch('/clear')
        .then(response => response.json())
        .then(json => {records = json})
        .catch(error => console.error(error));
    })

    fetch('/categories')
      .then(response => response.json())
      .then(json => categories = json)
      .catch(error => console.error(error));
    fetch('/records')
      .then(response => response.json())
      .then(json => {records = json})
      .catch(error => console.error(error));
  });

</script>

<main>
  <h2>Svelte Test</h2>
  <div class="flex controls">
      <div><input type="button" id="addItem" value="Add Item" /></div>
      <div><input type="button" id="clearChecked" value="Clear Checked" /></div>
  </div>
  <Records categories={categories} records={records} />  
  <Modal categories={categories} />
</main>

