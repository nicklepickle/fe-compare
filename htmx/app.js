import express from "express";
import ViteExpress from "vite-express";
import fs from 'fs';
import bp from 'body-parser';

const __dirname = import.meta.dirname;
const app = express();
const port  = 8001;
const paths = {
  records: __dirname + "/json/records.json",
  categories: __dirname + "/json/categories.json",
  items: __dirname + "/json/items.json"
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

app.get('/records', async(req, res, next) => {
  try {
    let html = '<table class="records"><thead><tr><th>Item</th><th>Count</th><th>Price</th></thead><tbody>';
    let cat = '';
    let total = 0;
    records = records.sort((a,b) => a.category - b.category);
    for(var i=0; i< records.length; i++) {
        if (records[i].category != cat) {
          let name = getCategoryName(records[i].category);
          html += `<tr><th colspan="3" class="category">${name}</th></tr>`;
        }
        if (records[i].checked) {
          html += `<tr><td><input type="checkbox" checked hx-get="/check?checked=false&item=${records[i].item}" hx-trigger="click">${records[i].item}</td>`
        }
        else {
          html += `<tr><td><input type="checkbox" hx-get="/check?checked=true&item=${records[i].item}">${records[i].item}</td>`
        }
        html += `<td>${records[i].count}</td><td>$${Number(records[i].price).toFixed(2)}</td></tr>`;
        cat = records[i].category;
        total += (Number(records[i].price) * Number(records[i].count));
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
    let html = '<label for="category">Category</label><br />'
      +'<select class="form-input" name="category" id="category" hx-trigger="change" hx-get="/items" hx-include="[name=\'category\']" hx-target="#item-container">';
    for(var i=0; i< categories.length; i++) {
      let id = categories[i].categoryId
      html += `<option value="${id}">${categories[i].category}</option>`;
    }
    html += '</select>';
    res.send(html)
  }
  catch(error) {
    console.error(error);
    next(error);
  }
});

app.get('/items', async(req, res, next) => {
  try {
    let cat = req.query.category;
    let html = '<label for="item">Item</label><br /><select class="form-input" name="item" id="item">';
    
    for(var i=0; i< items.length; i++) {
      if (items[i].categoryId == cat) {
        html += `<option value="${items[i].nameSpecific}">${items[i].nameSpecific}</option>`;
      }
    }
    html += '</select>';
    res.send(html)
  }
  catch(error) {
    console.error(error);
    next(error);
  }
});

app.get('/check', async(req, res, next) => {
  try {
    for(var i=0; i< records.length; i++) {
      if (records[i].item == req.query.item) {
        records[i].checked = (req.query.checked === "true");
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

fs.copyFileSync(__dirname + '/node_modules/htmx.org/dist/htmx.min.js',__dirname + '/public/htmx.min.js');

ViteExpress.listen(app, port, () => {
    console.log(`Express app listening on port http://localhost:${port}/`)
});
