import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { signout } from './actions/userActions';
import AdminRoute from './components/AdminRoute';
import PrivateRoute from './components/PrivateRoute';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import OrderScreen from './screens/OrderScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductScreen from './screens/ProductScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SigninScreen from './screens/SigninScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';

function App() {
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();

  const signoutHandler = () => {
    dispatch(signout());
  };

  const openMenu = () => {
    document.querySelector('.sidebar').classList.add('open');
  }

  const closeMenu = () => {
    document.querySelector('.sidebar').classList.remove('open')
  }

  return (
    <BrowserRouter>
      <div className="grid-container">
           <header className="row">
            <div>
                <Link className="brand" to="/">
                <button onClick={openMenu}>
                    &#9776;
                </button>
                  <i>artybutik</i>
                  </Link>
            </div>
            <div>
                <Link to="/cart">
                  PANIER
                {cartItems.length > 0 && (
                  <span className="badge">{cartItems.length}</span>
                )}
                </Link>
                {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.name} <i className="fa fa-caret-down"></i>{' '}
                </Link>
                <ul className="dropdown-content">
                <li>
                    <Link to="/profile">MON PROFIL</Link>
                  </li>
                  <li>
                    <Link to="/orderhistory">RESUME DES COMMANDES</Link>
                  </li>
                  <li>
                    <Link to="#signout" onClick={signoutHandler}>
                      Se d??connecter
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin">Se connecter</Link>
            )}
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">
                  ADMINISTRATION <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/dashboard">Tableau de bord</Link>
                  </li>
                  <li>
                    <Link to="/productlist">Produits</Link>
                  </li>
                  <li>
                    <Link to="/orderlist">Commandes</Link>
                  </li>
                  <li>
                    <Link to="/userlist">Utilisateurs</Link>
                  </li>
                </ul>
              </div>
            )}
            </div>
           </header>
           <aside className="sidebar">
             <h4>CATEGORIES</h4>
             <button className="sidebar-close-button" onClick={closeMenu}>x</button>
             <ul className="categories">
                <li>
                <Link to="/category/CHEMISES">CHEMISES</Link>
                </li>
                <Link to="/category/PANTALONS">PANTALONS</Link>
             </ul>
           </aside>
           <main>
             <Route path="/cart/:id?" component={CartScreen}></Route>
             <Route path="/product/:id" component={ProductScreen} exact></Route>
             <Route path="/category/:id" component={HomeScreen} />
             <Route path="/product/:id/edit" component={ProductEditScreen} exact></Route>
             <Route path="/signin" component={SigninScreen}></Route>
             <Route path="/register" component={RegisterScreen}></Route>
             <Route path="/shipping" component={ShippingAddressScreen}></Route>
             <Route path="/payment" component={PaymentMethodScreen}></Route>
             <Route path="/placeorder" component={PlaceOrderScreen}></Route>
             <Route path="/order/:id" component={OrderScreen}></Route>
             <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
             <PrivateRoute path="/profile" component={ProfileScreen}></PrivateRoute>
             <AdminRoute path="/productlist" component={ProductListScreen}></AdminRoute>
             <AdminRoute path="/orderlist" component={OrderListScreen}></AdminRoute>
             <Route path="/" component={HomeScreen} exact></Route>
           </main>
           <footer className="row center">
                <i>Tous droits r??serv??s.</i>
           </footer>
       </div> 
    </BrowserRouter>
  );
}

export default App;
