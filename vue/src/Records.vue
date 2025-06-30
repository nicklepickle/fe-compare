<script setup>

import Category from './Category.vue'
defineProps({
  categories: Array,
  records: Array
})

function getTotal(recs) {
    return recs.reduce((total, rec) => {return total + (Number(rec.price) * Number(rec.count))}, 0)
}

function getCategoryRecords(cats, recs) {
    let catRecords = [] 
    for(const c of cats) {
        let catRecs = recs.filter((r) => r.category == c.categoryId);
        if (catRecs.length > 0) {
            let cr = catRecords.filter((cr) => cr.categoryId == c.category);
            if (cr.length == 0) {
                catRecords.push({category:c.category, categoryId:c.categoryId, records:catRecs});
            }
            else {
                cr[0].push({category:c.category, categoryId:c.categoryId, records:catRecs});
            }
        }
    }
    return catRecords;
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
        <Category  v-for="(cat, index) in getCategoryRecords(categories, records)" :category="cat.category" :records="cat.records" />
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

.records td.total {
    padding-top: 10px;
    font-weight:bold;
    border-width:0px;
    font-size:14px;
}

.records th { 
    border-bottom:1px solid #777;
    padding-top: 10px;
    text-align:left;
    font-size:14px;
}

.records tr > th:last-of-type {
    text-align: right;
}

.records tr > td:last-of-type {
    text-align:right;
}

</style>