import express from "express";
import ViteExpress from "vite-express";
import fs from 'fs';
import bp from 'body-parser';
import hbs from 'hbs';

const __dirname = import.meta.dirname;
const app = express();
const port  = 8001;
const paths = {
  records: __dirname + "/../json/records.json",
  categories: __dirname + "/../json/categories.json",
  items: __dirname + "/../json/items.json"
}

let records = [];
let items = [];
let categories = [];

if (fs.existsSync(paths.records)) {
  records = JSON.parse(fs.readFileSync(paths.records))
}
if (fs.existsSync(paths.items)) {
  items = JSON.parse(fs.readFileSync(paths.items))
}
if (fs.existsSync(paths.categories)) {
  categories = JSON.parse(fs.readFileSync(paths.categories))
}

function getCategoryName(id) {
  for(var i=0; i< categories.length; i++) {
    if (categories[i].categoryId == id) {
      return categories[i].category;
    }
  }
}

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

app.get('/records', async(req, res, next) => {
  try {
    let html = '<table class="records"><thead><tr><th>Item</th><th>Count</th><th>Price</th></thead><tbody>';
    let cat = '';
    let total = 0;
    records.sort((a,b) => a.category - b.category);
    for(const r of records) {
        if (r.category != cat) {
          html += `<tr><th colspan="3" class="category">${getCategoryName(r.category)}</th></tr>`;
        }
        if (r.checked) {
          html += `<tr><td><input type="checkbox" name="${r.item}" checked hx-get="/check?checked=false&item=${r.item}" hx-trigger="click">${r.item}</td>`
        }
        else {
          html += `<tr><td><input type="checkbox" name="${r.item}" hx-get="/check?checked=true&item=${r.item}">${r.item}</td>`
        }
        html += `<td>${r.count}</td><td>$${Number(r.price).toFixed(2)}</td></tr>`;
        cat = r.category;
        total += (Number(r.price) * Number(r.count));
    }
    html += `<tr><td colspan="2" class="total">Total</td><td class="total">$${total.toFixed(2)}</td></tr>`;
    html += '</tbody></table>';
    res.send(html);
  }
  catch(error) {
    console.error(error);
    next(error);
  }
});

app.post('/records', async(req, res, next) => {
  try {
    records.push(req.body);
    fs.writeFileSync(paths.records, JSON.stringify(records));
    res.redirect('/records');
  }
  catch(error) {
    console.error(error);
    next(error);
  }
});

app.get('/categories', async(req, res, next) => {
  try {
    res.render('categories', {categories: categories});
  }
  catch(error) {
    console.error(error);
    next(error);
  }
});

app.get('/items', async(req, res, next) => {
  try {
    let catItems = items.filter((i) => i.categoryId == req.query.category)
    res.render('items', {items: catItems});
  }
  catch(error) {
    console.error(error);
    next(error);
  }
});

app.get('/check', async(req, res, next) => {
  try {
    for(const r of records) {
      if (r.item == req.query.item) {
        r.checked = (req.query.checked === "true");
      }
    }
    fs.writeFileSync(paths.records, JSON.stringify(records));
    res.redirect('/records');
  }
  catch(error) {
    console.error(error);
    next(error);
  }
});

app.get('/clear', async(req, res, next) => {
  try {
    for(var i=records.length-1; i>=0; i--) {
      if (records[i].hasOwnProperty('checked') && records[i].checked) {
        records.splice(i, 1)
      }
    }
    fs.writeFileSync(paths.records, JSON.stringify(records));
    res.redirect('/records');
  }
  catch(error) {
    console.error(error);
    next(error);
  }
});

fs.copyFileSync(__dirname + '/node_modules/htmx.org/dist/htmx.min.js',__dirname + '/src/htmx.min.js');

ViteExpress.listen(app, port, () => {
    console.log(`Express app listening on port http://localhost:${port}/`)
});
