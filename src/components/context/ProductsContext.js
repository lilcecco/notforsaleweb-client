import { createContext, useEffect, useState } from 'react';

import useCookie from '../customHooks/useCookie';

const ProductsContext = createContext();

export default ProductsContext;

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [addedProd, setAddedProd] = useState(null);

  let headers = new Headers();

  useEffect(() => {
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Credentials', 'true');

    const fetchProducts = async () => {
      const res = await fetch(`https://notforsaleweb-a185cdef4039.herokuapp.com/api/data/products`, {
        method: 'GET',
        headers
      });
      const data = await res.json();

      if (data?.error) {
        alert(data.error);
      } else {
        let prods = data.filter(product => product.id === 1)['price']
        console.log(prods)
        console.log(JSON.parse(prods));
        // setProducts(data.map(product => { return { ...product, price: JSON.parse(product.price), images: JSON.parse(product.images) } }));
      }
    }

    fetchProducts();
  }, []);

  const addToCart = (product) => {
    setAddedProd(product);
  }

  const [cartProducts, setCartProducts] = useCookie('cartProducts', "[]");

  const contextData = { addedProd, cartProducts: JSON.parse(cartProducts), setCartProducts, products, addToCart, setAddedProd }

  return (
    <ProductsContext.Provider value={contextData}>
      {children}
    </ProductsContext.Provider>
  )
}