import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Cart from '../pages/Busket';
import Footer from '../components/Mobile/Footer';
import OrderStatus from 'src/pages/OrderStatus';
import QrScan from 'src/pages/QrScan';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<QrScan />} />
        <Route path='/home/:venue/:bo/:table' element={<Home />} />
        <Route path='/home/:venue/:bo' element={<Home />} />
        <Route path='/cart/:venue/:bo/:table' element={<Cart />} />
        <Route path='/cart/:venue/:bo' element={<Cart />} />
        <Route path='/order-status/:venue/:bo/:table' element={<OrderStatus />} />
        <Route path='/order-status/:venue/:bo' element={<OrderStatus />} />
      </Routes>
      {window.innerWidth <= 768 && <Footer />}
    </BrowserRouter>
  );
};

export default AppRoutes;
