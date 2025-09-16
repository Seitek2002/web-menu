import { Helmet } from 'react-helmet';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

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
import { useAppSelector } from 'hooks/useAppSelector';
import ProtectedRoute from 'components/ProtectedRoute';

const MetaHelmet = () => {
  const venue = useAppSelector((s) => s.yourFeature.venue);
  const location = useLocation();
  const isRoot = location.pathname === '/';
  const title = isRoot ? 'imenu' : venue.companyName || 'imenu';
  const desc = venue?.companyName
    ? `${venue.companyName} — онлайн-меню и заказы`
    : 'iMenu — онлайн-меню и заказы';
  const faviconHref = isRoot ? '/favicon.svg' : venue?.logo || '/favicon.svg';

  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={desc} />
      <meta property='og:title' content={title} />
      {!isRoot && venue?.logo ? (
        <meta property='og:image' content={venue.logo} />
      ) : null}
      {/* На корне оставляем дефолтный favicon из index.html (data:svg), не переопределяем */}
      <link rel='icon' href={faviconHref} />
    </Helmet>
  );
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <MetaHelmet />
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
