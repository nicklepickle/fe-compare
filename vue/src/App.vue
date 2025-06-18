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

// https://vueuse.org/core/useFetch/
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
      <div><input type="button" id="addItem" value="Add Item" @click="openModal()"/></div>
      <div><input type="button" id="clearChecked" value="Clear Checked" /></div>
  </div>
  <Records :categories="categories" :records="records" />
  <Modal :categories="categories" />
</template>

<style scoped>
/*
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
  */
</style>
