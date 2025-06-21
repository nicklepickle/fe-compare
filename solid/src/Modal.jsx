import './Modal.css'

function Modal({categories, setRecords}) {

    function closeModal() {
        document.getElementById('modal').classList.add('hidden');
    }


    function fetchItems(category) {
        fetch('/items?category='+ category)
            .then(response => response.json())
            .then(json => {setItems(json) })
            .catch(error => console.error(error));   
    }

    function categoryChanged(e) {
        //console.log('changed to ', e.target.value)
        fetchItems(e.target.value); //nice!
    }

    /*

    {categories.map( function(category) {
        return (<option key={category.categoryId} value={category.categoryId}> {category.category}</option>)})}
    {items.map( function(item, index) {
        return (<option key={index} value={item.nameSpecific}>{item.nameSpecific}</option>)})}   
    */
return (
    <>
<div className="modal hidden" tabIndex="-1" id="modal">
    <div className="modal-body">
        <h2>Add Item</h2>
        <a className="x" onClick={closeModal}>X</a>
        <form id="recordForm">
            <div id="category-container">
                <label htmlFor="category">Category</label>
                <select className="form-input" name="category" id="category" onChange={categoryChanged}>

                </select>
            </div>
            <div id="item-container">
                <label htmlFor="item">Item</label>
                <select className="form-input" name="item" id="item">

                </select>
                <span className="error hidden" id="item-error">Item already added</span>
            </div>
            <div className="flex">
                <div>
                    <label htmlFor="count">Count</label>
                    <input type="number" name="count" id="count" className="form-input"/>
                    <span className="error hidden" id="count-error">Count must be numeric</span>
                </div>
                <div>
                    <label htmlFor="price">Price</label>
                    <input type="number" name="price" id="price" className="form-input"/>
                    <span className="error hidden" id="price-error">Price must be numeric</span>
                </div>
            </div>
            <div>
                <br />
                <input type="submit" value="Add Item" />
            </div>
        </form>
    </div>
</div>
    </>
  )
}

export default Modal