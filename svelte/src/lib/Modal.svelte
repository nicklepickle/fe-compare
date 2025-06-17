<script>
    import { onMount } from "svelte";
    let {categories} = $props();
    let items = $state([]);

    onMount( function () {
        fetchItems('100');
        document.querySelector('.x').addEventListener('click', () => 
            document.getElementById('modal').classList.add('hidden'));
    })

    function fetchItems(category) {
        fetch('/items?category=' + category)
            .then(response => response.json())
            .then(json => items = json)
            .catch(error => console.error(error));
    }

    function changeCategory(e) {
        fetchItems(e.target.value)
    }

    function addRecord(e, success) {
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
                //console.log(document.querySelector(`input[name="${value}"]`))
                document.getElementById(key + '-error').classList.remove('hidden');
                errors++;
            }
        })
        if (errors == 0) {
            fetch('/records',{method:'post',body: data})
                .then(response => response.json())
                .then(json => {})
                .catch(error => console.error(error));
            document.getElementById('modal').classList.add('hidden');
        }

    }
</script>

<div class="modal hidden" tabindex="-1" id="modal">
    <div class="modal-body">
        <h2>Add Item</h2>
        <span class="x">X</span>
        <form id="recordForm" onsubmit={addRecord}>
            <div id="category-container">
                <label for="category">Category</label>
                <select class="form-input" name="category" id="category" onchange={changeCategory}>
                {#each categories as category}
                    <option value={category.categoryId}>{category.category}</option>
                {/each}
                </select>
            </div>
            <div id="item-container">
                <label for="item">Item</label>
                <select class="form-input" name="item" id="item">
                {#each items as item}
                    <option value={item.nameSpecific}>{item.nameSpecific}</option>
                {/each}                    
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

<style>
    
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
    background-color: #fefefe;
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
    color: #05b;
    border: 1px solid #05b;
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
    color: #900;
    font-size: 12px;
}

.hidden {
    display: none;
}
</style>