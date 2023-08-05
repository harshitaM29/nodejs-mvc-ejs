let products = [];
const fs = require('fs');
const path = require('path');
const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'products.json'
);
const commonFunction = (cb) => {
   
    fs.readFile(p,(err,data) => {
        if(err) {
          return cb([])
        } else {
       cb(JSON.parse(data));
        }
    })
}
module.exports = class Product {
    constructor(title) {
        this.title = title;

    }
  

    save() {
     commonFunction(products => {
        products.push(this);
            fs.writeFile(p,JSON.stringify(products),(err) => {
                console.log(err)
            });
     });
      
            
          }
    static fetchAll(cb) {
     commonFunction(cb);
       
    }
}