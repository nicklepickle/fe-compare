import './Records.css'
import Category from './Category.jsx'
import { For } from 'solid-js';

function Records({ categories, records }) {
    
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
    
    function getTotal(recs) {
        return recs.reduce((total, rec) => total + (Number(rec.price) * Number(rec.count)), 0);
    }

    return (
    <div id="records">
        <table class="records">
            <thead>
                <tr><th>Item</th><th>Count</th><th>Price</th></tr>
            </thead>
            <tbody>
                <For each={getCategoryRecords(categories(),records())}>
                    {(cat) => (
                        <Category records={cat.records} category={cat.category} />
                    )}
                </For>
                <tr>
                    <td colSpan="2" class="total">Total</td>
                    <td class="total">${getTotal(records()).toFixed(2)}</td>
                </tr>
            </tbody>
        </table>
    </div>
    );
}

export default Records
