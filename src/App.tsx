import { useEffect } from 'react';

import AppRoutes from './router';
import { useGetClientBonusQuery } from 'api/Client.api';
import { useAppSelector } from 'hooks/useAppSelector';

import './App.scss';

import { loadUsersDataFromStorage } from 'src/utlis/storageUtils';

function App() {
  const venue = useAppSelector((state) => state.yourFeature.venue);
  const usersPhone = useAppSelector((state) => state.yourFeature.usersData?.phoneNumber);

  // Prefetch client bonus via RTK Query hook (cached in store)
  const storedPhone = (loadUsersDataFromStorage()?.phoneNumber || '').trim();
  const phone = (usersPhone || storedPhone).trim();
  useGetClientBonusQuery({ phone }, { skip: !phone });

  useEffect(() => {
    document.title = venue.companyName;
  }, [venue.companyName]);

  return <AppRoutes />;
}

export default App;
