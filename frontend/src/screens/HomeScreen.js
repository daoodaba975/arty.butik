import React, { useEffect, useState } from 'react';

import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Rating from '../components/Rating';

export default function HomeScreen(props) {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const category = props.match.params.id ? props.match.params.id : '';
  const productList = useSelector( state => state.productList );
  const dispatch = useDispatch();
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts(category));

    return () => {
      //
    };

  }, [category, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(listProducts(category, searchKeyword, sortOrder))
  }
  const sortHandler = (e) => {
    setSortOrder(e.target.value);
    dispatch(listProducts(category, searchKeyword, sortOrder))
  }

  return <>
    {category &&
      <h2>{category}</h2>}

      <div className="filter">
        <div>
          <form onSubmit={submitHandler}>
          <button type="submit">Rechercher</button>
            <input name="searchKeyword" onChange={(e) => setSearchKeyword(e.target.value)} />
          </form>
        </div>
        <div>
          Trier par:
          <select name="sortOrder" onChange={sortHandler}>
            <option value="">Les plus récents</option>
            <option value="lowest">Les moins chers</option>
            <option value="highest">Les plus chers</option>
          </select>
          </div>
      </div>

  
        <div>
          {loading ? (
          <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
            ) : (
              <div className="row center">
                    {products.map((product) => (
                        <Product key={product._id} product={product}></Product>
                      ))}
              </div>
            )} 
        </div>
  
    </>
}