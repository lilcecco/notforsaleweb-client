import { useContext, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { FiPlus, FiMinus } from 'react-icons/fi';

import ProductsContext from '../context/ProductsContext';

import './ProductPage.css';

const ProductPage = () => {
  const { id } = useParams();

  const { addToCart, cartProducts, setCartProducts, products } = useContext(ProductsContext);

  const [selectedBundle, setSelectedBundle] = useState(0);
  const [prodQuantity, setProdQuantity] = useState(3);
  
  const product = useMemo(() => products.find(product => product.id == id), [products, id]);
  const price = useMemo(() => product ? product.price[selectedBundle].value : '', [product, selectedBundle]);

  // quando si aggiorna product aggiorna la quantità predefinita in base alla categoria
  useEffect(() => {
    if (product) {
      if (product.category === 'UltraPods') {
        setProdQuantity(3)
      } else if (product.category === 'Ebooks') {
        setProdQuantity(1)
      }
    }
  }, [product]);

  const updateProdQuantity = (newProdQuantity) => {

    if (newProdQuantity > 2 && newProdQuantity < 100) {
      setProdQuantity(newProdQuantity);

      if (newProdQuantity < 5) {
        setSelectedBundle(0);
      } else if (newProdQuantity > 4 && newProdQuantity < 10) {
        setSelectedBundle(1);
      } else {
        setSelectedBundle(2);
      }

    }
  }

  const onClickBundle = (index) => {
    setSelectedBundle(index);

    switch (index) {
      case 0:
        setProdQuantity(3);
        break;
      case 1:
        setProdQuantity(5);
        break;
      case 2:
        setProdQuantity(10);
        break;
    }
  }

  const updateCartProducts = () => {
    // se è già presente il prodotto nel carrello non riaggiunferlo (solo per gli Ebooks)
    if (product.category === 'Ebooks' && cartProducts.find(cartProduct => cartProduct.id === product.id)?.quantity > 0) return console.log('non è possibile aggiungere un altro di questi prodotti al carrelli');

    // mostra pop up per l'aggiunta al carrello
    addToCart(product);

    // aggiungi prodotto al carrello
    if (cartProducts.find(cartProduct => cartProduct.id === product.id)) {
      setCartProducts(JSON.stringify(cartProducts.map(cartProduct => cartProduct.id ? { ...cartProduct, quantity: cartProduct.quantity + prodQuantity } : cartProduct)));
    } else {
      setCartProducts(JSON.stringify([...cartProducts, { ...product, quantity: prodQuantity }]))
    }
  }

  return (
    <>
      {product && <div className="product-page">
        <div className="product-page-left">
          <div className="product-main-image">
            <img src={`/img/products${product.images[0]}`} alt="" className="img-res" />
          </div>
          <div className="product-images mt-1">
            {product.images.map((image, id) => id > 0 && <ProductImage key={`product-image-${id}`} image={image} />)}
          </div>
        </div>
        <div className="product-page-right">
          <h3>{product.name}</h3>
          <div className="product-prices">
            <div className="product-comparison-price">{`€${product.comparison_price} ${product.category === 'UltraPods' ? '/pz' : 'EUR'}`}</div>
            <div className="product-price">{`€${price} ${product.category === 'UltraPods' ? '/pz' : 'EUR'}`}</div>
          </div>
          {product.category === 'UltraPods' && <>
            <div className="product-quantity mt-2">
              <div className="update-quantity-btn" onClick={() => updateProdQuantity(Number(prodQuantity) - 1)}>
                <FiMinus className="icon" />
              </div>
              <input type="text" name="quantity" id="quantity" value={prodQuantity} readOnly />
              <div className="update-quantity-btn" onClick={() => updateProdQuantity(Number(prodQuantity) + 1)}>
                <FiPlus className="icon" />
              </div>
            </div>
            <p className="mt-2" style={{ color: 'var(--color-5)' }}>Seleziona un budle e risparmia!</p>
            <div className="product-bundles">
              <div className={`product-bundle-btn ${selectedBundle === 0 ? '-selected' : ''}`} onClick={() => onClickBundle(0)} >3x</div>
              <div className={`product-bundle-btn ${selectedBundle === 1 ? '-selected' : ''}`} onClick={() => onClickBundle(1)} >5x</div>
              <div className={`product-bundle-btn ${selectedBundle === 2 ? '-selected' : ''}`} onClick={() => onClickBundle(2)} >10x</div>
            </div>
          </>}
          <div className="product-btn cta-btn btn-style-2 mt-2" onClick={updateCartProducts}>Aggiungi al carrello</div>
        </div>
      </div>}
    </>
  )
}

const ProductImage = ({ image }) => {
  return (
    <div className="product-image">
      <img src={`/img/products${image}`} alt="" className="img-res" />
    </div>
  )
}

export default ProductPage