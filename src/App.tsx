import { useEffect } from 'react';

import AppRoutes from './router';
import { useAppSelector } from 'hooks/useAppSelector';

import './App.scss';

function App() {
  const venue = useAppSelector((state) => state.yourFeature.venue);

  useEffect(() => {
    document.title = venue.companyName;
  }, [venue.companyName]);

  return (
    <div className='font-inter bg-[#F1F2F3] px-[16px] pt-[12px]'>
      <AppRoutes />
    </div>
  );
}

export default App;
