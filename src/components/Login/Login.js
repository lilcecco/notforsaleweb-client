import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import './Login.css';

const Login = () => {
  let { loginUser } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    // check fields
    if (email === '' || password === '') return alert('Assicurati che tutti i campi siano stati riempiti');
    if (!/[\w.-]+@[a-z-]+\.[a-z]{2,3}/.test(email)) return alert('Indirizzo email non valido');

    const loginData = await loginUser({ email, password });
    if (loginData?.error) {
      alert(loginData.error);
    } else {
      navigate('/shoppingCart');
    }
  }

  return (
    <div className="Login">
      <h2>Log in</h2>
      <form className="login-form" onSubmit={onSubmit}>
        <div className="login-input-container">
          <label htmlFor="email">Email</label>
          <input type="text" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="login-input-container">
          <div className="forgot-password-container">
            <label htmlFor="password">Password</label>
            <Link to="/resetPassword/email"><div className="forgot-password-cta" >Password dimenticata?</div></Link>
          </div>
          <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <input type="submit" value="Log in" />
      </form>
      <div className="sign-up-link-container">
        Nuovo in NOT FOR SALE? <Link to="/shoppingCart"><span>Fai il tuo primo ordine.</span></Link>
      </div>
    </div>
  )
}

export default Login