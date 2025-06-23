import { useState, useEffect } from 'react';
import { ErrorBoundary } from "react-error-boundary";
import Records from './Records.jsx'
import Modal from './Modal.jsx'
import Cookie from './cookie.js'

function Fallback({error}) {
  return (
    <div>
      <h3>Error</h3>
      <pre class="error">{error.message}</pre>
    </div>
  );
}

function App() {
    const [records, setRecords] = useState([]);
    const [categories, setCategories] = useState([]);

    const clearChecked = async (e) => {
        await fetch('/clear')
          .then(response => response.json())
          .then(json => {setRecords(json) })
          .catch(error => console.error(error));
    }

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

    const toggleDark = () => {
        const root = document.querySelector(":root");
        let colorScheme = root.style.getPropertyValue('color-scheme');
        colorScheme = (colorScheme == 'dark' ? 'light' : 'dark');
        root.style.setProperty('color-scheme', colorScheme)
        let value = JSON.stringify({colorScheme:colorScheme});

        Cookie.setCookie('_fe-c', value) 
    }

    useEffect(() => {fetchRecords()}, []);
    useEffect(() => {fetchCategories()}, []);

    let c = Cookie.getCookie('_fe-c');
    if (c) {
        document.querySelector(":root").style.setProperty('color-scheme', JSON.parse(c).colorScheme)
    }
  return (
    <>
      <div class="flex controls">
          <div><h2>React Test</h2></div>
          <div id="dark-toggle"><a onClick={toggleDark}>&#9681;</a></div>
      </div>
      <div className="flex controls">
          <div><input type="button" value="Add Item" onClick={() => {
            // main shouldn't have to know how to open. wish it was Modal.open()
            document.getElementById('modal').classList.remove('hidden');
          }} /></div>
          <div><input type="button" value="Clear Checked" onClick={clearChecked} /></div>
      </div>
      
      <ErrorBoundary  onError={console.error} FallbackComponent={Fallback} >
        <Records categories={categories} records={records} />
        <Modal categories={categories} setRecords={setRecords} />
      </ErrorBoundary>
    </>
  )
}

export default App
