import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from '../pages/Home';
import Cart from '../pages/Busket';
import Footer from '../components/Mobile/Footer';
import OrderStatus from 'src/pages/OrderStatus';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/order-status' element={<OrderStatus />} />
      </Routes>
      { window.innerWidth <= 768 && <Footer />}
    </BrowserRouter>
  );
};

export default AppRoutes;
