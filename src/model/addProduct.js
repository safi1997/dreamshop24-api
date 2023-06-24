import Product from "./model/product-model.js";

const products = [
  {
    code: 1,
    size: '30*30',
    description: 'oil',
    price: 70,
    image: 'client/img/photo1.jpg'
  },
  {
    code: 2,
    size: '40*40',
    description: 'watercolor',
    price: 50,
    image: 'client/img/photo2.jpg'
  },
  // Add more product objects here...
];

const addProducts = async () => {
  try {
    for (const product of products) {
      // Create a new product
      const newProduct = await Product.create(product);
      console.log('Product added:', newProduct.toJSON());
    }
  } catch (error) {
    console.error('Error adding products:', error);
  }
};

addProducts();
