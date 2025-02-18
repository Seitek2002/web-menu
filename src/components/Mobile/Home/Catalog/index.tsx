import { FC, useState } from 'react';
import CatalogCard from 'src/components/Cards/Catalog';
import MenuSkeleton from '../../../../skeletons/Menu';
import FoodDetail from '../FoodDetail';
import { useGetProductsQuery } from 'src/api/Products.api';
import { IProductCatalog } from 'src/types/products.types';
import { useTranslation } from "react-i18next";

import './style.scss';

interface IProps {
  selectedCategory: number | undefined;
}

const Catalog: FC<IProps> = ({ selectedCategory }) => {
  const { t } = useTranslation();
  const [isShow, setIsShow] = useState(false);
  const [PhotoDetail, setPhotoDetail] = useState<IProductCatalog>();
  const { data: products, isLoading } = useGetProductsQuery({
    category: selectedCategory || undefined,
  });

  const handleClick = (value: boolean) => {
    document.body.style.overflow = value ? 'hidden' : 'auto';
    setIsShow(value);
  };

  return (
    <section className='cart'>
      <div className='container'>
        <h2 className='cart-title'>{t("cartTitle")}</h2>
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
                    setIsShow={() => handleClick(true)}
                  />
                </div>
              ))}
        </div>
      </div>
      <FoodDetail setIsShow={() => handleClick(false)} item={PhotoDetail} isShow={isShow} />
    </section>
  );
};

export default Catalog;
