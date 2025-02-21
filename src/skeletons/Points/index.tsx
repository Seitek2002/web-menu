import './style.scss';

const PointsSkeleton = () => {
  return (
    <div className='point-item'>
      <svg
        width='63'
        height='63'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          width='40'
          height='41'
          fillRule='evenodd'
          clipRule='evenodd'
          d='M19.2226 0.507125C25.5545 0.61246 31.9643 2.42742 35.9261 7.36788C39.8995 12.3228 40.5954 19.054 39.0321 25.2099C37.5181 31.1715 33.5384 36.2422 27.9441 38.799C22.484 41.2944 16.0763 41.0314 10.8403 38.0945C5.96064 35.3574 4.02393 29.8871 2.47233 24.5117C0.748547 18.5397 -1.7496 11.8977 1.80734 6.8003C5.52354 1.47467 12.7295 0.399109 19.2226 0.507125Z'
          fill='#bebebe'
        >
          <animate
            attributeName='fill'
            values='#bebebe; #fff; #bebebe'
            dur='1.5s'
            repeatCount='indefinite'
          />
        </path>
        <rect rx='3' ry='3' x='0' y='50' height='10' width='76%' fill='#bebebe'>
          <animate
            attributeName='fill'
            values='#bebebe; #fff; #bebebe'
            dur='1.5s'
            repeatCount='indefinite'
          />
        </rect>
      </svg>
    </div>
  );
};

export default PointsSkeleton;
