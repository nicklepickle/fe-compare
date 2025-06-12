import { useState, useEffect } from 'react';
import './Records.css'

function Records({categories, setRecords, records}) {
    function checkItem(e) {
        console.log(e.target.name, e.target.checked)
        fetch(`/check?item=${e.target.name}&checked=${e.target.checked}`)
        .then(response => response.json())
        .then(json => {setRecords(json) })
        .catch(error => console.error(error));

    }

  /* 
    const [recats, setRecats] = useState([]);

    const buildRecats = function() {
       let rc = []
        for (const cat of categories) {
            for (const rec of records) {
                if (rec.category == cat.categoryId) {
                    if (!rc[cat.categoryId]) {
                        rc[cat.categoryId] = [];
                    }
                    rc[cat.categoryId].push(rec);
                }
            }
        }
        setRecats(rc);
    }

    
    useEffect(() => {buildRecats()},[records])

        console.log(recats.length);

        recats.map( function(cat) {
            if (cat.length > 0) {
                cat.map( function(rec) {
                    console.log(rec)
                })
            }
        })

     
    return (

    <>
        <div id="records">
            <h4>{recats.length}</h4>
            <table className="records">
                <thead><tr><th>Item</th><th>Count</th><th>Price</th></tr></thead>
                <tbody>{recats.map( function(cat) { 
                    <tr><td>CATEGORY</td></tr>
                    cat.map( function(rec) {
                    return (
                    <tr key={rec.item}>
                        <td><input type="checkbox"  onChange={checkItem} />{rec.item}</td>
                        <td>{rec.count}</td>
                        <td>{rec.price}</td>
                    </tr>)}
                    )}
                )}</tbody>
            </table>
        </div>
    </>
    )
        */
    return (
        <>
            <div id="records">
                <table className="records">
                    <thead><tr><th>Item</th><th>Count</th><th>Price</th></tr></thead>
                    <tbody>{records.map( function(record) { 
                    return (
                    <tr key={record.item}>
                        <td><input type="checkbox" name={record.item} checked={record.checked} onChange={checkItem} />{record.checked} {record.item}</td>
                        <td>{record.count}</td>
                        <td>${Number(record.price).toFixed(2)}</td>
                    </tr>)})}</tbody>
                </table>
            </div>
        </>
    )

}

export default Records
