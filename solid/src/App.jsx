import { createSignal, createResource } from 'solid-js'
import Records from './Records.jsx'
import Modal from './Modal.jsx'
import Cookie from './cookie.js'

function App() {
    const [records, setRecords] = createSignal([])

    // use a resource because categories don't change
    const [categories] = createResource(async() => {
        const response = await fetch('/categories').catch(error => console.error(error)); 
        return response.json();
    },{initialValue: []})

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

    const toggleDark = () => {
        const root = document.querySelector(":root");
        let colorScheme = root.style.getPropertyValue('color-scheme');
        colorScheme = (colorScheme == 'dark' ? 'light' : 'dark');
        root.style.setProperty('color-scheme', colorScheme)
        let value = JSON.stringify({colorScheme:colorScheme});

        Cookie.setCookie('_fe-c', value) 
    }

    fetchRecords();
    
    let c = Cookie.getCookie('_fe-c');
    if (c) {
        document.querySelector(":root").style.setProperty('color-scheme', JSON.parse(c).colorScheme)
    }

    return (
    <>
      <div class="flex controls">
          <div><h2>Solid Test</h2></div>
          <div id="dark-toggle"><a onClick={toggleDark}>&#9681;</a></div>
      </div>
      <div class="flex controls">
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
