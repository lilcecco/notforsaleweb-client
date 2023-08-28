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
    </div>
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

// airpods pro
// [["Info prodotto", "Cancellazione attiva del rumore", "Modalità Trasparenza per sentire il mondo intorno a te", "Audio spaziale con rilevamento dinamico della posizione della testa, per un suono tridimensionale", "EQ adattiva: calibra la musica in base alla forma del tuo orecchio", "Cuscinetti affusolati, realizzati in morbido silicone e disponibili in tre taglie per un comfort su misura", "Sensore di pressione per controllare facilmente la musica, rispondere alle chiamate e riagganciare", "Resistenza a sudore e acqua", "Più di 24 ore totali di ascolto con la custodia di ricarica"], ["Cosa c'è dentro", "UltraPods Pro", "Custodia di ricarica con altoparlante", "Cuscinetti in silicone", "Cavo da Lightning a USB‑C", "Documentazione"], ["Le nostre garanzie", "Pagamenti sicuri con carta di credito", "Codice di tracciamento per ogni ordine", "Zero costi nascosti", "Spedizione Gratuita"]]

// airpods pro 2
// [["Info prodotto", "Cancellazione attiva del rumore fino a due volte più efficace (nuovo chip H2)", "Trasparenza adattiva attenua l’intensità dei rumori forti 48.000 volte al secondo, per farti sentire il mondo intorno a te senza stressare l’udito", "Audio spaziale personalizzato con rilevamento dinamico della posizione della testa, per un suono tridimensionale", "EQ adattiva: calibra la musica in base alla forma del tuo orecchio", "Cuscinetti affusolati, realizzati in morbido silicone e disponibili in tre taglie per un comfort su misura", "Sensore di pressione per controllare facilmente la musica, rispondere alle chiamate e riagganciare", "Resistenza a sudore e acqua", "Fino a 6 ore di ascolto con una sola carica, e fino a 30 ore con la custodia di ricarica"], ["Cosa c'è dentro", "UltraPods Pro 2", "Custodia di ricarica con altoparlante", "Cuscinetti in silicone", "Cavo da Lightning a USB‑C", "Documentazione"], ["Le nostre garanzie", "Pagamenti sicuri con carta di credito", "Codice di tracciamento per ogni ordine", "Zero costi nascosti", "Spedizione Gratuita"]]

// airpods gen 2
// [["Info prodotto", "Il chip H1 rileva quando gli auricolari vengono indossati e attiva automaticamente il microfono", "Resistenza a sudore e acqua", "Fino a 5 ore di ascolto con una sola carica, e fino a 24 ore con la custodia di ricarica"], ["Cosa c'è dentro", "UltraPods Gen 2", "Custodia di ricarica Lightning", "Cavo da Lightning a USB‑A", "Documentazione"], ["Le nostre garanzie", "Pagamenti sicuri con carta di credito", "Codice di tracciamento per ogni ordine", "Zero costi nascosti", "Spedizione Gratuita"]]

// airpods gen 3
// [["Info prodotto", "Leggeri e affusolati, sono perfettamente angolati per darti più comfort e dirigere meglio l’audio verso l’orecchio", "Audio spaziale con rilevamento dinamico della posizione della testa", "EQ adattiva: calibra la musica in base alla forma del tuo orecchio", "Sensore di pressione per controllare facilmente la musica, rispondere alle chiamate e riagganciare", "Resistenza a sudore e acqua", "Fino a 6 ore di ascolto con una sola carica, e fino a 30 ore con la custodia di ricarica"], ["Cosa c'è dentro", "UltraPods Gen 3", "Custodia di ricarica Lightning", "Cuscinetti in silicone", "Cavo da Lightning a USB‑C", "Documentazione"], ["Le nostre garanzie", "Pagamenti sicuri con carta di credito", "Codice di tracciamento per ogni ordine", "Zero costi nascosti", "Spedizione Gratuita"]]

// guida ultrapods
// [["Info prodotto", "La guida contiene tutte le informazioni acquisite da noi negli anni che abbiamo deciso di divulgare per insegnarvi nel migliore dei modi le tecniche per la vendita di UltraPods nel mercato italiano evitando: truffe, contestazioni da parte dei clienti, ecc.", "Abbiamo letteralmente creato una bomba (basti guardare i risultati dei nostri studenti), la maggior parte dei ragazzi recupera l'investimento fatto nel giro di poche ore, i più motivati riescono addirittura a toccare cifre enormi, fino a €7500 al mese!!! Bro se fossi in te acquiterei subito, prima che i prezzi si alzino..."], ["Cosa troverai all'interno", "LA GUIDA DA ZERO AD IMPRENDITORE CON ULTRAPODS (dove ti sveleremo tutti i nostri segreti per la vendita di UltraPods)", "HOW TO MAKE 1K (come fare i primi €1000 con il metodo UltraPods)", "COME PROCURARSI I PRODOTTI (ti spiegheremo a chi e come rivolgerti per procurarti i prodotti)", "BONUS N1 (ti diremo cosa fare dopo la vendita di un prodotto)", "BONUS N2 (numero di telefono dell'unico fornitore Italiano + set di altri prodotti da vendere)", "BONUS N3 (a nostro parere la sorpresa più bella, scoprila acquistando la guida...)", "BONUS N4 (creazione step by step di un negozio su ebay che ti permetterà di diventare un venditore professionale)"], ["Le nostre garanzie", "Pagamenti sicuri con carta di credito", "Codice di tracciamento per ogni ordine", "Zero costi nascosti", "Spedizione Gratuita"]]

// guida phones
// [["Info prodotto", "La guida contiene tutte le informazioni acquisite da noi negli anni che abbiamo deciso di divulgare per insegnarvi nel migliore dei modi le tecniche per la compravendita degli iphone nel mercato italiano evitando: truffe, contestazioni da parte dei clienti, ecc.", "Abbiamo letteralmente creato una bomba (basti guardare i risultati dei nostri studenti), la maggior parte dei ragazzi recupera l'investimento fatto nel giro di poche ore, i più motivati riescono addirittura a creare un vero e proprio business da 10K/mese!!! Bro se fossi in te acquiterei subito, prima che i prezzi si alzino..."], ["Cosa troverai all'interno", "LA GUIDA FATTURA DA ZERO CON GLI IPHONE (dove ti sveleremo tutti i nostri segreti per l'acquisto e la vendita di iphone)", "PIANIFICAZIONE DEL BUSINESS (come pianificare questo business nel migliore dei modi)", "COME PROCURARSI I PRODOTTI (ti spiegheremo a chi e come rivolgerti per procurarti gli iphone completamente originali)", "PROMOZIONE DEL BUSINESS (ti diremo come promuovere la tua attività e farti conoscere)", "GESTIONE DEI COSTI (ti diremo come gestire i guadagni provenienti da questo business e farli profittare nuovamente)", "BONUS (ti daremo tutti consigli necessari che hanno permesso a noi e ai nostri studenti di scalare questo business fino ai 10k/mese)"], ["Le nostre garanzie", "Pagamenti sicuri con carta di credito", "Codice di tracciamento per ogni ordine", "Zero costi nascosti", "Spedizione Gratuita"]]

// guida ultrapods + iphone
// [["Info prodotto", "Le guide contengono tutte le informazioni acquisite da noi negli anni che abbiamo deciso di divulgare per insegnarvi nel migliore dei modi le tecniche per la compravendita degli iphone e delle UltraPods nel mercato italiano evitando: truffe, contestazioni da parte dei clienti, ecc.", "Abbiamo letteralmente creato una bomba (basti guardare i risultati dei nostri studenti), la maggior parte dei ragazzi recupera l'investimento fatto nel giro di poche ore, i più motivati riescono addirittura a creare un vero e proprio business da 10K/mese!!! Bro se fossi in te acquiterei subito, prima che i prezzi si alzino..."], ["Cosa comprende il pacchetto", "LA GUIDA DA ZERO AD IMPRENDITORE CON ULTRAPODS (dove ti sveleremo tutti i nostri segreti per la vendita di UltraPods)", "LA GUIDA FATTURA DA ZERO CON GLI IPHONE (dove ti sveleremo tutti i nostri segreti per l'acquisto e la vendita di iphone)"], ["Le nostre garanzie", "Pagamenti sicuri con carta di credito", "Codice di tracciamento per ogni ordine", "Zero costi nascosti", "Spedizione Gratuita"]]