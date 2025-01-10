import ContentLoader from 'react-content-loader';

import './style.scss';

const MenuSkeleton = () => {
  return (
    <div className='skeleton'>
      <ContentLoader
        speed={1.5}
        width={'100%'}
        height={'100%'}
        backgroundColor='#bebebe'
        foregroundColor='#fff'
        style={{
          padding: '4px',
        }}
      >
        <rect className='skeleton-img' y='0' rx='12' ry='12' />
        <rect
          className='skeleton-price'
          y='145'
          rx='5'
          ry='5'
          width='44'
          height='20'
        />
        <rect
          className='skeleton-weight'
          x='50'
          y='145'
          rx='5'
          ry='5'
          width='44'
          height='20'
        />
        <rect
          className='skeleton-text-1'
          y='175'
          rx='5'
          ry='5'
          width='100%'
          height='12'
        />
        <rect
          className='skeleton-text-2'
          y='192'
          rx='5'
          ry='5'
          width='100'
          height='12'
        />
        <rect
          className='skeleton-btn'
          y='216'
          rx='8'
          ry='8'
          width='100%'
          height='32'
        />
      </ContentLoader>
    </div>
  );
};

export default MenuSkeleton;
