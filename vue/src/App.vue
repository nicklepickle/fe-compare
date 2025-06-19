<script setup>
import { ref } from 'vue'
//import { onMounted } from 'vue'
import Records from './Records.vue'
import Modal from './Modal.vue'

//const { records } = toRefs(props);
//const { categories } = toRefs(props);
let records = ref([]);
let categories = ref([]);

function openModal() {
  document.getElementById('modal').classList.remove('hidden');
}

async function addRecord(e) {
    e.preventDefault();
    document.querySelectorAll('.error').forEach((error) => {
        error.classList.add('hidden');
    });
    const form = document.getElementById(e.target.id);
    const data = new URLSearchParams(new FormData(form));
    let errors = 0;
    data.forEach(function(value, key) {
        if ((key == 'price' || key == 'count') && !value.match(/[0-9]+/g)) {
            document.getElementById(key + '-error').classList.remove('hidden');
            errors++;
        }
        else if(key == 'item' && document.querySelector(`input[name="${value}"]`) != null) {
            document.getElementById(key + '-error').classList.remove('hidden');
            errors++;
        }
    })

    if (errors == 0) {
        try {
            const response = await fetch('/records', {method:'post', body: data});
            const json = await response.json();
            records.value = json;
            console.log('Updated records:', records.value);
            document.getElementById('modal').classList.add('hidden');
        } catch (error) {
            console.error(error);
        }
    }
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
  <Modal :categories="categories" :addRecord="addRecord" />
</template>


