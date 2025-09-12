import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Cart from 'pages/Cart';
import Deliver from 'pages/Deliver';
import Home from 'pages/Home';
import Main from 'pages/Main';
import NotFound from 'pages/NotFound';
import Order from 'pages/Order';
import Scan from 'pages/Scan';
import SelectOrderType from 'pages/SelectOrderType';
import Takeaway from 'pages/Takeaway';
import Terms from 'pages/Terms';
import ProtectedRoute from 'components/ProtectedRoute';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/scan' element={<Scan />} />
        <Route path='/deliver/:venue' element={<Deliver />} />
        <Route path='/takeaway/:venue' element={<Takeaway />} />
        <Route path='/:venue' element={<SelectOrderType />} />
        <Route path='/:venue/d' element={<Home />} />
        <Route path='/:venue/:venueId/:id' element={<Home />} />
        <Route path='/I/:venue/d' element={<Home />} />
        <Route path='/I/:venue/:venueId/:id' element={<Home />} />

        <Route element={<ProtectedRoute />}>
          <Route path='/cart' element={<Cart />} />
        </Route>
        <Route path='/orders/:id' element={<Order />} />
        <Route path='/:venue/terms' element={<Terms />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
