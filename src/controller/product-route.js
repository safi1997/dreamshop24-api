import express from 'express';
import productRepository from "../repository/product-repository.js";
const router = express.Router();

router.get('/', async (reqest, response) => {
    logger.info('there is a request to get all products')
    const allProductes = await productRepository.getAllProductes();
    logger.info('getting all products are completed and there are' +allProductes.length + 'products')
    response.json(allProductes)
});

router.get('/:id', async (request, response) => {
    const productId = request.params.id;
    // find the Product by Product id in the array
    const searchedProduct = await productRepository.getProductById(productId)
    response.status(200).json(searchedProduct)
});

router.post('/', async (request, response) => {
    const aProduct = request.body;
    await productRepository.createProduct(aProduct);
    response.status(201).json();
});

router.put('/:id', async (request, response) => {
    const productId = request.params.id;
    const aProduct = request.body;
    await changeProductInfo(productId, aProduct);
    response.status(200).json();
});

router.delete('/:id', async (request, response) => {
    const productId = request.params.id;
    await deleteProductById(productId);
    response.status(200).json();
});

export default router
