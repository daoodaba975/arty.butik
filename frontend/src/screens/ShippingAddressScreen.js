import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

export default function ShippingAddressScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!userInfo) {
    props.history.push('/signin');
  }
  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({ fullName, address, city, postalCode, country })
    );
    props.history.push('/payment');
  };
  return (
    <div>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>COORDONNEES</h1>
        </div>
        <div className="form-container">
        <li>
          <label htmlFor="fullName">Nom - Prénom(s)</label>
          <input
            type="text"
            id="fullName"
            placeholder="Entrer un nom"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          ></input>
        </li>
        <li>
          <label htmlFor="address">Addresse:</label>
          <input
            type="text"
            id="address"
            placeholder="Entrer une addresse"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          ></input>
        </li>
        <li>
          <label htmlFor="city">Ville:</label>
          <input
            type="text"
            id="city"
            placeholder="Entrer une ville"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          ></input>
        </li>
        <li>
          <label htmlFor="postalCode">Code Postal:</label>
          <input
            type="text"
            id="postalCode"
            placeholder="Entrer votre code postal"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          ></input>
        </li>
        <li>
          <label htmlFor="country">Pays:</label>
          <input
            type="text"
            id="country"
            placeholder="Pays"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          ></input>
        </li>
        <li>
          <label />
          <button className="primary" type="submit">
            Continuer ...
          </button>
        </li>
        </div>
      </form>
    </div>
  );
}