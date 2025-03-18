import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { useGetProductsQuery } from "src/api/Products.api";
import { useAppSelector } from "src/hooks/useAppSelector";
import MenuSkeleton from "src/skeletons/Menu";
import CatalogCard from "../Cards/Catalog";
import MobileFoodDetail from "../../pages/Home/components/Mobile/FoodDetail";
import DesktopFoodDetail from "../../pages/Home/components/Desktop/FoodDetail";
import { IProductCatalog } from "src/types/products.types";
import { useParams } from "react-router-dom";

interface IProps {
    selectedCategory: number | undefined;
    searchText: string;
}

const Menu: FC<IProps> = ({ selectedCategory, searchText }) => {
    const params = useParams<{ venue: string }>();
    const { t } = useTranslation();
    const [isShow, setIsShow] = useState(false);

    const cart = useAppSelector((state) => state.yourFeature.items);
    const [PhotoDetail, setPhotoDetail] = useState<IProductCatalog>();
    const { data: products, isLoading } = useGetProductsQuery({
        category: selectedCategory || undefined,
        search: searchText,
        venueSlug: params.venue,
    });

    const handleClick = (value: boolean) => {
        document.body.style.height = value ? "100dvh" : "auto";
        document.body.style.overflow = value ? "hidden" : "inherit";
        setIsShow(value);
    };

    const isMobile = window.innerWidth <= 768;

    return (
        <>
            <h2 className="cart-title">{t("cartTitle")}</h2>
            <div className="cart-wrapper">
                {isLoading ? (
                    <MenuSkeleton />
                ) : (
                    products?.map((item) => (
                        <div onClick={() => setPhotoDetail(item)} key={item.id}>
                            <CatalogCard
                                {...item}
                                quantity={
                                    cart.find((el) => el.id === item.id)
                                        ?.quantity || 0
                                }
                                setIsShow={() => handleClick(true)}
                            />
                        </div>
                    ))
                )}
            </div>
            {isMobile ? (
                <MobileFoodDetail
                    setIsShow={() => handleClick(false)}
                    item={PhotoDetail}
                    isShow={isShow}
                />
            ) : (
                <DesktopFoodDetail
                    setIsShow={() => handleClick(false)}
                    item={PhotoDetail}
                    isShow={isShow}
                />
            )}
        </>
    );
};

export default Menu;
