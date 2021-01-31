import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsProduct, saveProductReview } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating.js';
import { PRODUCT_REVIEW_SAVE_RESET } from '../constants/productConstants';

export default function ProductScreen(props) {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;
  const productReviewSave = useSelector((state) => state.productReviewSave);
  const { success: productSaveSuccess } = productReviewSave;
  const dispatch = useDispatch();

  useEffect(() => {
    if (productSaveSuccess) {
      alert('Commentaire posté.');
      setRating(4.5);
      setComment('');
      dispatch({ type: PRODUCT_REVIEW_SAVE_RESET });
    }
    dispatch(detailsProduct(props.match.params.id));
    return () => {
      //
    };
  }, [dispatch, productSaveSuccess, props.match.params.id]);
  const submitHandler = (e) => {
    e.preventDefault();
   
    dispatch(saveProductReview(props.match.params.id, {
        name: userInfo.name,
        rating: rating,
        comment: comment,
      })
    );
  };
  const addToCartHandler = () => {
    props.history.push('/cart/' + props.match.params.id + '?qty=' + qty);
  };

  return (
    <div>
          {loading ? (
          <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
            ) : (
              <div>
      <Link to="/">Retour aux résultats</Link>
      <div className="row top">
        <div className="col-2">
          <img className="large" src={product.image} alt={product.name}></img>
        </div>
        <div className="col-1">
          <ul>
            <li>
              <h1>{product.name}</h1>
            </li>
            <li>
              Marque : {product.brand} 
            </li>
            <li>
              <a href="#reviews">
              <Rating
                value={product.rating}
                numReviews={product.numReviews}
              ></Rating></a>
            </li>
            <li>Prix : {product.price} €</li>
            <li>
              Description :
              <p>{product.description}</p>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <div className="row">
                  <div>Prix:</div>
                  <div className="price">{product.price} €</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Etat :</div>
                  <div>
                    {product.countInStock > 0 ? (
                      <span className="success">Disponible</span>
                    ) : (
                      <span className="danger">Momentanément indisponible ...</span>
                    )}
                  </div>
                </div>
              </li>
              {product.countInStock > 0 && (
                <>
                  <li>
                      <div className="row">
                          <div>Quantité:</div>
                          <div>
                              <select
                                  value={qty}
                                  onChange={(e) => setQty(e.target.value)}
                                >
                                  {[...Array(product.countInStock).keys()].map(
                                    (x) => (
                                      <option key={x + 1} value={x + 1}>
                                        {x + 1}
                                      </option>
                                    )
                                  )}
                                </select>
                           </div>
                        </div>
                  </li>
                  <li>
                        <button
                          onClick={addToCartHandler}
                          className="primary block"
                        >
                          Ajouter au panier
                        </button>
                  </li>
                    </>
                  )}
            </ul>
          </div>
        </div>
      </div>
    <div className="details">
      <div className="content-margined">
            <h2>Commentaires</h2>
            {!product.reviews.length && <div><i>Il n'y a pas encore commentaire sur ce produit</i></div>}
            <ul className="review" id="reviews">
              {product.reviews.map((review) => (
                <li key={review._id}>
                  <div>{review.name}</div>
                  <div>
                    <Rating value={review.rating}></Rating>
                  </div>
                  <div>{review.createdAt.substring(0, 10)}</div>
                  <div>{review.comment}</div>
                </li>
              ))}
              <li>
                <h5>Poster un commentaire</h5>
                {userInfo ? (
                  <form onSubmit={submitHandler}>
                    <ul className="form-container">
                      <li>
                        <label htmlFor="rating">Noter : </label>
                        <select
                          name="rating"
                          id="rating"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="1">1- Mauvais</option>
                          <option value="2">2- Plutôt bon</option>
                          <option value="3">3- Bon</option>
                          <option value="4">4- Très bon</option>
                          <option value="5">5- Excellent</option>
                        </select>
                      </li>
                      <li>
                        <label htmlFor="comment">Commenter : </label>
                        <textarea
                          name="comment"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                      </li>
                      <li>
                        <button type="submit" className="button primary">
                          Poster
                        </button>
                      </li>
                    </ul>
                  </form>
                ) : (
                  <div>
                    <Link to="/signin">Se connecter</Link> pour poster un commentaire.
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
    </div>
    )} 
  </div>
  );
}