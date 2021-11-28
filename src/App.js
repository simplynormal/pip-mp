import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Footer } from './components/Footer';
import NavBar from './components/NavBar';
import Home from './components/Home';
import ProductPage from './components/ProductPage';

function App() {
  return (
    <div className="app">
      <NavBar quantity={10} />
      <Router>
        <div className="app-container">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>

            <Route exact path="/products">
              <ProductPage />
            </Route>
          </Switch>
        </div>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
