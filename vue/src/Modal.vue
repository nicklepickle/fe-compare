<script setup>
import { ref } from 'vue'
//import { onMounted } from 'vue'

const props = defineProps({
  categories: Array,
  setRecords: Function
})

let items = ref([]);

function getItems(category) {
    //console.log(category)
    fetch('/items?category=' + category)
        .then(response => response.json())
        .then(json => {items.value = json })
        .catch(error => console.error(error));
}

function changeCategory(e) {
    //console.log(e.target.name, e.target.value)
    getItems(e.target.value);
}

function closeModal() {
    document.getElementById('modal').classList.add('hidden');
}

function addRecord(e) {
    e.preventDefault();
    //console.log(e.target.id)
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
        fetch('/records',{method:'post',body: data})
            .then(response => response.json())
            .then(json => {
                props.setRecords(json);
                document.getElementById('modal').classList.add('hidden');
            })
            .catch(error => console.error(error));
        
    }
}


//onMounted(() => {
    //console.log('categories',categories)
    //getItems(categories[0].categoryId);
//});


getItems('100'); // should use first category id in categories

</script>

<template>
<div class="modal hidden" tabindex="-1" id="modal">
    <div class="modal-body">
        <h2>Add Item</h2>
        <span class="x" @click="closeModal()">X</span>
        <form id="recordForm" @submit="addRecord">
            <div id="category-container">
                <label for="category">Category</label>
                <select class="form-input" name="category" id="category" @change="changeCategory">
                    <option v-for="(category, index) in categories" :value="category.categoryId">{{category.category}}</option>
                </select>
            </div>
            <div id="item-container">
                <label for="item">Item</label>
                <select class="form-input" name="item" id="item">
                    <option v-for="(item, index) in items" :value="item.nameSpecific">{{item.nameSpecific}}</option>
                </select>
                <span class="error hidden" id="item-error">Item already added</span>
            </div>
            <div class="flex">
                <div>
                    <label for="count">Count</label>
                    <input type="number" name="count" id="count" class="form-input"/>
                    <span class="error hidden" id="count-error">Count must be numeric</span>
                </div>
                <div>
                    <label for="price">Price</label>
                    <input type="number" name="price" id="price" class="form-input"/>
                    <span class="error hidden" id="price-error">Price must be numeric</span>
                </div>
            </div>
            <div>
                <br />
                <input type="submit" value="Add Item"  />
            </div>
        </form>
    </div>
</div>
</template>


<style scoped>

.modal {
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0,0,0); /* fallback color */
    background-color: rgba(0,0,0,0.4); /* black w/ opacity */
}

.modal-body {
    background-color: light-dark(#FFF, #333);
    margin: 150px auto;
    padding: 20px;
    border: 1px solid #888;
    width: 300px;
    border-radius: 4px;
    border: 1px solid #777;
    z-index: 999;
}

.modal-body h2 {
    margin-top:0px;
    margin-bottom:10px;
    width: 200px;
    float: left;
}

.x {
    color: light-dark(#05b, #0af);
    border: 1px solid light-dark(#05b, #0af);
    padding: 2px 6px;
    cursor: pointer;
    float: right;
    width: 10px;    
    border-radius: 4px;
    font-size:15px;
}

.x:hover {
    text-decoration: none;
}

form {
    clear:both;
}

label {
    display:block;
    margin-top: 10px;
    font-weight: bold;
}

.error {
    color: light-dark(#900, #F33);
    font-size: 13px;
}

.hidden {
    display: none;
}
</style>