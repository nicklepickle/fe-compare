function Category({category, records}) {
    function checkItem(e) {
        //console.log(e.target.name, e.target.checked)
        fetch(`/check?item=${e.target.name}&checked=${e.target.checked}`)
            .catch(error => console.error(error));
    }

    return (
        <>
            <tr><th colSpan="3" class="category">{category()} </th></tr>
            <For each={records}>
                {(rec) => (
                <tr>
                    <td><input type="checkbox" name={rec.item} checked={rec.checked} onChange={checkItem} />{rec.item}</td>
                    <td>{rec.count}</td>
                    <td>${rec.price}</td>
                </tr>
                )}
            </For>
        </>
    )


}

export default Category
