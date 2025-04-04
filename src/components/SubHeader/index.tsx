import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useGetVenueQuery } from 'api/Venue.api';

import bell from 'assets/icons/SubHeader/bell.svg';
import check from 'assets/icons/SubHeader/check.svg';

// import logo from 'assets/images/SubHeader/logo.png';
import './style.scss';

import { setVenue } from 'src/store/yourFeatureSlice';

const SubHeader = () => {
  const { venue, id } = useParams();
  const dispatch = useDispatch();
  const { data } = useGetVenueQuery({ venueSlug: venue || '', tableId: +(id || 0) });

  useEffect(() => {
    if (data) dispatch(setVenue(data));
  }, [data, dispatch]);

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
        <div className='flex items-center justify-between max-w-[50%] flex-1 md:gap-[12px] md:flex-initial'>
          <div className='call'>
            <img src={bell} alt='' />
            <span className='hidden md:inline'>Позвать официанта</span>
          </div>
          <div className='check'>
            <img src={check} alt='' />
            <span className='hidden md:inline'>Чек</span>
          </div>
          <div className='table'>Стол №{data?.table.tableNum}</div>
        </div>
      </div>
    </div>
  );
};

export default SubHeader;
