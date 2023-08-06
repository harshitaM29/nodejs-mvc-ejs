const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
  );
  
module.exports = class Cart{
    static addProduct(id,productPrice) {
        fs.readFile(p,(err,data) => {
            let cart = {products:[], totalPrice:0}
            if(!err) {
                cart = JSON.parse(data)
            }
            const exisitngProductIndex = cart.products.findIndex(prod => prod.id === id);
            const exisitingProduct = cart.products[exisitngProductIndex]
            let updatedProduct;
            if(exisitingProduct) {
                updatedProduct = {...exisitingProduct};
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[exisitngProductIndex] = updatedProduct
            } else {
            updatedProduct = {id: id, qty:1}
            cart.products = [...cart.products,updatedProduct]
            }
            cart.totalPrice = cart.totalPrice + +productPrice;
           fs.writeFile(p,JSON.stringify(cart), err => {
            console.log(err);
           })
        })
    }
}