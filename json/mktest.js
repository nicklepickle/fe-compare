import fs from 'fs';
const __dirname = import.meta.dirname;
console.log(__dirname);

let items = [];
let categories = [];
let catItems = [];

if (fs.existsSync(__dirname + "/items.json")) {
  items = JSON.parse(fs.readFileSync(__dirname + "/items.json"))
}

if (fs.existsSync(__dirname + "/categories.json")) {
  categories = JSON.parse(fs.readFileSync(__dirname + "/categories.json"))
}

for(const c of categories) {
  catItems.push({category:c.categoryId,items:items.filter(i => i.categoryId == c.categoryId)});
}

function mkTest(size) {
  let a = [], i = 0;
  while(a.length < size) {
    for (const ci of catItems) {
      if (ci.items.length > i && a.length < size) {
        a.push({
          category:ci.category, 
          item:ci.items[i].nameSpecific, 
          count:Math.round(Math.random() * 10)+1, 
          price:Math.round(Math.random() * 20)+1})
      }
    }
    console.log('push', i)
    i++;
  }
  fs.writeFileSync(`${__dirname}/records${size}.json`, JSON.stringify(a));
}

mkTest(100);
mkTest(1000);
mkTest(2000);

console.log('done');