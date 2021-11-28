import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProductPage from './components/ProductPage';
import Homepage from './components/Homepage';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

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

        <Route exact path="/signup">
          <SignUp />
        </Route>

        <Route exact path="/signin">
          <SignIn />
        </Route>
        
      </Switch>
    </div>
  </Router>
  );
}

export default App;
