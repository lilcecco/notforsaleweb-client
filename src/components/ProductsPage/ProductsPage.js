import { useContext } from 'react';
import { useParams } from 'react-router-dom';

import ProductsContext from '../context/ProductsContext';
import Product from '../Product';

import './ProductsPage.css';

const ProductsPage = () => {
  let { prodCategory } = useParams();

  const { products } = useContext(ProductsContext);

  return (
    <div className="products-page">
      <h2>{prodCategory}</h2>
      <div className="products mt-3">
        {products.filter(product => product.name === 'UltraPods Gen 2 (seconda generazione)').filter(product => product.category === prodCategory).map(product => <Product key={`product-${product.id}`} product={product} />)}
      </div>
    </div>
  )
}

export default ProductsPage