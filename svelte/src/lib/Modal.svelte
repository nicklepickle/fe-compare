<div class="modal hidden" tabindex="-1" id="modal">
    <div class="modal-body">
        <h2>Add Item</h2>
        <a class="x">X</a>
        <form id="recordForm">
            <div id="category-container">
                <label for="category">Category</label>
                <select class="form-input" name="category" id="category"></select>
            </div>
            <div id="item-container">
                <label for="item">Item</label>
                <select class="form-input" name="item" id="item"></select>
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

.error {
    color: #900;
    font-size: 12px;
}

.hidden {
    display: none;
}
</style>