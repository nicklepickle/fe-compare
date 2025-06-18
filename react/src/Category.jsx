function Category({categoryRecords, setRecords}) {
    function checkItem(e) {
        console.log(e.target.name, e.target.checked)
        fetch(`/check?item=${e.target.name}&checked=${e.target.checked}`)
            .then(response => response.json())
            .then(json => {setRecords(json) })
            .catch(error => console.error(error));

    }

    if (categoryRecords.records) {
    return (
        <>
            <tr><th colSpan="3" className="category">{categoryRecords.category} </th></tr>
            {categoryRecords.records.map( function(record) { 
              return (
                <tr key={record.item}>
                    <td><input type="checkbox" name={record.item} checked={record.checked} onChange={checkItem} />{record.item}</td>
                    <td>{record.count}</td>
                    <td>${Number(record.price).toFixed(2)}</td>
                </tr>)})}

        </>
    )
}

}

export default Category
