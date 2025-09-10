import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useGetVenueQuery } from 'api/Venue.api';
// import { useAppSelector } from 'hooks/useAppSelector';
// import check from 'assets/icons/SubHeader/check.svg';
// import logo from 'assets/images/SubHeader/logo.png';
import WeeklyScheduleModal from 'components/WeeklyScheduleModal';

import calendar from 'assets/icons/SubHeader/calendar.svg';
import bell from 'assets/icons/SubHeader/coin.png';

import './style.scss';

import { clearCart, setVenue } from 'src/store/yourFeatureSlice';
import { loadVenueFromStorage } from 'src/utlis/storageUtils';

const SubHeader = () => {
  const { venue, id } = useParams();
  const dispatch = useDispatch();
  // const venueData = useAppSelector((state) => state.yourFeature.venue);
  const { data } = useGetVenueQuery({
    venueSlug: venue || '',
    tableId: Number(id) || undefined,
  });

  const [isScheduleOpen, setIsScheduleOpen] = useState(false);

  useEffect(() => {
    if (data) dispatch(setVenue(data));
  }, [data, dispatch]);

  useEffect(() => {
    const loadedVenue = loadVenueFromStorage();

    if (loadedVenue.companyName !== venue) {
      dispatch(clearCart());
    }

    // if(venueData.activeSpot !== location.pathname.split('/').filter((item) => +item)[0]) {

    // }
  }, []);

  return (
    <div className='sub-header'>
      <div className='sub-header__content'>
        <div className='venue'>
          <div className='logo'>
            <img src={data?.logo} alt='' />
          </div>
          <div>
            <div className='name'>{data?.companyName}</div>
            <span className='schedule'>{data?.schedule}</span>
          </div>
        </div>
        <div className='flex items-center justify-between md:gap-[12px] md:flex-initial'>
          <div className='call'>
            <span className='text-[14px] font-bold text-center flex items-center gap-[8px]'>
              <img width={20} src={bell} alt='' />
              <span className='mt-[4px]'>0 б.</span>
            </span>
          </div>
          <div
            className='call cursor-pointer'
            role='button'
            aria-label='График работы'
            onClick={() => setIsScheduleOpen(true)}
          >
            <img width={20} src={calendar} alt='' />
          </div>
          {/* {data?.table?.tableNum && (
            <div className='call'>
              <img src={bell} alt='' />
              <span className='hidden md:inline'>Позвать официанта</span>
            </div>
          )}
          {
            data?.table?.tableNum ? (
              <div className='check'>
                <img src={check} alt='' />
                <span className='hidden md:inline'>Чек</span>
              </div>
            ) : (
              <div className='check'>
                <img src={check} alt='' />
                <span>Чек</span>
              </div>
            )
          } */}
          {data?.table?.tableNum && (
            <div className='table'>Стол №{data.table.tableNum}</div>
          )}
        </div>
      </div>
      <WeeklyScheduleModal
        isShow={isScheduleOpen}
        onClose={() => setIsScheduleOpen(false)}
        schedules={data?.schedules}
        fallbackSchedule={data?.schedule}
      />
    </div>
  );
};

export default SubHeader;
