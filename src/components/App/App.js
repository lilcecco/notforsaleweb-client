import { Routes, Route } from 'react-router-dom';

import { ProductsProvider } from '../context/ProductsContext';
import { AuthProvider } from '../context/AuthContext';
import { CheckoutProvider } from '../context/CheckoutContext';

import Header from '../Header';
import Home from '../Home';
import ProductsPage from '../ProductsPage';
import ProductPage from '../ProductPage';
import ShoppingCart from '../ShoppingCart';
import Login from '../Login';
import Checkout from '../Checkout';
import PoliciesPage from '../PoliciesPage';
import OrderConfirmation from '../OrderConfirmation';
import Footer from '../Footer';

import './App.css';

function App() {

  return (
    <div className="App">
      <div className="alert-banner">
        <p>&#128666; SPEDIZIONE GRATUITA</p>
      </div>
      <ProductsProvider>
        <AuthProvider>
          <CheckoutProvider>
            <Header />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/products/:prodCategory' element={<ProductsPage />} />
              <Route path='/product/:id' element={<ProductPage />} />
              <Route path='/shoppingCart' element={<ShoppingCart />} />
              <Route path='/login' element={<Login />} />
              <Route path='/checkout' element={<Checkout />} />
              <Route path='/policiesPage/:page' element={<PoliciesPage />} />
              <Route path='/orderConfirmation' element={<OrderConfirmation />} />
            </Routes>
          </CheckoutProvider>
        </AuthProvider>
      </ProductsProvider>
      <Footer />
      <a href="https://bit.ly/3OFMeSE">
        <div className="whatsapp-btn">
          <img src="/img/whatsapp.svg" alt="" className="img-res" />
        </div>
      </a>
    </div>
  );
}

export default App;
