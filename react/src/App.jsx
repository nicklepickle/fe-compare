import { useState, useEffect } from 'react';
import { ErrorBoundary } from "react-error-boundary";
import Records from './Records.jsx'
import Modal from './Modal.jsx'

function Fallback({ error, resetErrorBoundary }) {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.

  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
    </div>
  );
}

function App() {
    function clearChecked(e) {
        console.log(e.target.name, e.target.checked)
        fetch('/clear')
        .then(response => response.json())
        .then(json => {setRecords(json) })
        .catch(error => console.error(error));

    }

    const [records, setRecords] = useState([]);
    const [categories, setCategories] = useState([]);


    const fetchRecords = async() => {
        await fetch('/records')
            .then(response => response.json())
            .then(json => {setRecords(json) })
            .catch(error => console.error(error));   
    }

    const fetchCategories = async() => {
        await fetch('/categories')
            .then(response => response.json())
            .then(json => {setCategories(json)  })
            .catch(error => console.error(error));   
    }

    useEffect(() => {fetchRecords()}, []);
    useEffect(() => {fetchCategories()}, []);


  return (
    <>
      <h2>React Test</h2>
      <div className="flex controls">
          <div><input type="button" value="Add Item" onClick={() => {
            document.getElementById('modal').classList.toggle('hidden');
          }} /></div>
          <div><input type="button" value="Clear Checked" onClick={clearChecked} /></div>
      </div>
      
      <ErrorBoundary  onError={console.error} FallbackComponent={Fallback} >
        <Records categories={categories}  setRecords={setRecords} records={records} />
        <Modal categories={categories} setRecords={setRecords} />
      </ErrorBoundary>
    </>
  )
}

export default App
