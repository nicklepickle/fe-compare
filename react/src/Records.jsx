import './Records.css'
import Category from './Category.jsx'

function Records({categories, setRecords, records}) {
    function checkItem(e) {
        console.log(e.target.name, e.target.checked)
        fetch(`/check?item=${e.target.name}&checked=${e.target.checked}`)
        .then(response => response.json())
        .then(json => {setRecords(json) })
        .catch(error => console.error(error));

    }

    function getCategoryName(id) {
        for(const category of categories) {
            if (category.categoryId == id) {
                return category.category;
            }
        }
        return 'Unknown';
    }

    const catrecs = []

    function catRecContains(cat) {
        for(const cr of catrecs) {
            if (cr.categoryId == cat) {
                console.log('contains')
                return true;
            }
        }
        return false;
    }

    for (const r of records) {
        if (!catRecContains(r.category)) {
            catrecs.push({
                category: getCategoryName(r.category),
                categoryId: r.category,
                records: []});
        }
        for(const cr of catrecs) {
            if (cr.categoryId == r.category) {
                cr.records.push(r)
            }
        }

    }
    
    //console.log(JSON.stringify(catrec))
    return (

        <>
            <div id="records">
                <table className="records">
                    <thead><tr><th>Item</th><th>Count</th><th>Price</th></tr></thead>
                    <tbody>{catrecs.map( function(cr) {  return (<Category key={cr.categoryId} catrec={cr} setRecords={setRecords}/>)})}</tbody>
                </table>
            </div>
        </>
    )
}

export default Records
