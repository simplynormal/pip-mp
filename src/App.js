import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import Home from './components/Home';
import ProductPage from './components/ProductPage';
import DetailPage from './components/DetailPage';
import CheckoutPage from './components/CheckoutPage';

function App() {
  const [sign, setSign] = React.useState(0);
  const [reset, setReset] = React.useState(false);

  return (
    <div className="app">
      <NavBar sign={sign} setSign={setSign} reset={reset} />
      <div className="app-container">
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/products" element={<ProductPage setSign={setSign} setReset={() => setReset(!reset)} />} />
            <Route exact path="/detail" element={<DetailPage setSign={setSign} setReset={() => setReset(!reset)} />} />
            <Route exact path="/checkout" element={<CheckoutPage setSign={setSign} />} />
          </Routes>
        </BrowserRouter >
      </div>
      <Footer />
    </div>
  );
}

export default App;
