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

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

app.get('/records', async(req, res, next) => {
  try {
    let catRecords = [] 
    let total = records.reduce((total, rec) => {return total + (Number(rec.price) * Number(rec.count))}, 0)
    for(const c of categories) {
        let catRecs = records.filter((r) => r.category == c.categoryId);
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
    res.render('records', {categories: catRecords, total:total.toFixed(2)});
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

// I shouldn't have to do this
fs.copyFileSync(__dirname + '/node_modules/htmx.org/dist/htmx.min.js',__dirname + '/public/htmx.min.js');

//console.log(JSON.stringify(process.argv));
if (process.argv.length > 2 && process.argv[2] == '-dev') {
  ViteExpress.listen(app, port, () => {
      console.log(`ViteExpress listening at http://localhost:${port}/`)
  });
}
else {
  app.use(express.static(__dirname + '/dist'));
  app.listen(port);
  console.log(`Express app listening at http://localhost:${port}/`)
}
