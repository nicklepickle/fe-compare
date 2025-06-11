
function Modal() {
  const modal = {
    classes: null,
    load() {
        modal.classes = document.getElementById('modal').classList;
        modal.fetchCategories();
    },
    open() {
        modal.classes.remove('hidden');
    },
    close() {
        modal.classes.add('hidden');
    },
    fetchCategories() {
        fetch('/categories')
            .then(response => response.json())
            .then(json => { 
                modal.categories = json;
                modal.renderCategories(json)
                modal.fetchItems(json[0].categoryId);
            })
            .catch(error => console.error(error));
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
    }
  }
  return modal;
}

export default Modal;