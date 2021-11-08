import { Footer } from './components/Footer';
import Home from './components/Home';
import NavBar from './components/NavBar';

function App() {
  return (
    <div className="app">
      <NavBar quantity={10} />
      <Home />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
