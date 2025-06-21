import express from "express";
import ViteExpress from "vite-express";
import fs from 'fs';
import bp from 'body-parser';
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

app.use(express.static(__dirname + '/public'));
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.get('/records', async(req, res, next) => {
  try {
    res.send(records);
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
    res.send(categories)
  }
  catch(error) {
    console.error(error);
    next(error);
  }
});

app.get('/items', async(req, res, next) => {
  try {
    let cat = req.query.category;
    let catItems = []
    
    for(var i=0; i< items.length; i++) {
      if (items[i].categoryId == cat) {
        catItems.push(items[i]);
      }
    }
    res.send(catItems)
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


ViteExpress.listen(app, port, () => {
    console.log(`Express app listening on port http://localhost:${port}/`)
});

