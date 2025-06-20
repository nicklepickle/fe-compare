
function Modal() {
  const modal = {
    classes: null,
    load(categories) {
        modal.classes = document.getElementById('modal').classList;
        modal.renderCategories(categories)
        modal.fetchItems(categories[0].categoryId);
    },
    open() {
        modal.classes.remove('hidden');
    },
    close() {
        modal.classes.add('hidden');
    },
    renderCategories(json) {
        const $select = document.getElementById('category');
        for (const cat of json) {
            const opt = document.createElement('option');
            opt.setAttribute('value', cat.categoryId);
            opt.innerText = cat.category;
            $select.append(opt);
        }      
    },
    fetchItems(category) {
        //console.log('fetch category',category);
        fetch('/items?category=' + category)
            .then(response => response.json())
            .then(json => {modal.renderItems(json)})
            .catch(error => console.error(error));
    },
    renderItems(json) {
        const $select = document.getElementById('item');
        $select.innerHTML = '';
        for (const item of json) {
            const opt = document.createElement('option');
            opt.setAttribute('value', item.nameSpecific)
            opt.innerText = item.nameSpecific;
            $select.append(opt);
        }      
    },
    addRecord(e, success) {
        e.preventDefault();
        //console.log(e.target.id)
        document.querySelectorAll('.error').forEach((error) => {
            error.classList.add('hidden');
        });
        const $form = document.getElementById(e.target.id);
        const data = new URLSearchParams(new FormData($form));
        let errors = 0;
        data.forEach(function(value, key) {
            if ((key == 'price' || key == 'count') && !value.match(/[0-9]+/g)) {
                document.getElementById(key + '-error').classList.remove('hidden');
                errors++;
            }
            else if(key == 'item' && document.querySelector(`input[name="${value}"]`) != null) {
                //console.log(document.querySelector(`input[name="${value}"]`))
                document.getElementById(key + '-error').classList.remove('hidden');
                errors++;
            }
        })
        if (errors == 0) {
            fetch('/records',{method:'post',body: data})
                .then(response => response.json())
                .then(json => {success(); modal.close();})
                .catch(error => console.error(error));
            
        }

    },
  }
  return modal;
}

export default Modal;