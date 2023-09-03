import { useContext, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { FiPlus, FiMinus } from 'react-icons/fi';

import ProductsContext from '../context/ProductsContext';
import { CardBadge } from '../Footer/Footer';

import './ProductPage.css';

const ProductPage = () => {
  const { id } = useParams();

  const { addToCart, cartProducts, setCartProducts, products } = useContext(ProductsContext);

  const [selectedBundle, setSelectedBundle] = useState(0);
  const [prodQuantity, setProdQuantity] = useState(1);

  // const [selectedImage, setSelectedImage] = useState(null);

  const product = useMemo(() => products.find(product => product.id == id), [products, id]);
  const price = useMemo(() => product ? product.price[selectedBundle].value : '', [product, selectedBundle]);

  const cardBadges = ['amex', 'visa', 'mastercard', 'paypal', 'apple-pay'];

  const updateProdQuantity = (newProdQuantity) => {

    if (newProdQuantity > 0 && newProdQuantity < 100) {
      setProdQuantity(newProdQuantity);

      if (newProdQuantity < 3) {
        setSelectedBundle(0);
      } else if (newProdQuantity > 2 && newProdQuantity < 5) {
        setSelectedBundle(1);
      } else if (newProdQuantity > 4 && newProdQuantity < 10) {
        setSelectedBundle(2);
      } else {
        setSelectedBundle(3);
      }

    }
  }

  const onClickBundle = (index) => {
    setSelectedBundle(index);

    switch (index) {
      case 0:
        setProdQuantity(1);
        break;
      case 1:
        setProdQuantity(3);
        break;
      case 2:
        setProdQuantity(5);
        break;
      case 3:
        setProdQuantity(10);
        break;
    }
  }

  const updateCartProducts = () => {
    // se è già presente il prodotto nel carrello non riaggiungerlo (solo per gli Ebooks)
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

        {/* Zoom images */}
        {/* {selectedImage && <div className="product-img-zoom-container" onClick={() => setSelectedImage(null)} >
          <div className="product-img-zoom" >
            <img src={`/img/products${product.images[selectedImage]}`} alt="" className="img-res" />
          </div>
        </div>} */}

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
              <div className={`product-bundle-btn ${selectedBundle === 0 ? '-selected' : ''}`} onClick={() => onClickBundle(0)} >1x</div>
              <div className={`product-bundle-btn ${selectedBundle === 1 ? '-selected' : ''}`} onClick={() => onClickBundle(1)} >3x</div>
              <div className={`product-bundle-btn ${selectedBundle === 2 ? '-selected' : ''}`} onClick={() => onClickBundle(2)} >5x</div>
              <div className={`product-bundle-btn ${selectedBundle === 3 ? '-selected' : ''}`} onClick={() => onClickBundle(3)} >10x</div>
            </div>
          </>}
          <div className="product-btn cta-btn btn-style-2 mt-2" onClick={updateCartProducts}>Aggiungi al carrello</div>
          <div className="product-page-card-badges mt-1">
            {cardBadges.map((cardBadge, id) => <CardBadge key={`card-badge-${id}`} cardBadge={cardBadge} />)}
          </div>
          <div className="product-description mt-3">
            {product.description.map((productDescription, i) => <ProductDescriptionSection key={`prod-description-${i}`} productDescription={productDescription} />)}
          </div>
        </div>
      </div>}
    </>
  )
}

const ProductImage = ({ image }) => {

  return (
    <div className="product-image">
      <img src={`/img/products${image}`} alt="" className="img-res" />
    </div >
  )
}

const ProductDescriptionSection = ({ productDescription }) => {
  const [isTextareaOpen, setIsTextareaOpen] = useState(false);

  return (
    <>
      <div className="product-description-section">
        <div>{productDescription[0]}</div>
        <div className="product-description-section-icon" onClick={() => setIsTextareaOpen(!isTextareaOpen)}>
          {isTextareaOpen === true ? <FiMinus className="img-res icon" /> : <FiPlus className="img-res icon" />}
        </div>
      </div>
      {isTextareaOpen && <div className="product-description-text-area">
        <ul>
          {productDescription.map((prodDescriptionItem, i) => i !== 0 && <li key={`prod-description-item-${i}`}>{prodDescriptionItem}</li>)}
        </ul>
      </div>}
    </>
  )
}

export default ProductPage