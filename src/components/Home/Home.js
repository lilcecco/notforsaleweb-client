import { useContext } from 'react';

import ProductsContext from '../context/ProductsContext';
import Product from '../Product';

import './Home.css';

const Home = () => {
  const { products } = useContext(ProductsContext);

  return (
    <div className="Home">
      <div className="hero">
        <img src="/img/hero-bg.jpg" alt="" className="hero-bg img-res" />
        <h1>UltraPods</h1>
        <h4 className="mt-1">Rendi la tua esperienza musicale Ultra</h4>
        <div className="cta-btn mt-2"><a href="#home-products">Compra ora</a></div>
      </div>
      <div className="products-container" id="home-products">
        <h3>I Nostri Prodotti</h3>
        <div className="products mt-2">
          {products.map(product => <Product key={`product-${product.id}`} product={product} />)}
        </div>
      </div>
    </div>
  )
}

export default Home