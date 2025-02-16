import { FC, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useTranslation } from 'react-i18next';
import { useGetCategoriesQuery } from '../../../../api/Categories.api';
import { Navigation } from 'swiper/modules';
import PointsSkeleton from '../../../../skeletons/Points';
import arrow from '../../../../assets/icons/points/slider-arrow.svg';

import all from '../../../../assets/icons/points/all.svg';

import './style.scss';

interface IProps {
  onCategoryChange: (categoryId: number | undefined) => void;
}

const Points: FC<IProps> = ({ onCategoryChange }) => {
  const { data: categories, isLoading } = useGetCategoriesQuery();

  const [active, setActive] = useState<number | undefined>(0);
  const { t } = useTranslation();

  const selectCategory = (id: number | undefined) => {
    setActive(id);
    onCategoryChange(id);
  };

  return (
    <>
      {/* <section className='desktop point'>
        <div
          className={`point-item bg-[#fff] ${
            active === 0
              ? 'bg-[#875AFF] border-[#875AFF] text-white'
              : 'border-white'
          }`}
          onClick={() => selectCategory(0)}
        >
          <div
            className={`point-wrapper ${
              active === 0
                ? 'bg-[#875AFF] border-[#875AFF] text-white'
                : 'border-white'
            }`}
          >
            <img src={all} alt='icon' />
            <p>{t('point.all')}</p>
          </div>
        </div>
        {isLoading
          ? Array(6)
              .fill(0)
              .map((_, index) => <PointsSkeleton key={index} />)
          : categories?.map((item) => (
              <div
                className={`point-item ${active === item.id ? 'active' : ''}`}
                key={item.id}
                onClick={() => selectCategory(item.id)}
              >
                <div
                  className={`point-wrapper ${
                    active === item.id
                      ? 'bg-[#875AFF] border-[#875AFF] text-white'
                      : 'border-white'
                  }`}
                >
                  <img src={item.categoryPhoto} alt='icon' />
                </div>
                <p>{item.categoryName}</p>
              </div>
            ))}
      </section> */}

      <section className='desktop point'>
        <div className='container'>
          <div className='point-content'>
            <div className='point-button-prev bg-[#fff]'>
              <img src={arrow} alt='' />
            </div>
            <Swiper
              className='swiper'
              spaceBetween={8}
              slidesPerView={5}
              navigation={{
                prevEl: '.point-button-prev',
                nextEl: '.point-button-next',
              }}
              modules={[Navigation]}
            >
            <SwiperSlide>
              <div
                className={`point-item ${
                  active === 0
                    ? 'bg-[#875AFF] text-[#fff]'
                    : 'active bg-[#fff] text-[#000]'
                }`}
                onClick={() => selectCategory(0)}
              >
                <img src={all} alt='icon' />
                <p>{t('point.all')}</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                className={`point-item ${
                  active === 0
                    ? 'bg-[#875AFF] text-[#fff]'
                    : 'active bg-[#fff] text-[#000]'
                }`}
                onClick={() => selectCategory(0)}
              >
                <img src={all} alt='icon' />
                <p>{t('point.all')}</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                className={`point-item ${
                  active === 0
                    ? 'bg-[#875AFF] text-[#fff]'
                    : 'active bg-[#fff] text-[#000]'
                }`}
                onClick={() => selectCategory(0)}
              >
                <img src={all} alt='icon' />
                <p>{t('point.all')}</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                className={`point-item ${
                  active === 0
                    ? 'bg-[#875AFF] text-[#fff]'
                    : 'active bg-[#fff] text-[#000]'
                }`}
                onClick={() => selectCategory(0)}
              >
                <img src={all} alt='icon' />
                <p>{t('point.all')}</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                className={`point-item ${
                  active === 0
                    ? 'bg-[#875AFF] text-[#fff]'
                    : 'active bg-[#fff] text-[#000]'
                }`}
                onClick={() => selectCategory(0)}
              >
                <img src={all} alt='icon' />
                <p>{t('point.all')}</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                className={`point-item ${
                  active === 0
                    ? 'bg-[#875AFF] text-[#fff]'
                    : 'active bg-[#fff] text-[#000]'
                }`}
                onClick={() => selectCategory(0)}
              >
                <img src={all} alt='icon' />
                <p>{t('point.all')}</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                className={`point-item ${
                  active === 0
                    ? 'bg-[#875AFF] text-[#fff]'
                    : 'active bg-[#fff] text-[#000]'
                }`}
                onClick={() => selectCategory(0)}
              >
                <img src={all} alt='icon' />
                <p>{t('point.all')}</p>
              </div>
            </SwiperSlide>
              {isLoading
                ? Array(6)
                    .fill(0)
                    .map((_, index) => <PointsSkeleton key={index} />)
                : categories?.map((item) => (
                    <SwiperSlide key={item.id}>
                      <div
                        className={`point-item ${
                          active === item.id
                            ? 'bg-[#875AFF] text-[#fff]'
                            : 'active bg-[#fff]'
                        }`}
                        onClick={() => selectCategory(item.id)}
                      >
                        <img src={item.categoryPhoto} alt='icon' />
                        <p>{item.categoryName}</p>
                      </div>
                    </SwiperSlide>
                  ))}
            </Swiper>
            <div className='point-button-next bg-[#fff]'>
              <img src={arrow} alt='' />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Points;
