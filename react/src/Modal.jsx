import './Modal.css'
import { useState, useEffect } from 'react';

function Modal({categories, setRecords}) {
    const [items, setItems] = useState([]);
    const fetchItems= async(category) => {
        await fetch('/items?category='+ category)
            .then(response => response.json())
            .then(json => {setItems(json) })
            .catch(error => console.error(error));   
    }

    const toggleModal = function() {
        document.getElementById('modal').classList.toggle('hidden')
    }

    const categoryChanged = function(e) {
        //console.log('changed to ', e.target.value)
        fetchItems(e.target.value); //nice!
    }

    const handleSubmit = function(e) {
         e.preventDefault();
        document.querySelectorAll('.error').forEach((error) => {
            error.classList.add('hidden');
        });
        //console.log(e.target.id)
        const $form = document.getElementById(e.target.id);
        const data = new URLSearchParams(new FormData($form)); 
        let errors = 0;
        data.forEach(function(value, key) {
            if ((key == 'price' || key == 'count') && !value.match(/[0-9]+/g)) {
                document.getElementById(key + '-error').classList.remove('hidden');
                errors++;
            }
            else if(key == 'item' && document.querySelector(`input[name="${value}"]`) != null) {
                console.log(document.querySelector(`input[name="${value}"]`))
                document.getElementById(key + '-error').classList.remove('hidden');
                errors++;
            }
        })
        if (errors == 0) {
            fetch('/records',{method:'post',body: data})
                .then(response => response.json())
                .then(json => { setRecords(json); toggleModal()})
                .catch(error => console.error(error));  
        }     
    }

    useEffect(() => {fetchItems('100')}, []);


  return (
    <>
<div className="modal hidden" tabIndex="-1" id="modal">
    <div className="modal-body">
        <h2>Add Item</h2>
        <a className="x" onClick={toggleModal}>X</a>
        <form onSubmit={handleSubmit} id="recordForm">
            <div id="category-container">
                <label htmlFor="category">Category</label>
                <select className="form-input" name="category" id="category" onChange={categoryChanged}>
                    {categories.map( function(category) {
                        return (<option key={category.categoryId} value={category.categoryId}> {category.category}</option>)})}
                </select>
            </div>
            <div id="item-container">
                <label htmlFor="item">Item</label>
                <select className="form-input" name="item" id="item">
                    {items.map( function(item, index) {
                        return (<option key={index} value={item.nameSpecific}>{item.nameSpecific}</option>)})}     
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