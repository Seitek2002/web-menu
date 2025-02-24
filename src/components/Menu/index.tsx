import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { useGetProductsQuery } from "src/api/Products.api";
import { useAppSelector } from "src/hooks/useAppSelector";
import MenuSkeleton from "src/skeletons/Menu";
import CatalogCard from "../Cards/Catalog";
import FoodDetail from "../Mobile/Home/FoodDetail";
import { IProductCatalog } from "src/types/products.types";

interface IProps {
    selectedCategory: number | undefined;
    searchText: string;
}

const Menu: FC<IProps> = ({ selectedCategory, searchText }) => {
    const { t } = useTranslation();
    const [isShow, setIsShow] = useState(false);

    const cart = useAppSelector((state) => state.yourFeature.items);
    const [PhotoDetail, setPhotoDetail] = useState<IProductCatalog>();
    const { data: products, isLoading } = useGetProductsQuery({
        category: selectedCategory || undefined,
        search: searchText,
    });

    const handleClick = (value: boolean) => {
        document.body.style.overflow = value ? "hidden" : "auto";
        setIsShow(value);
    };

    return (
        <>
            <h2 className="cart-title">{t("cartTitle")}</h2>
            <div className="cart-wrapper">
                {isLoading
                    ? Array(6)
                          .fill(5)
                          .map(() => <MenuSkeleton key={Math.random()} />)
                    : products?.map((item) => (
                        <div key={item.id} onClick={() => setPhotoDetail(item)}>
                        <CatalogCard
                            {...item}
                            quantity={cart.find((el) => el.id === item.id)?.quantity || 0}
                            setIsShow={() => handleClick(true)}
                        />
                    </div>
                    
                      ))}
            </div>
            <FoodDetail
                setIsShow={() => handleClick(false)}
                item={PhotoDetail}
                isShow={isShow}
            />
        </>
    );
};

export default Menu;
