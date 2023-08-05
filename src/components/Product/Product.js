import { useNavigate } from 'react-router-dom';

import './Product.css';

const Product = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div className="product">
      <div className="product-img" onClick={() => navigate(`/product/${product.id}`)}>
        <img src={`/img/products${product.images[0]}`} alt="" className="img-res" />
        <div className="product-offer-alert">Prezzo di lancio</div>
      </div>
      <p className="product-name">{product.name}</p>
      <div className="product-prices">
        <div className="product-comparison-price">{`€${product.comparison_price} ${product.category === 'UltraPods' ? '/pz' : 'EUR'}`}</div>
        <div className="product-price">{`€${product.price[0].value} ${product.category === 'UltraPods' ? '/pz' : 'EUR'}`}</div>
      </div>
    </div>
  )
}

export default Product