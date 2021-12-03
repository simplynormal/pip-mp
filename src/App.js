import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import Home from './components/Home';
import ProductPage from './components/ProductPage';
import DetailPage from './components/DetailPage';
import CheckoutPage from './components/CheckoutPage';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';

function App() {
  return (
    <div className="app">
      <NavBar quantity={10} />
      <div className="app-container">
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/products" element={<ProductPage />} />
            <Route exact path="/detail" element={<DetailPage />} />
            <Route exact path="/checkout" element={<CheckoutPage />} />
            {/* <Route exact path="/signup" element={<SignUp />} />
            <Route exact path="/signin" element={<SignIn />} /> */}
          </Routes>
        </BrowserRouter >
      </div>
      <Footer />
    </div>
  );
}

export default App;
