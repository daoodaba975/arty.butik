import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsProduct, updateProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';

export default function ProductEditScreen(props) {
  const productId = props.match.params.id;
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [supplier, setSupplier] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [brand, setBrand] = useState('');
  const [packaging, setPackaging] = useState('');
  const [description, setDescription] = useState('');

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
      props.history.push('/productlist');
    }
    if (!product || product._id !== productId || successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      dispatch(detailsProduct(productId));
    } else {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setCategory(product.category);
      setSupplier(product.supplier);
      setCountInStock(product.countInStock);
      setBrand(product.brand);
      setPackaging(product.packaging);
      setDescription(product.description);
    }
  }, [product, dispatch, productId, successUpdate, props.history]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        category,
        supplier,
        brand,
        packaging,
        countInStock,
        description,
      })
    );
  };
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState('');

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    setLoadingUpload(true);
    try {
      const { data } = await Axios.post('/api/uploads', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setImage(data);
      setLoadingUpload(false);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };

  return (
    <div>
    <h1>CREATION DE PRODUIT</h1>
    <div className="form-edit">
      <form className="form-container" onSubmit={submitHandler}>
        <div>
         
        </div>
        {loadingUpdate && <LoadingBox></LoadingBox>}
        {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <li>
              <label htmlFor="name">Nom : </label>
              <input
                id="name"
                type="text"
                placeholder="Nom du produit"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </li>
            <li>
              <label htmlFor="price">Prix : </label>
              <input
                id="price"
                type="text"
                placeholder="Prix du produit"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></input>
            </li>
            <li>
              <label htmlFor="image">Image : </label>
              <input
                id="image"
                type="text"
                placeholder="Photo du produit"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></input>
            </li>
            <li>
              <label htmlFor="imageFile">Photo du produit : </label>
              <input
                type="file"
                id="imageFile"
                label="Choisir une image"
                onChange={uploadFileHandler}
              ></input>
              {loadingUpload && <LoadingBox></LoadingBox>}
              {errorUpload && (
                <MessageBox variant="danger">{errorUpload}</MessageBox>
              )}
            </li>
            <li>
              <label htmlFor="category">Catégorie : </label>
              <input
                id="category"
                type="text"
                placeholder="Catégorie de produit"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></input>
            </li>
            <li>
              <label htmlFor="supplier">Fournisseur : </label>
              <input
                id="supplier"
                type="text"
                placeholder="Fournisseur du produit"
                value={supplier}
                onChange={(e) => setSupplier(e.target.value)}
              ></input>
            </li>
            <li>
              <label htmlFor="brand">Marque : </label>
              <input
                id="brand"
                type="text"
                placeholder="Marque du produit"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></input>
            </li>
            <li>
              <label htmlFor="brand">Conditionnement : </label>
              <input
                id="packaging"
                type="text"
                placeholder="Conditionnement du produit"
                value={packaging}
                onChange={(e) => setPackaging(e.target.value)}
              ></input>
            </li>
            <li>
              <label htmlFor="countInStock">Quantité en stock : </label>
              <input
                id="countInStock"
                type="text"
                placeholder="Quantité disponible"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></input>
            </li>
            <li>
              <label htmlFor="description">Description : </label>
              <textarea
                id="description"
                rows="3"
                type="text"
                placeholder="Description du produit"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </li>
            <li>
              <label></label>
              <button className="primary" type="submit">
                VALIDER
              </button>
            </li>
          </>
        )}
      </form>
    </div>
    </div>
  );
}