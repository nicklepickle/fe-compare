function Records() {
  const records = {
    $body: null,
    categories: [],
    load() {
        records.$body = document.getElementById('records');
        fetch('/categories') // annoying that we do this here and in modal
            .then(response => response.json())
            .then(json => {
                records.categories = json;
                records.fetchRecords();
            })
            .catch(error => console.error(error));
        
    },
    fetchRecords() {
        fetch('/records')
            .then(response => response.json())
            .then(json => {records.renderRecords(json)})
            .catch(error => console.error(error));
    },
    getCategoryName(id) {
        for(const category of records.categories) {
            if (category.categoryId == id) {
                return category.category;
            }
        }
        return 'Unknown';
    },
    renderRecords(json) {
        records.$body.innerHTML = '';
        let sorted = json.sort((a,b) => a.category - b.category);
        let cat = '';
        let total = 0;
        for(const record of sorted) {
            if (record.category != cat) {
                const $headerRow = document.createElement('tr');
                const $header = document.createElement('th');
                $header.setAttribute('colspan', '3');
                $header.classList.add('category');
                $header.innerText = records.getCategoryName(record.category);
                $headerRow.append($header);
                records.$body.append($headerRow);
                cat = record.category;
            }
            const $row = document.createElement('tr');
            const $cell1 = document.createElement('td');
            const $cell2 = document.createElement('td');
            const $cell3 = document.createElement('td');

            const $check = document.createElement('input');
            $check.setAttribute('type','checkbox')
            $check.setAttribute('name',record.item)
            if (record.checked) {
                $check.setAttribute('checked','checked')
            }
            $check.addEventListener('change',(e) => {records.checkItem(e)});
            $cell1.append($check, record.item);
            $cell2.innerText = record.count;
            $cell3.innerText = '$' + Number(record.price).toFixed(2);

            $row.append($cell1);
            $row.append($cell2);
            $row.append($cell3);

            records.$body.append($row);
            total += Number(record.price);
        }

        const $totalRow = document.createElement('tr');
        const $header = document.createElement('td');
        $header.setAttribute('colspan', '2');
        $header.classList.add('total');
        $header.innerText = 'Total';

        const $total = document.createElement('td');
        $total.classList.add('total');
        $total.innerText = '$' + total.toFixed(2);

        $totalRow.append($header);    
        $totalRow.append($total);
        records.$body.append($totalRow);
    
    },
    checkItem(e) {
        //console.log(e.target.name)
        //console.log(e.target.checked)
        fetch(`/check?item=${e.target.name}&checked=${e.target.checked}`).catch(error => console.error(error));
    },
    clearChecked() {
        fetch('/clear')
            .then(response => records.fetchRecords())
            .catch(error => console.error(error));
    }
  }
  return records;
}


export default Records;