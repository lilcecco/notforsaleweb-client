import { useContext, useMemo, useState } from 'react';
import { FiMinus, FiPlus, FiX } from 'react-icons/fi'
import { useNavigate, Link } from 'react-router-dom';

import ProductsContext from '../context/ProductsContext';
import CheckoutContext from '../context/CheckoutContext';
import AuthContext from '../context/AuthContext';

import './ShoppingCart.css';

const ShoppingCart = () => {
  const { cartProducts } = useContext(ProductsContext);
  const { checkout } = useContext(CheckoutContext);
  const { userLogged } = useContext(AuthContext);

  const navigate = useNavigate();

  const onCheckout = () => {
    if (!userLogged) {
      navigate('/checkout');
    } else {
      checkout();
    }
  }

  return (
    <div className="shopping-cart">
      <h2>Carrello</h2>
      <div className="cart-container mt-3">
        <div className="cart-list">
          {cartProducts.length > 0 ?
            <>
              <div className="cart-menu-info">
                <p>Prodotti</p>
                <div className="menu-info-right">
                  <p>Quantità</p>
                  <p>Prezzo</p>
                </div>
              </div>
              {cartProducts.map(cartProduct => <CartProduct key={`cart-product-${cartProduct?.id}`} cartProduct={cartProduct} />)}
            </> :
            <p>Il tuo carrello è vuoto</p>}
        </div>
        <CheckoutBox onCheckout={onCheckout} />
      </div>
    </div>
  )
}

const CartProduct = ({ cartProduct }) => {
  const { cartProducts, setCartProducts } = useContext(ProductsContext);
  const { checkSelectedBundle } = useContext(CheckoutContext);

  const selectedBundle = useMemo(() => checkSelectedBundle(cartProduct.quantity), [cartProduct]);
  const price = useMemo(() => cartProduct ? cartProduct.price[selectedBundle].value : '', [selectedBundle]);

  const updateQuantity = (newQuantity) => {
    if (newQuantity < 1 || cartProduct.category === 'Ebooks') return;
    else {
      setCartProducts(JSON.stringify(cartProducts.map(cartProd => cartProd.id === cartProduct.id ? { ...cartProd, quantity: newQuantity } : cartProd)));
    }
  }


  return (
    <div className="product-banner">
      <div className="product-banner-left">
        <div className="cart-product-img">
          <Link to={`/product/${cartProduct.id}`}><img src={`/img/products${cartProduct.images[0]}`} alt="" className="img-res" /></Link>
        </div>
        <p className="cart-prod-name">{cartProduct.name}</p>
      </div>
      <div className="product-banner-right">
        <div className="product-banner-right-info">
          <div className="product-quantity">
            <div className="update-quantity-btn" onClick={() => updateQuantity(cartProduct.quantity - 1)}>
              <FiMinus className="icon" />
            </div>
            <input type="text" name="quantity" id="quantity" value={cartProduct.quantity} readOnly />
            <div className="update-quantity-btn" onClick={() => updateQuantity(cartProduct.quantity + 1)}>
              <FiPlus className="icon" />
            </div>
          </div>
          {/* Mobile */}
          <p className="cart-prod-quantity">{cartProduct.quantity}</p>
          {/* --- */}
          {price && <p style={{ lineHeight: '34px' }}>€{price}</p>}
        </div>
        <div className="remove-product-btn" onClick={() => setCartProducts(JSON.stringify(cartProducts.filter(cartProd => cartProd.id !== cartProduct.id), 90))}>
          <FiX className="img-res" />
        </div>
      </div>
    </div>
  )
}

export const CheckoutBox = ({ onCheckout }) => {
  const { cartProducts } = useContext(ProductsContext);
  const { checkSelectedBundle } = useContext(CheckoutContext);
  const { userLogged } = useContext(AuthContext);

  const totalAmount = useMemo(() => cartProducts.reduce((total, currentProd) => {
    const selectedBundle = checkSelectedBundle(currentProd.quantity);
    return total + (Number((currentProd.price[selectedBundle].value).replace(',', '.')) * currentProd.quantity);
  }, 0), [cartProducts]);

  return (
    <div className="checkout-box">
      <div className="checkout-box-row">
        <h4>Riassunto ordine</h4>
      </div>
      <div className="checkout-box-div-line"></div>
      <div className="checkout-box-row">
        <p>Subtotale</p>
        <p>€{String(totalAmount.toFixed(2)).replace('.', ',')}</p>
      </div>
      <div className="checkout-box-row">
        <p>Spedizione</p>
        <p>Gratuita</p>
      </div>
      <div className="checkout-box-div-line"></div>
      <div className="checkout-box-row">
        <p>Totale ordine</p>
        <p>€{String(totalAmount.toFixed(2)).replace('.', ',')}</p>
      </div>
      <div className="cta-btn btn-style-2" onClick={onCheckout}>{userLogged ? 'Check out' : 'Registrati e prosegui'}</div>
    </div>
  )
}

export default ShoppingCart