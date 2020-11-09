import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Product from '../models/productModel.js';
import { isAdmin, isAuth } from '../utils.js';

const productRouter = express.Router();

productRouter.get('/', expressAsyncHandler(async (req, res) => {
  const category = req.query.category ? { category: req.query.category } : {};
  const searchKeyword = req.query.searchKeyword ? {
  name: {
    $regex: req.query.searchKeyword,
    $options: 'i'
  }
} : {};
const sortOrder = req.query.sortOrder ?
  (req.query.sortOrder === 'lowest' ? { price: 1 } : { price: -1 })
  :
  { _id: -1 };
const products = await Product.find({ ...category, ...searchKeyword }).sort(sortOrder);
    res.send(products);
})
);

productRouter.get(
    '/seed', 
    expressAsyncHandler(async(req, res) => {
    // await Product.remove({});   
    const createdProducts = await Product.insertMany(data.products);
    res.send({ createdProducts });
})
);

productRouter.post('/:id/reviews', isAuth, expressAsyncHandler(async(req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    const review = {
      name: req.body.name,
      rating: Number(req.body.rating),
      comment: req.body.comment,
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating = product.reviews.reduce((a, c) => c.rating + a, 0) /
    product.reviews.length;
    const updatedProduct = await product.save();
    res.status(201).send({
      data: updatedProduct.reviews[updatedProduct.reviews.length - 1],
      message: 'Commentaire posté !',
    });
  } else {
    res.status(404).send({ message: 'Produit non trouvé' });
  }
})
);

productRouter.get(
    '/:id', expressAsyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id);
    if (product){
        res.send(product);
    } else {
        res.status(404).send({ message: 'Produit non trouvé.' });
    }
})
);

productRouter.post(
    '/',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
      const product = new Product({
        name: 'Nom du produit ' + Date.now(),
        image: '/images/p1.jpg',
        price: 0,
        category: 'Catégorie du produit',
        brand: 'Marque du produit',
        supplier: "Fournisseur",
        packaging: "Conditionnement",
        countInStock: 0,
        rating: 0,
        numReviews: 0,
        description: 'Description du produit ...',
      });
      const createdProduct = await product.save();
      res.send({ message: 'Produit créé avec succès !', product: createdProduct });
    })
  );
  
  productRouter.put(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
      const productId = req.params.id;
      const product = await Product.findById(productId);
      if (product) {
        product.name = req.body.name;
        product.image = req.body.image;
        product.price = req.body.price;
        product.category = req.body.category;
        product.brand = req.body.brand;
        product.supplier = req.body.supplier;
        product.packaging = req.body.packaging;
        product.countInStock = req.body.countInStock;
        product.description = req.body.description;
        const updatedProduct = await product.save();
        res.send({ message: 'Produit modifié avec succès !', product: updatedProduct });
      } else {
        res.status(404).send({ message: 'Produit non trouvé' });
      }
    })
  );

  productRouter.delete(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
      const product = await Product.findById(req.params.id);
      if (product) {
        const deleteProduct = await product.remove();
        res.send({ message: 'Produit supprimé !', product: deleteProduct });
      } else {
        res.status(404).send({ message: 'Produit non trouvé' });
      }
    })
  );

export default productRouter;
