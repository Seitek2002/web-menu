import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from '../pages/Home';
import Cart from '../pages/Cart';
import Footer from '../components/Footer';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default AppRoutes;
