import './Modal.css'
import { useState, useEffect } from 'react';


function Modal() {
    const [categories, setCategories] = useState([]);
    const [items, setItems] = useState([]);
    const fetchCategories = async() => {
        await fetch('/categories')
            .then(response => response.json())
            .then(json => {setCategories(json) })
            .catch(error => console.error(error));   
    }

    const fetchItems= async(category) => {
        await fetch('/items?category='+ category)
            .then(response => response.json())
            .then(json => {setItems(json) })
            .catch(error => console.error(error));   
    }

    const categoryChanged = function(e) {
        //console.log('changed to ', e.target.value)
        fetchItems(e.target.value); //nice!
    }

    // handle submit
    // https://medium.com/@kirstyn.nichole/creating-a-form-json-post-request-in-javascript-with-react-bad63a5e45bc

    useEffect(() => {fetchCategories()}, []);
    useEffect(() => {fetchItems('100')}, []);


  return (
    <>
<div className="modal hidden" tabIndex="-1" id="modal">
    <div className="modal-body">
        <h2>Add Item</h2>
        <a className="x" onClick={() => {
              document.getElementById('modal').classList.toggle('hidden');
            }}>X</a>
        <form>
            <div id="category-container">
            <label htmlFor="category">Category</label><br />
            <select className="form-input" name="category" id="category" onChange={categoryChanged}>
                {categories.map( function(category) {
                    return (<option key={category.categoryId} value={category.categoryId}> {category.category}</option>)})}
            </select>
            </div>
            <div id="item-container">
            <label htmlFor="item">Item</label><br />
            <select className="form-input" name="item" id="item">
                {items.map( function(item, index) {
                    return (<option key={index} value={item.nameSpecific}>{item.nameSpecific}</option>)})}     
            </select>
            </div>
            <div className="flex">
                <div>
                    <label htmlFor="count">Count</label><br />
                    <input type="number" name="count" id="count" className="form-input"/>
                </div>
                <div>
                    <label htmlFor="price">Price</label><br />
                    <input type="number" name="price" id="price" className="form-input"/>
                </div>
            </div>
            <div>
                <br />
                <input type="button" value="Add Item" />
            </div>
        </form>
    </div>
</div>
    </>
  )
}

export default Modal