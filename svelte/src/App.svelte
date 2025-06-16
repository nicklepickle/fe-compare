<script>

  import Records from './lib/Records.svelte'
  import Modal from './lib/Modal.svelte'
</script>

<main>
  <h2>Svelte Test</h2>
  <div class="flex controls">
      <div><input type="button" id="addItem" value="Add Item" /></div>
      <div><input type="button" id="clearChecked" value="Clear Checked" /></div>
  </div>
  <Records />  
  <Modal />
</main>

