<script>
    let {records = $bindable(), categories} = $props();

	function checkItem(e) {
        fetch(`/check?item=${e.target.name}&checked=${e.target.checked}`).catch(error => console.error(error));
	}

    function getCategoryRecords(id) {
        return records.filter((r) => r.category == id)
    }

    function getTotal(recs) {
        return recs.reduce((total, rec) => {return total + (Number(rec.price) * Number(rec.count))}, 0)
    }


</script>

<div>
<table class="records">
    <thead>
        <tr>
            <th>Item</th>
            <th>Count</th>
            <th>Price</th>
        </tr>
    </thead>
    <tbody id="records">
      {#each categories as category}
        {#if getCategoryRecords(category.categoryId).length > 0}
            <tr>
                <th class="category" colspan="3">{category.category}</th>
            </tr>
            {#each getCategoryRecords(category.categoryId) as record}
                <tr>
                    <td><input type="checkbox" name={record.item} bind:checked={record.checked} onchange={checkItem} class="record-check">{record.item}</td>
                    <td>{record.count}</td>
                    <td>${Number(record.price).toFixed(2)}</td>
                </tr>
            {/each}
        {/if}
      {/each}
        <tr>
            <td colspan="2" class="total">Total</td>
            <td class="total">${getTotal(records).toFixed(2)}</td>
        </tr>
    </tbody>
</table>
</div>

<style>
.records { 
    border-collapse:collapse;
    width:400px;
    margin-top:10px;
}

.records tr > td:last-of-type {
    text-align:right;
}

.records tr > th:last-of-type {
    text-align: right;
}

.records td { 
    border:1px solid #777;
    padding:4px;
    font-size:14px;
}

.records th { 
    border-bottom:1px solid #777;
    padding-top: 10px;
    text-align:left;
    font-size:14px;
}

.records th.category {
    font-weight:normal;
    font-size:18px;
    text-align:left !important;
}

.records td.total {
    padding-top: 10px;
    font-weight:bold;
    border:1px solid #FFF;
}
</style>