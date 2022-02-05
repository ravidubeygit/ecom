import './App.css';
import Home from './container/home';
import Fav from './container/fav';
import Cart from './container/cart';
import ProductDetail from './container/productDetail';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/favorite' element={<Fav />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/product/:id' element={<ProductDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
