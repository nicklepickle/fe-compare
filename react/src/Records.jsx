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

    function recordsByCategoryContains(cat) {
        for(const cr of recordsByCategory) {
            if (cr.categoryId == cat) {
                console.log('contains')
                return true;
            }
        }
        return false;
    }

    for (const r of records) {
        if (!recordsByCategoryContains(r.category)) {
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

    }
    
    //console.log(JSON.stringify(recordsByCategory))
    return (

        <>
            <div id="records">
                <table className="records">
                    <thead><tr><th>Item</th><th>Count</th><th>Price</th></tr></thead>
                    <tbody>{recordsByCategory.map( function(rbc) {  
                        return (<Category key={rbc.categoryId} recordsByCategory={rbc} setRecords={setRecords}/>)}
                    )}</tbody>
                </table>
            </div>
        </>
    )
}

export default Records
