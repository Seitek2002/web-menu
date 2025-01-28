import { FC, useState } from "react";
import MenuSkeleton from "../../../skeletons/Menu";
import Item from "./Item";
import FoodDetail from "../FoodDetail";
import { useGetProductsQuery } from "src/api/Products.api";

import "./style.scss";
import { IProductCatalog } from "src/types/products.types";

interface IProps {
  selectedCategory: number | undefined;
}

const Catalog: FC<IProps> = ({ selectedCategory }) => {
  const [isShow, setIsShow] = useState(false);
  const [PhotoDetail, setPhotoDetail] = useState<IProductCatalog>();
  const { data: products, isLoading } = useGetProductsQuery({
    category: selectedCategory || undefined,
  });

  const handleClick = (value: boolean) => {
    document.body.style.overflow = value ? "hidden" : "auto";
    setIsShow(value);
  };

  return (
    <section className="cart">
      <div className="container">
        <h2 className="cart-title">Все блюда</h2>
        <div className="cart-wrapper">
          {isLoading
            ? Array(6)
                .fill(5)
                .map(() => <MenuSkeleton key={Math.random()} />)
            : products?.map((item) => (
                  <Item
                    key={item.id}
                    {...item}
                    setIsShow={() => handleClick(true)}
                    onClick={() => setPhotoDetail(item)}
                  />
              ))}
        </div>
      </div>
      {isShow && <FoodDetail setIsShow={() => handleClick(false)} item={PhotoDetail} />}
    </section>
  );
};

export default Catalog;
