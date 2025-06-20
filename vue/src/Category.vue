 <script setup>
import { ref } from 'vue'
//import { onMounted } from 'vue'

const props = defineProps({
  category: String,
  records: Function
})
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
</style>