import { useContext } from "react";
import { Link } from "react-router-dom";
import { FiX } from "react-icons/fi";

import ProductsContext from "../context/ProductsContext";

import './AddCartAlert.css';

const AddCartAlert = ({ product }) => {
  const { setAddedProd } = useContext(ProductsContext);

  return (
    <div className="add-cart-alert">
      <div className="add-cart-alert-header">
        <div>Articolo aggiunto al carrello</div>
        <div className="add-cart-alert-x-icon">
          <FiX className="icon img-res" onClick={() => setAddedProd(null)} />
        </div>
      </div>
      <div className="cart-prod mt-2">
        <div className="cart-prod-img">
          <img src={`/img/products${product.images[0]}`} alt="" className="img-res" />
        </div>
        <div>{product.name}</div>
      </div>
      <Link to='/shoppingCart'><div className="cta-btn btn-style-1 mt-2" onClick={() => setAddedProd(null)}>Visualizza carrello</div></Link>
      <div style={{ textDecoration: 'underline', fontSize: '14px', textAlign: 'center', cursor: 'pointer' }} className="mt-1" onClick={() => setAddedProd(null)}>Continua lo shopping</div>
    </div>
  )
}

export default AddCartAlert