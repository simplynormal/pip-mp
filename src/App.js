import Home from './components/Home';
import NavBar from './components/NavBar';

function App() {
  return (
    <div className="app">
      <NavBar quantity={10} />
      <Home />
    </div>
  );
}

export default App;
