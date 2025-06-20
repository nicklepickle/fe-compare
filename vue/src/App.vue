<script setup>
import { ref } from 'vue'
//import { onMounted } from 'vue'
import Records from './Records.vue'
import Modal from './Modal.vue'

let records = ref([]);
let categories = ref([]);

function openModal() {
  document.getElementById('modal').classList.remove('hidden');
}

function setRecords(json) {
  records.value = json;
}

function clearChecked(e) {
    console.log(e.target.name, e.target.checked)
    fetch('/clear')
    .then(response => response.json())
    .then(json => {setRecords(json) })
    .catch(error => console.error(error));

}

//onMounted(() => {
    fetch('/categories')
      .then(response => response.json())
      .then(json => {categories.value = json;})
      .catch(error => console.error(error));
    fetch('/records')
      .then(response => response.json())
      .then(json => {records.value = json;})
      .catch(error => console.error(error));
//});
</script>

<template>
  <h2>Vue Test</h2>
  <div class="flex controls">
      <div><input type="button" id="addItem" value="Add Item" @click="openModal"/></div>
      <div><input type="button" id="clearChecked" value="Clear Checked" @click="clearChecked" /></div>
  </div>
  <Records :categories="categories" :records="records" />
  <Modal :categories="categories" :setRecords="setRecords" />
</template>


