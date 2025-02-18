import { FC, useState } from 'react';
import MenuSkeleton from '../../../../skeletons/Menu';
import FoodDetail from '../FoodDetail';
import CatalogCard from 'src/components/Cards/Catalog';
import { useGetProductsQuery } from 'src/api/Products.api';
import { IProductCatalog } from 'src/types/products.types';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'src/hooks/useAppSelector';
import CardBusket from 'src/components/Cards/Cart';
import Footer from 'src/components/Mobile/Footer';

import delet from '../../../../assets/icons/Busket/delete.svg';

import './style.scss';

interface IProps {
  selectedCategory: number | undefined;
  renameTitleHead: () => void;
}

const Catalog: FC<IProps> = ({ selectedCategory, renameTitleHead }) => {
  const { t } = useTranslation();
  const [isShow, setIsShow] = useState(false);
  const [PhotoDetail, setPhotoDetail] = useState<IProductCatalog>();
  const cart = useAppSelector((state) => state.yourFeature.items);
  const { data: products, isLoading } = useGetProductsQuery({
    category: selectedCategory || undefined,
  });

  const handleClick = (value: boolean) => {
    document.body.style.overflow = value ? 'hidden' : 'auto';
    setIsShow(value);
  };

  return (
    <section className='desktop cart'>
      <div className='container'>
        <div className='cart-content'>
          <div className='cart-left'>
            <h2 className='cart-title'>{t('cartTitle')}</h2>
            <div className='cart-wrapper'>
              {isLoading
                ? Array(6)
                    .fill(5)
                    .map(() => <MenuSkeleton key={Math.random()} />)
                : products?.map((item) => (
                    <div onClick={() => setPhotoDetail(item)}>
                      <CatalogCard
                        key={item.id}
                        {...item}
                        quantity={cart.find(el => el.id === item.id)?.quantity || 0}
                        setIsShow={() => handleClick(true)}
                      />
                    </div>
                  ))}
            </div>
          </div>
          <div className='cart-right relative'>
            <div className='cart-top'>
              <h1 className='cart-title'>{t('busket.busketTitle')}</h1>
              <div
                className='cart-wrapper-img bg-[#FFF]'
                onClick={renameTitleHead}
              >
                <img src={delet} alt='delete' />
              </div>
            </div>
            <div className='cart-bottom bg-[#FFF]'>
              <div className='cart-table bg-[#F1F2F3]'>{t('table')}</div>
              {cart.map((item) => (
                <>
                  <CardBusket
                    key={item.id}
                    {...item}
                    cartLength={!!cart.length}
                  />
                </>
              ))}
            </div>
            <Footer position="absolute" />
          </div>
        </div>
      </div>
      <FoodDetail
        setIsShow={() => handleClick(false)}
        item={PhotoDetail}
        isShow={isShow}
      />
    </section>
  );
};

export default Catalog;
