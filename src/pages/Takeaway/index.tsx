import { useAppSelector } from 'hooks/useAppSelector';
import Header from 'components/Header';

import geoIcon from 'assets/icons/Order/geo.svg';

const Takeaway = () => {
  const data = useAppSelector((state) => state.yourFeature.venue);
  const colorTheme = useAppSelector(
    (state) => state.yourFeature.venue?.colorTheme
  );

  return (
    <div className='h-[98dvh]'>
      <div className='header bg-white rounded-[12px] p-[12px]'>
        <Header searchText='' setSearchText={() => {}} />
        <hr className='my-[10px]' />
        <div className='sub-header'>
          <div className='sub-header__content'>
            <div className='venue'>
              <div className='logo'>
                <img src={data?.logo} alt='' />
              </div>
              <div>
                <div className='text-[20px] font-bold'>{data?.companyName}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='tabs__pickup'>
        {data.spots?.map((spot) => (
          <button
            className='tabs__pickup-item'
            style={{ backgroundColor: colorTheme }}
            key={spot.id}
          >
            <img src={geoIcon} alt='geoIcon' />
            <div>
              <span className='tabs__pickup-item-name'>{spot.name}</span>
              <span className='tabs__pickup-item-address'>{spot.address}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Takeaway;
