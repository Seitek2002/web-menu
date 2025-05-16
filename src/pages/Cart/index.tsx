import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { usePostOrdersMutation } from 'api/Orders.api';
import { useGetProductsQuery } from 'api/Products.api';
import { IProduct } from 'types/products.types';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import Empty from './components/Empty';
import BusketDesktop from 'components/BusketDesktop';
import BusketCard from 'components/Cards/Cart';
import CatalogCard from 'components/Cards/Catalog';
import ClearCartModal from 'components/ClearCartModal';
import FoodDetail from 'components/FoodDetail';
import Loader from 'components/Loader';

import clearCartIcon from 'assets/icons/Busket/clear-cart.svg';
import cookie from 'assets/icons/Busket/cookie.svg';
import headerArrowIcon from 'assets/icons/Busket/header-arrow.svg';
import priceArrow from 'assets/icons/Busket/price-arrow.svg';

import './style.scss';

import { useMask } from '@react-input/mask';
import { clearCart, setUsersData } from 'src/store/yourFeatureSlice';
import { loadUsersDataFromStorage } from 'src/utlis/storageUtils';

const Cart: React.FC = () => {
  const dispatch = useAppDispatch();
  const [postOrder] = usePostOrdersMutation();
  const userData = loadUsersDataFromStorage();
  const { t } = useTranslation();
  const [isShow, setIsShow] = useState(false);
  const cart = useAppSelector((state) => state.yourFeature.cart);
  const [isLoading, setIsLoading] = useState(false);
  const colorTheme = useAppSelector(
    (state) => state.yourFeature.venue?.colorTheme
  );
  const venueData = useAppSelector((state) => state.yourFeature.venue);

  const [activeIndex, setActiveIndex] = useState(0);

  const [phoneNumber, setPhoneNumber] = useState(`+${userData.phoneNumber}`);
  const [comment, setComment] = useState(userData.comment || '');
  const [address, setAddress] = useState(userData.address || '');

  const [phoneError, setPhoneError] = useState('');
  const [addressError, setAddressError] = useState('');

  const [activeFood, setActiveFood] = useState<IProduct | null>(null);
  const [active, setActive] = useState(false);
  const [clearCartModal, setClearCartModal] = useState(false);

  const navigate = useNavigate();
  const { data: items } = useGetProductsQuery({
    venueSlug: venueData.companyName,
  });

  const inputRef = useMask({
    mask: '+996_________',
    replacement: { _: /\d/ },
  });

  const orderTypes = useMemo(() => {
    const arr: { text: string; value: number }[] = [];
    if (venueData.isTakeoutAvailable) {
      arr.push({ text: t('empty.myself'), value: 1 });
    }
    if (venueData.isDineinAvailable) {
      arr.push({ text: t('empty.institution'), value: 2 });
    }
    if (venueData.isDeliveryAvailable) {
      arr.push({ text: t('empty.delivery'), value: 3 });
    }
    return arr;
  }, [
    venueData.isTakeoutAvailable,
    venueData.isDineinAvailable,
    venueData.isDeliveryAvailable,
    t,
  ]);

  const handleClick = (index: number) => {
    setActiveIndex(index);
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  const solveTotalSum = () => {
    const subtotal = cart.reduce(
      (acc, item) => acc + item.productPrice * item.quantity,
      0
    );
    return subtotal + subtotal * (venueData.serviceFeePercent / 100);
  };

  const handleClose = () => {
    setIsShow(false);
    document.body.style.height = '';
    document.body.style.overflow = '';
  };

  const handleOpen = (food: IProduct) => {
    setIsShow(true);
    setActiveFood(food);
    document.body.style.height = '100dvh';
    document.body.style.overflow = 'hidden';
  };

  const handlePhoneChange = (value: string) => {
    setPhoneNumber(value);

    if (!value.trim()) {
      setPhoneError('Это обязательное поле');
    } else if (value.length < 13) {
      setPhoneError('Тут нужно минимум 12 символов');
    } else {
      setPhoneError('');
    }
  };

  const handleAddressChange = (value: string) => {
    setAddress(value);

    if (!value.trim()) {
      setAddressError('Это обязательное поле');
    } else if (value.trim().length < 4) {
      setAddressError('Тут нужно минимум 4 символа');
    } else {
      setAddressError('');
    }
  };

  const isButtonDisabled = useMemo(() => {
    if (phoneError) return false;

    const isDelivery = orderTypes[activeIndex]?.value === 3;

    if (isDelivery && addressError) return false;

    if (!phoneNumber.trim() || phoneNumber.length < 12) return false;
    if (isDelivery && (!address.trim() || address.trim().length < 4))
      return false;

    return true;
  }, [phoneNumber, address, phoneError, addressError, activeIndex, orderTypes]);

  const handleOrder = async () => {
    setIsLoading(true);

    const orderProducts = cart.map((item) => {
      if (item.modificators?.id) {
        return {
          product: +item.id.split(',')[0],
          count: +item.quantity,
          modificator: item.modificators.id,
        };
      } else {
        return {
          product: +item.id.split(',')[0],
          count: +item.quantity,
        };
      }
    });

    const currentType = orderTypes[activeIndex];
    if (!currentType) {
      setIsLoading(false);
      return;
    }

    const acc = {
      phone: phoneNumber
        .replace('-', '')
        .replace('(', '')
        .replace(')', '')
        .replace(' ', '')
        .replace('+', '')
        .replace(' ', ''),
      orderProducts,
      comment,
      serviceMode: 1,
      venue_slug: venueData.slug,
      address: '',
    };

    if (venueData?.table?.tableNum) {
      acc.serviceMode = 1;
    } else {
      if (currentType.value === 3) {
        acc.serviceMode = 3;
        acc.address = address;
      } else {
        acc.serviceMode = currentType.value;
      }
    }

    dispatch(
      setUsersData({
        phoneNumber: acc.phone,
        address,
        comment,
        type: currentType.value,
      })
    );

    const { data: res } = await postOrder(acc);
    if (res?.paymentUrl) {
      dispatch(clearCart());
      setIsLoading(false);
      window.location.href = res.paymentUrl;
    } else {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    if (userData.type) {
      const idx = orderTypes.findIndex((it) => it.value === userData.type);
      if (idx >= 0) setActiveIndex(idx);
    }
  }, [userData.type, orderTypes]);

  return (
    <section className='cart'>
      <FoodDetail
        isShow={isShow}
        setIsShow={handleClose}
        item={
          activeFood || {
            category: { categoryName: '', id: 0 },
            productName: '',
            productPhoto: '',
            productPrice: 0,
            weight: 0,
            productDescription: '',
            isRecommended: false,
            modificators: [{ id: 0, name: '', price: 0 }],
            id: 0,
          }
        }
      />
      <ClearCartModal isShow={clearCartModal} setActive={setClearCartModal} />
      {isLoading && <Loader />}

      <header className='cart__header'>
        <img
          src={headerArrowIcon}
          alt=''
          onClick={() => navigate(-1)}
          className='cursor-pointer'
        />
        <h3>{t('basket.title')}</h3>
        <img
          src={clearCartIcon}
          alt=''
          onClick={() => setClearCartModal(true)}
        />
      </header>

      {window.innerWidth < 768 && (
        <>
          {venueData?.table?.tableNum && (
            <div className='cart__top'>
              {t('table')}
              {venueData.table.tableNum}
            </div>
          )}
          <div className='cart__items'>
            {cart.length > 0 ? (
              cart.map((item) => <BusketCard key={item.id} item={item} />)
            ) : (
              <div />
            )}
          </div>
        </>
      )}

      <div className='md:flex gap-[24px]'>
        <div className='md:w-[50%]'>
          {cart.length > 0 ? (
            <>
              {!venueData?.table?.tableNum && (
                <div className='cart__order-type'>
                  {orderTypes.map((item, idx) => (
                    <div
                      key={item.value}
                      onClick={() => handleClick(idx)}
                      className={`cart__order-type-wrapper bg-[#fff] border-[#e1e2e5] cursor-pointer ${
                        activeIndex === idx ? 'active' : ''
                      }`}
                      style={{
                        borderColor:
                          activeIndex === idx ? colorTheme : '#e1e2e5',
                      }}
                    >
                      {activeIndex === idx ? (
                        <svg
                          width='20'
                          height='20'
                          viewBox='0 0 20 20'
                          fill='none'
                        >
                          <g clipPath='url(#clip0_248_22508)'>
                            <path
                              d='M10 1.875C8.39303 1.875 6.82214 2.35152 5.486 3.24431C4.14985 4.1371 3.10844 5.40605 2.49348 6.8907C1.87852 8.37535 1.71762 10.009 2.03112 11.5851C2.34463 13.1612 3.11846 14.6089 4.25476 15.7452C5.39106 16.8815 6.8388 17.6554 8.4149 17.9689C9.99099 18.2824 11.6247 18.1215 13.1093 17.5065C14.594 16.8916 15.8629 15.8502 16.7557 14.514C17.6485 13.1779 18.125 11.607 18.125 10C18.1227 7.84581 17.266 5.78051 15.7427 4.25727C14.2195 2.73403 12.1542 1.87727 10 1.875ZM13.5672 8.56719L9.19219 12.9422C9.13415 13.0003 9.06522 13.0464 8.98934 13.0779C8.91347 13.1093 8.83214 13.1255 8.75 13.1255C8.66787 13.1255 8.58654 13.1093 8.51067 13.0779C8.43415 13.0464 8.36542 13.0003 8.30766 12.9422L6.43266 11.0672C6.31561 10.9499 6.24992 10.7909 6.24992 10.625C6.24992 10.4591 6.31561 10.3002 6.43266 10.1828C6.54971 10.0653 6.7088 9.99961 6.87466 9.99961C7.04053 9.99961 7.19962 10.0653 7.31667 10.1828L8.75 11.6164L12.6828 7.68281C12.741 7.62474 12.8099 7.57868 12.8858 7.54725C12.9616 7.51583 13.0429 7.49967 13.125 7.49967C13.2071 7.49967 13.2884 7.51583 13.3642 7.54725C13.44 7.57868 13.5089 7.62474 13.5672 7.68281C13.6253 7.74088 13.6713 7.80982 13.7027 7.88569C13.7341 7.96157 13.7503 8.04291 13.7503 8.12499C13.7503 8.20706 13.7341 8.2884 13.7027 8.36428C13.6713 8.44016 13.6253 8.50909 13.5672 8.56719Z'
                              fill={colorTheme}
                            />
                          </g>
                          <defs>
                            <clipPath id='clip0_248_22508'>
                              <rect width='20' height='20' fill='white' />
                            </clipPath>
                          </defs>
                        </svg>
                      ) : (
                        <div className='cart__order-type-checkbox border-[#e1e2e5]' />
                      )}
                      {item.text}
                    </div>
                  ))}
                </div>
              )}
              <div className='cart__contacts'>
                <div className='flex items-center justify-between mb-[12px]'>
                  <h4>{t('empty.contact')}</h4>
                  <span className='required' style={{ color: colorTheme }}>
                    {t('necessarily')}
                  </span>
                </div>

                <input
                  type='text'
                  placeholder='+996'
                  ref={inputRef}
                  value={phoneNumber}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                />
                {phoneError && (
                  <div className='error-message'>{phoneError}</div>
                )}

                <input
                  type='text'
                  placeholder={t('empty.comment') || 'Комментарий'}
                  value={comment}
                  onChange={(e) => setComment(e.target.value.trim())}
                />

                {orderTypes[activeIndex]?.value === 3 && (
                  <>
                    <input
                      type='text'
                      placeholder={t('empty.location') || 'Адрес'}
                      value={address}
                      onChange={(e) => handleAddressChange(e.target.value)}
                    />
                    {addressError && (
                      <div className='error-message'>{addressError}</div>
                    )}
                  </>
                )}
              </div>

              <div className='cart__sum bg-[#fff]'>
                <div
                  onClick={() => setActive(!active)}
                  className='cart__sum-top text-[#80868B]'
                >
                  {t('empty.deteil')}
                  <img
                    src={priceArrow}
                    alt='arrow'
                    className={
                      active ? 'cart__sum-img active' : 'cart__sum-img'
                    }
                  />
                </div>
                <div
                  className={
                    active
                      ? 'cart__sum-wrapper divide-y active'
                      : 'cart__sum-wrapper divide-y'
                  }
                  style={{ height: active ? '80px' : '0' }}
                >
                  <div className='cart__sum-item text-[#80868B]'>
                    {t('empty.total')}
                    <div className='cart__sum-total all text-[#80868B]'>
                      {cart.reduce(
                        (acc, item) => acc + item.productPrice * item.quantity,
                        0
                      )}{' '}
                      c
                    </div>
                  </div>
                  <div className='cart__sum-item text-[#80868B]'>
                    {t('services')}
                    <div className='cart__sum-total service'>
                      {venueData.serviceFeePercent}%
                    </div>
                  </div>
                </div>
                <div className='cart__sum-ress border-[#f3f3f3]'>
                  {t('empty.totalAmount')} <span>{solveTotalSum()} c</span>
                </div>
              </div>
            </>
          ) : (
            <Empty />
          )}
        </div>

        {window.innerWidth >= 768 && (
          <div className='busket flex-1'>
            <BusketDesktop
              to='/order'
              createOrder={handleOrder}
              disabled={!isButtonDisabled || !cart.length}
            />
          </div>
        )}
      </div>

      <div className='cart__forgot'>
        <h4 className='cart__forgot-title'>
          {t('orders.forgotten')}
          <img src={cookie} alt='cookie' />
        </h4>
        <div className='cart__forgot-wrapper'>
          {items
            ?.filter((item) => item.isRecommended)
            .map((item) => (
              <CatalogCard foodDetail={handleOpen} key={item.id} item={item} />
            ))}
        </div>
      </div>

      {window.innerWidth < 768 && (
        <footer className='cart__footer'>
          <button
            disabled={!cart.length || !isButtonDisabled}
            style={{ backgroundColor: colorTheme }}
            onClick={handleOrder}
          >
            {t('button.next') || 'Далее'}
          </button>
        </footer>
      )}
    </section>
  );
};

export default Cart;
