import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signin } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function SigninScreen(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const redirect = props.location.search
  ? props.location.search.split('=')[1]
  : '/';

const userSignin = useSelector((state) => state.userSignin);
const { userInfo, loading, error } = userSignin;

const dispatch = useDispatch();
const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);
  return (
    <div className="form-edit">
      <form className="form-container" onSubmit={submitHandler}>
        <div>
          <h1>Se connecter ...</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <li>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="saisir email"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </li>
        <li>
          <label htmlFor="password">Mot de passe:</label>
          <input
            type="password"
            id="password"
            placeholder="saisir mot de passe"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </li>
        <li>
          <label />
          <button className="primary" type="submit">
            Valider
          </button>
        </li>
        <li>
          <label />
          <li>
            <i>Pas de compte ? </i><Link to={`/register?redirect=${redirect}`}>
              Créer mon compte
            </Link>
          </li>
        </li>
      </form>
    </div>
  );
}