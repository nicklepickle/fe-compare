<script setup>
import { ref } from 'vue'
import Cookie from './Cookie.js'
import Records from './Records.vue'
import Modal from './Modal.vue'

let records = ref([]);
let categories = ref([]);

function openModal() {
    // shouldn't have to know the internals
    document.getElementById('modal').classList.remove('hidden');
}

function setRecords(json) {
    records.value = json;
}

function clearChecked(e) {
    fetch('/clear')
      .then(response => response.json())
      .then(json => {setRecords(json) })
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

fetch('/categories')
    .then(response => response.json())
    .then(json => {categories.value = json;})
    .catch(error => console.error(error));
fetch('/records')
    .then(response => response.json())
    .then(json => {records.value = json;})
    .catch(error => console.error(error));

let c = Cookie.getCookie('_fe-c');
if (c) {
    document.querySelector(":root").style.setProperty('color-scheme', JSON.parse(c).colorScheme)
}
</script>

<template>
  <div class="flex controls">
      <div><h2>Vue Test</h2></div>
      <div id="dark-toggle"><a @click="toggleDark">&#9681;</a></div>
  </div>
  <div class="flex controls">
      <div><input type="button" id="addItem" value="Add Item" @click="openModal"/></div>
      <div><input type="button" id="clearChecked" value="Clear Checked" @click="clearChecked" /></div>
  </div>
  <Records :categories="categories" :records="records" />
  <Modal :categories="categories" :setRecords="setRecords" />
</template>


