import Product from "../model/product-model.js";

async function getAllProductes(){
    return await Product.findAll(); 
}

async function getProductById(pProductId){
    return await Product.findByPk(pProductId); 
}

async function createProduct({name, size, description, price, image}){
    await Product.create({name, size, description, price, image}); 
}

async function changeProductInfo(pProductId, {name, size, description, price, image}){
    await Product.update({name, size, description, price, image}, {
            where: {
                id: pProductId
            }
       });       
}

async function deleteProductById(pProductId){
    await Product.destroy({
        where: {
          id: pProductId
        }
       }); 
}


export default {
    getProductById,
    createProduct,
    changeProductInfo,
    deleteProductById,
    getAllProductes,
}