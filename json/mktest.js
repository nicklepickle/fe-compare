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
  let a = [];
  while(a.length < size) {
    let i=0;
    for (const ci of catItems) {
      if (ci.items.length > i && a.length < size) {
        a.push({
          category:ci.category, 
          item:ci.items[i].nameSpecific, 
          count:Math.round(Math.random() * 10)+1, 
          price:Math.round(Math.random() * 20)+1})
      }
    }
    i++;
  }
  return a;
}

let records10 = mkTest(10);
let records100 = mkTest(100);
let records1000 = mkTest(1000);

fs.writeFileSync(__dirname + "/records10.json", JSON.stringify(records10));
fs.writeFileSync(__dirname + "/records100.json", JSON.stringify(records100));
fs.writeFileSync(__dirname + "/records1000.json", JSON.stringify(records1000));

console.log('done');