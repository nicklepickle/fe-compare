import './Modal.css'

function Modal() {
  return (
    <>
<div className="modal hidden" tabIndex="-1" id="modal">
    <div className="modal-body">
        <h2>Add Item</h2>
        <a className="x" onClick={() => {
              document.getElementById('modal').classList.toggle('hidden');
            }}>X</a>
        <form>
            <div id="category-container"></div>
            <div id="item-container"></div>
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