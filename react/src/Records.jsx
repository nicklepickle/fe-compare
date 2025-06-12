import { useState, useEffect } from 'react';
import './Records.css'

function Records() {
    const [records, setRecords] = useState([]);
    const fetchRecords = async() => {
        await fetch('/records')
            .then(response => response.json())
            .then(json => {setRecords(json) })
            .catch(error => console.error(error));   
    }

    useEffect(() => {fetchRecords()}, []);
    //console.log(JSON.stringify(records))

    return (
    <>
        <div id="records">
            <table className="records">
                <thead><tr><th>Item</th><th>Count</th><th>Price</th></tr></thead>
                <tbody>{records.map( function(record) { 
                return (<tr key={record.item}><td>{record.item}</td><td>{record.count}</td><td>{record.price}</td></tr>)})}</tbody>
            </table>
        </div>
    </>
    )
}

export default Records
