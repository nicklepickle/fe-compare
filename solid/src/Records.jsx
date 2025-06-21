import './Records.css'
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
    

    //console.log(JSON.stringify(getCategoryRecords(categories, records)))

    console.log('records',records())
    if (!records) records= []

    function getTotal(recs) {
        return recs.reduce((total, rec) => total + (Number(rec.price) * Number(rec.count)), 0);
    }

    return (
    <div id="records">
        <table className="records">
            <thead>
                <tr><th>Item</th><th>Count</th><th>Price</th></tr>
            </thead>
            <tbody>
                <For each={getCategoryRecords(categories(),records())}>
                    {(cat) => (
                        <tr><th colSpan="3" className="category">{cat.category} </th>
                        <For each={cat.records}>
                            {(rec) => (
                            <tr>
                                <td><input type="checkbox" name={rec.item}  checked={rec.checked}></input>{rec.item}</td>
                                <td>{rec.count}</td>
                                <td>${rec.price}</td>
                            </tr>
                            )}
                        </For>
                        </tr>
                    )}
                </For>
                {/*}
                <For each={records()}>
                    {(rec) => (
                    <tr>
                        <td><input type="checkbox" name={rec.item}  checked={rec.checked}></input>{rec.item}</td>
                        <td>{rec.count}</td>
                        <td>${rec.price}</td>
                    </tr>
                    )}
                </For>
                */}
                <tr>
                    <td colSpan="2" className="total">Total</td>
                    <td className="total">${getTotal(records()).toFixed(2)}</td>
                </tr>
            </tbody>
        </table>
    </div>
    );
}

export default Records
