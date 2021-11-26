import React from 'react'
import ProductPage from './components/ProductPage';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Homepage from './components/Homepage';

function App() {
  return (
    <Router>
    <div>
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>

        <Route exact path="/products">
          <ProductPage />
        </Route>
        
      </Switch>
    </div>
  </Router>
  );
}

export default App;
