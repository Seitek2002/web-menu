import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import ClosedModal from 'components/ClosedModal';

import { isClosedNow } from 'src/utlis/workTime';

const isAuthenticated = (): boolean => {
  const venue = localStorage.getItem('venue');
  return venue !== null;
};

const getVenueSchedule = (): string => {
  try {
    const venue = JSON.parse(localStorage.getItem('venue') ?? '{}');
    return venue?.schedule ?? '';
  } catch {
    return '';
  }
};

const ProtectedRoute = () => {
  // Hooks must be declared unconditionally
  const [showClosed, setShowClosed] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const authenticated = isAuthenticated();
  const schedule = getVenueSchedule();
  const closed = isClosedNow(schedule);
  const mainPage = localStorage.getItem('mainPage') || '/';

  useEffect(() => {
    if (closed) {
      setShowClosed(true);
    }
  }, [closed]);

  // Redirect to main if not authenticated (no venue context)
  if (!authenticated) {
    return <Navigate to='/' replace />;
  }

  // Block access to protected content when closed: show modal and then redirect
  if (closed) {
    return (
      <>
        <ClosedModal
          isShow={showClosed}
          onClose={() => setRedirect(true)}
          title='Сейчас нерабочее время'
          description='Оформление заказа недоступно. Пожалуйста, загляните в часы работы.'
        />
        {redirect ? <Navigate to={mainPage} replace /> : null}
      </>
    );
  }

  // Otherwise allow access
  return <Outlet />;
};

export default ProtectedRoute;
