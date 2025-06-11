import { useState, useEffect } from 'react';
import './Records.css'

function Records() {
    const [records, setRecords] = useState(null);
    
    useEffect(() => {
        fetch('/records')
            .then(response => response.json())
            .then(json => {setRecords(json) })
            .catch(error => console.error(error));
    }, []);
/*
    records fails to render after first time WTF??
*/

    return (
    <>

        <div id="records">
            <table className="records">
                <thead><tr><th>Item</th><th>Count</th><th>Price</th></tr></thead>
                <tbody>{records.map( function(record) { 
                return (<tr><td>{record.item}</td><td>{record.count}</td><td>{record.price}</td></tr>)})}</tbody>
            </table>
        </div>
    </>
    )
}

export default Records
