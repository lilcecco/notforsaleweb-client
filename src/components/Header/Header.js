import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import ProductsContext from '../context/ProductsContext';
import AuthContext from '../context/AuthContext';

import { FiShoppingCart, FiUser, FiMenu, FiX, FiLogOut } from 'react-icons/fi';

import AddCartAlert from '../AddCartAlert';

import './Header.css';

const Header = () => {
  const { addedProd, cartProducts } = useContext(ProductsContext);
  const { userLogged, logout } = useContext(AuthContext);

  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  return (
    <div className="Header">
      <div className="header-menu">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products/UltraPods">UltraPods</Link></li>
          <li><Link to="/products/Ebooks">Ebooks</Link></li>
        </ul>
      </div>

      {/* Mobile */}
      <div className={`header-menu-m ${menuOpen ? '' : 'header-menu-hidden'}`}>
        <ul>
          <li>
            <div className="header-icon" onClick={() => setMenuOpen(!menuOpen)} >
              <FiX className="img-res icon" style={{ color: 'var(--color-2)' }} />
            </div>
          </li>
          <li className="mt-1" onClick={() => setMenuOpen(!menuOpen)}><Link to="/">Home</Link></li>
          <li onClick={() => setMenuOpen(!menuOpen)}><Link to="/products/UltraPods">UltraPods</Link></li>
          <li onClick={() => setMenuOpen(!menuOpen)}><Link to="/products/Ebooks">Ebooks</Link></li>
        </ul>
      </div>
      <div className="header-menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        <div className="header-icon">
          <FiMenu className="img-res icon" />
        </div>
      </div>
      {/* --- */}

      <Link to='/'>
        <div className="header-logo">
          <img src="/img/logo.png" alt="" className="img-res" />
        </div>
      </Link>
      <div className="header-icons" style={{ justifyContent: 'right' }}>
        <div className="header-icon">
          <Link to='/shoppingCart'><FiShoppingCart className="img-res icon" /></Link>
          {cartProducts.length > 0 && <div className="cart-prod-add"></div>}
        </div>
        <div className="header-icon">
          {userLogged ? (
            <FiLogOut className="img-res icon" onClick={logout} />
          ) : (
            <FiUser className="img-res icon" onClick={() => navigate('/login')} />
          )}
        </div>
      </div>
      {addedProd && <AddCartAlert product={addedProd} />}
    </div>
  )
}

export default Header