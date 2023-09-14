import { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import AuthContext from '../context/AuthContext';
import { PwdErrorMessage } from '../Checkout/Checkout';

import './ResetPassword.css';

const ResetPassword = () => {
  const { token } = useParams();

  return (
    <div className="resert-pwd">
      <h2>Reset password</h2>
      {token === 'email' ? (
        <ResetPasswordEmail />
      ) : (
        <ResetPasswordNewPwd token={token} />
      )}
    </div>
  )
}

const ResetPasswordEmail = () => {
  const { resetPasswordEmail } = useContext(AuthContext);

  const [email, setEmail] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();

    if (email === '') return alert('Assicurati che tutti i campi siano stati riempiti');
    if (!/[\w.-]+@[a-z-]+\.[a-z]{2,3}/.test(email)) return alert('Indirizzo email non valido');

    resetPasswordEmail(email);
  }

  return (
    <form className="login-form" onSubmit={onSubmit}>
      <div className="login-input-container">
        <label htmlFor="email">Indirizzo email</label>
        <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <input type="submit" value="Invia email" />
    </form>
  )
}

const ResetPasswordNewPwd = ({ token }) => {
  const { resetPassword } = useContext(AuthContext);

  const [updatedPassword, setUpdatedPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [pwdErrorMessage, setPwdErrorMessage] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    setPwdErrorMessage(false);

    if (updatedPassword.length < 8 || !/[a-z]/.test(updatedPassword) || !/[A-Z]/.test(updatedPassword) || !/[0-9]/.test(updatedPassword)) return setPwdErrorMessage(true);
    if (updatedPassword === '' || confirmPassword === '') return alert('Assicurati che tutti i campi siano stati riempiti');
    if (updatedPassword !== confirmPassword) return alert('Le password non coincidono');

    resetPassword({ updatedPassword, token });
  }

  return (
    <form className="login-form" onSubmit={onSubmit}>
      <div className="login-input-container">
        <label htmlFor="new-password">Nuova password</label>
        <input type="password" name="newPassword" id="new-password" value={updatedPassword} onChange={(e) => setUpdatedPassword(e.target.value)} />
      </div>
      {pwdErrorMessage && <PwdErrorMessage />}
      <div className="login-input-container">
        <label htmlFor="confirm-new-password">Ripeti password</label>
        <input type="password" name="confirmNewPassword" id="confirm-new-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      </div>
      <input type="submit" value="Reset" />
    </form>
  )
}

export default ResetPassword