import { createContext, useMemo, useContext, useEffect, useState } from 'react';

import ProductsContext from '../context/ProductsContext';
import AuthContext from '../context/AuthContext';

const CheckoutContext = createContext();

export default CheckoutContext;

export const CheckoutProvider = ({ children }) => {
  const { cartProducts } = useContext(ProductsContext);
  const { userLogged, accessToken } = useContext(AuthContext);

  const [customerId, setCustomerId] = useState('');

  let headers = new Headers();

  useEffect(() => {
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Credentials', 'true');
  }, []);

  useEffect(() => {
    const getCustomerId = async () => {
      const res = await fetch(`https://notforsaleweb-a185cdef4039.herokuapp.com/api/data/customerId`, {
        method: 'GET',
        headers: {
          ...headers,
          'authorization': `Bearer ${accessToken}`
        }
      });
      const data = await res.json();

      if (!data?.error) setCustomerId(data.customer_id);
    }

    getCustomerId();
  }, [userLogged]);
  
  const checkSelectedBundle = (prodQuantity) => {
    let selectedBundle;

    if (prodQuantity < 5) {
      selectedBundle = 0;
    } else if (prodQuantity > 4 && prodQuantity < 10) {
      selectedBundle = 1;
    } else {
      selectedBundle = 2;
    }

    return selectedBundle;
  }

  const line_items = useMemo(() => cartProducts.map(cartProduct => {
    const selectedBundle = checkSelectedBundle(cartProduct.quantity);
    return { price: cartProduct.price[selectedBundle]?.price_id, quantity: cartProduct.quantity };
  }), [cartProducts]);

  const checkout = async (registerCustomerId) => {
    const customer_id = registerCustomerId || customerId;

    const res = await fetch(`https://notforsaleweb-a185cdef4039.herokuapp.com/api/checkout/`, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ customer_id, cartProducts, line_items})
    });
    const data = await res.json();

    if (res.status === 200) {
      if (data?.error) {
        alert(data.error);
      } else {
        window.location = data.url;
      }
    }
  }

  const createPortalSession = async () => {
    const res = await fetch(`https://notforsaleweb-a185cdef4039.herokuapp.com/api/checkout/createPortalSession`, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ customer_id: customerId })
    });
    const data = await res.json();

    if (res.status === 200) {
      if (data?.error) {
        console.log(data.error);
      } else {
        window.location = data.url;
      }
    }
  }

  const contextData = { checkout, createPortalSession, checkSelectedBundle }

  return (
    <CheckoutContext.Provider value={contextData}>
      {children}
    </CheckoutContext.Provider>
  )
}