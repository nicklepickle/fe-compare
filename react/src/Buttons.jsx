import { useState } from 'react'
import './Buttons.css'

function Buttons() {
  return (
    <>
        <div className="flex controls">
            <div><input type="button" value="Add Item" onClick={() => {
              document.getElementById('modal').classList.toggle('hidden');
            }} /></div>
            <div><input type="button" value="Clear Checked" onClick={() => {

            }} /></div>
        </div>
    </>
  )
}

export default Buttons