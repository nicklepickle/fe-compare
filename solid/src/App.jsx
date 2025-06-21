import { createSignal } from 'solid-js'
import Records from './Records.jsx'
import Modal from './Modal.jsx'
//import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [records, setRecords] = createSignal([])
  const [categories, setCategories] = createSignal([])

  function clearChecked(e) {
      //console.log(e.target.name, e.target.checked)
      fetch('/clear')
        .then(response => response.json())
        .then(json => {setRecords(json) })
        .catch(error => console.error(error));
  }

  function fetchCategories() {
      fetch('/categories')
        .then(response => response.json())
        .then(json => {setCategories(json)  })
        .catch(error => console.error(error));   
  }

  function fetchRecords() {
      fetch('/records')
        .then(response => response.json())
        .then(json => {setRecords(json) })
        .catch(error => console.error(error));   
  }

  fetchCategories();
  fetchRecords();

  return (
    <>
      <h2>Solid Test</h2>
      <div className="flex controls">
          <div><input type="button" value="Add Item" onClick={() => {
            // main shouldn't have to know how to open. wish it was Modal.open()
            document.getElementById('modal').classList.remove('hidden');
          }} /></div>
          <div><input type="button" value="Clear Checked" onClick={clearChecked} /></div>
      </div>

      <Records categories={categories} records={records} />
      <Modal categories={categories} setRecords={setRecords} />
    </>
  )
}

export default App
