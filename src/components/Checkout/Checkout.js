import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from '../context/AuthContext';
import CheckoutContext from '../context/CheckoutContext';

import { CheckoutBox } from '../ShoppingCart/ShoppingCart';

import './Checkout.css';

const Checkout = () => {
  const { registerUser, loginUser } = useContext(AuthContext);
  const { checkout } = useContext(CheckoutContext);

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [zip_code, setZipCode] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onCheckout = async () => {
    //check
    if (!name || !surname || !address || !country || !city || !zip_code || !email || !password || !confirmPassword) return alert('empty fields');
    if (!/[\w.-]+@[a-z-]+\.[a-z]{2,3}/.test(email)) return alert('invalid email address');
    if (password.length < 8 || !/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) return alert('invalid password');
    if (password !== confirmPassword) return alert('passwords do not match');

    // register user
    const registerData = await registerUser({ name, surname, address, country, city, zip_code, email, password });

    if (registerData?.error) {
      return alert(registerData.error);
    }

    // login user
    const loginData = loginUser({ email, password });

    if (loginData?.error) {
      return alert(loginData.error);
    }

    // checkout order
    checkout(registerData.customer_id);
  }

  return (
    <div className="checkout">
      <h2>Check out</h2>
      <div className="checkout-container">
        <form className="checkout-form">
          <p className="checkout-logged-alert mt-2">Hai già un account? <Link to='/login' style={{ color: 'var(--color-3)', textDecoration: 'underline' }}>Accedi prima di proseguire</Link></p>
          <div className="checkout-row mt-2">
            <div className="checkout-collumn">
              <label htmlFor="name">Nome</label>
              <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="checkout-collumn">
              <label htmlFor="surname">Cognome</label>
              <input type="text" name="surname" id="surname" value={surname} onChange={(e) => setSurname(e.target.value)} />
            </div>
          </div>
          <div className="checkout-row mt-2">
            <div className="checkout-collumn">
              <label htmlFor="address">Indirizzo</label>
              <input type="text" name="address" id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>
            <div className="checkout-collumn">
              <label htmlFor="country">Paese</label>
              <input type="text" name="country" id="country" value={country} onChange={(e) => setCountry(e.target.value)} />
            </div>
          </div>
          <div className="checkout-row mt-1">
            <div className="checkout-collumn">
              <label htmlFor="city">Città</label>
              <input type="text" name="city" id="city" value={city} onChange={(e) => setCity(e.target.value)} />
            </div>
            <div className="checkout-collumn">
              <label htmlFor="zip-code">CAP</label>
              <input type="text" name="zipCode" id="zip-code" value={zip_code} onChange={(e) => setZipCode(e.target.value)} />
            </div>
          </div>
          <div className="checkout-row mt-2">
            <div className="checkout-collumn">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>
          <div className="checkout-row mt-1">
            <div className="checkout-collumn">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="checkout-collumn">
              <label htmlFor="confirm-password">Conferma Password</label>
              <input type="password" name="confirmPassword" id="confirm-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
          </div>
        </form>
        <CheckoutBox onCheckout={onCheckout} />
      </div>
    </div>
  )
}

export default Checkout