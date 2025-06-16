<script>
import { onMount } from "svelte";
let records =  $state([]);
let total = $state(0);

onMount( function () {
    fetch('/records')
        .then(response => response.json())
        .then(json => {records = json; let t=0; for(const r of records){ t+=Number(r.price); } total = t;})
        .catch(error => console.error(error));
});
</script>

<div>
<table class="records">
    <thead>
        <tr><th>Item</th><th>Count</th><th>Price</th></tr>
    </thead>
    <tbody id="records">
    {#each records as record}
        <tr><td>{record.item}</td><td>{record.count}</td><td>${Number(record.price).toFixed(2)}</td></tr>
    {/each}
        <tr><td colspan="2" class="total">Total</td><td class="total">${total.toFixed(2)}</td></tr>
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