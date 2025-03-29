import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'swiper/swiper-bundle.css';
import App from './App.tsx'
import { Provider } from 'react-redux';
import store from './store/index.ts';
import "./i18n.ts";

import './index.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
