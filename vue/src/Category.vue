 <script setup>
import { ref } from 'vue'
//import { onMounted } from 'vue'

const props = defineProps({
  category: String,
  records: Array
})

function checkItem(e) {
    console.log(e.target.name, e.target.checked)
    fetch(`/check?item=${e.target.name}&checked=${e.target.checked}`).catch(error => console.error(error));
}
 </script>
 
 <template>
    <tr>
        <th class="category" colspan="3">{{category}}</th>
    </tr>
    <tr v-for="(record, index) in records ">
        <td><input type="checkbox" :name="record.item" v-model="record.checked" @change="checkItem">{{record.item}}</td>
        <td>{{record.count}}</td>
        <td>${{Number(record.price).toFixed(2)}}</td>
    </tr>
</template>

<style scoped>
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


.records th.category {
    padding-top: 10px;
    text-align:left;
    font-weight:normal;
    font-size:18px;
    text-align:left !important;
}
</style>