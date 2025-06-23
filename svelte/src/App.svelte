<script>
  import { onMount } from "svelte";
  import Records from './Records.svelte'
  import Modal from './Modal.svelte'
  import Cookie from './Cookie.js'

  let categories= $state([]);
  let records= $state([]);

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

    document.querySelector('#dark-toggle span').addEventListener('click', () => {
      const root = document.querySelector(":root");
      let colorScheme = root.style.getPropertyValue('color-scheme');
      colorScheme = (colorScheme == 'dark' ? 'light' : 'dark');
      root.style.setProperty('color-scheme', colorScheme)
      let value = JSON.stringify({colorScheme:colorScheme});

      Cookie.setCookie('_fe-c', value) 
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

  let c = Cookie.getCookie('_fe-c');
  if (c) {
      document.querySelector(":root").style.setProperty('color-scheme', JSON.parse(c).colorScheme)
  }
</script>

<main>
  <div class="flex controls">
      <div><h2>Svelte Test</h2></div>
      <div id="dark-toggle"><span>&#9681;</span></div>
  </div>
  <div class="flex controls">
      <div><input type="button" id="addItem" value="Add Item" /></div>
      <div><input type="button" id="clearChecked" value="Clear Checked" /></div>
  </div>
  <Records categories={categories} bind:records  />  
  <Modal categories={categories} bind:records />
</main>

