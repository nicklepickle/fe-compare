<script>
    import { onMount } from "svelte";
    let total = $state(0);
    let {records, categories} = $props();

	function checkItem(e) {
        console.log(e.target.name, e.target.checked);
        fetch(`/check?item=${e.target.name}&checked=${e.target.checked}`).catch(error => console.error(error));
	}

    /*
    let recordsByCategory = $state([]);
    function getCategoryName(id) {
        console.log(JSON.stringify(categories.length))
        for(const category of categories) {
            if (category.categoryId == id) {
                return category.category;
            }
        }
        return 'Unknown';
    }

    function setRecordsByCategory(recs) {
        if (recs.length == 0) {
            return [];
        }
        recs = recs.sort((a,b) => a.category - b.category)
        // marshal into array of category objects
        for (const r of recs) {
            // add the category if it isn't already there
            if (!recordsByCategory.filter((rbc) => rbc.categoryId == r.category).length != 0) {
                recordsByCategory.push({
                    category: getCategoryName(r.category),
                    categoryId: r.category,
                    records: []});
            }
            for(const rbc of recordsByCategory) {
                if (rbc.categoryId == r.category) {
                    rbc.records.push(r)
                }
            }
            total += (Number(r.price) * Number(r.count));
        }
    }



    onMount( function () {
        fetch('/records')
            .then(response => response.json())
            .then(json => {records = json; setRecordsByCategory(records)})
            .catch(error => console.error(error));
    });



        {#each recordsByCategory as rbc}
        <tr>
            <th class="category" colspan="3">{rbc.category}</th>
        </tr>
      {#each rbc.records as record}
        <tr>
            <td><input type="checkbox" name={record.item} bind:checked={record.checked} onchange={checkItem} class="record-check">{record.item}</td>
            <td>{record.count}</td>
            <td>${Number(record.price).toFixed(2)}</td>
        </tr>
      {/each}
    {/each}
    */
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
      {#each records as record}
        <tr>
            <td><input type="checkbox" name={record.item} bind:checked={record.checked} onchange={checkItem} class="record-check">{record.item}</td>
            <td>{record.count}</td>
            <td>${Number(record.price).toFixed(2)}</td>
        </tr>
      {/each}
        <tr>
            <td colspan="2" class="total">Total</td>
            <td class="total">${total.toFixed(2)}</td>
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