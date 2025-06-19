<script setup>
import { ref } from 'vue'

defineProps({
  categories: Array,
  records: Array
})

function getTotal(recs) {
    return recs.reduce((total, rec) => {return total + (Number(rec.price) * Number(rec.count))}, 0)
}

function checkItem(e) {
    console.log(e.target.name, e.target.checked)
    fetch(`/check?item=${e.target.name}&checked=${e.target.checked}`).catch(error => console.error(error));
}

</script>

<template>
<table class="records">
    <thead>
        <tr>
            <th>Item</th>
            <th>Count</th>
            <th>Price</th>
        </tr>
    </thead>
    <tbody id="records" >
        <tr v-for="(record, index) in records">
            <td><input type="checkbox" :name="record.item" v-model="record.checked" @change="checkItem">{{record.item}}</td>
            <td>{{record.count}}</td>
            <td>${{Number(record.price).toFixed(2)}}</td>
        </tr>

        <tr>
            <td colspan="2" class="total">Total</td>
            <td class="total">${{Number(getTotal(records)).toFixed(2)}}</td>
        </tr>

    </tbody>
</table>

</template>

<style scoped>
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