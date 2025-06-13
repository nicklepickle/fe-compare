import './Records.css'
import Category from './Category.jsx'

function Records({categories, setRecords, records}) {
    const recordsByCategory = [];

    function getCategoryName(id) {
        for(const category of categories) {
            if (category.categoryId == id) {
                return category.category;
            }
        }
        return 'Unknown';
    }

    let total = 0;
    for (const r of records.sort((a,b) => a.category - b.category)) {
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
    
    //console.log(JSON.stringify(recordsByCategory))
    return (

        <>
            <div id="records">
                <table className="records">
                    <thead><tr><th>Item</th><th>Count</th><th>Price</th></tr></thead>
                    <tbody>{recordsByCategory.map( function(rbc) {  
                        return (<Category key={rbc.categoryId} recordsByCategory={rbc} setRecords={setRecords}/>)}
                    )}
                    <tr><td colSpan="2" className="total">Total</td><td className="total">${total.toFixed(2)}</td></tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Records
