import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { useGetCategoriesQuery } from "../../../../../api/Categories.api";
import PointsSkeleton from "../../../../../skeletons/Points";
import all from "../../../../../assets/icons/points/all.svg";
import { useAppSelector } from "src/hooks/useAppSelector";
import Item from "./Item";

import "./style.scss";
import { useParams } from "react-router-dom";

interface IProps {
    onCategoryChange: (categoryId: number | undefined) => void;
}

const Points: FC<IProps> = ({ onCategoryChange }) => {
    const params = useParams();
    const colorTheme = useAppSelector(
        (state) => state.yourFeature.venue?.colorTheme
    );
    const { data: categories, isLoading } = useGetCategoriesQuery({
        venueSlug: params.venue,
    });
    const [active, setActive] = useState<number | undefined>(0);
    const { t } = useTranslation();

    const selectCategory = (id: number | undefined) => {
        setActive(id);
        onCategoryChange(id);
    };

    return (
        <section className="desktop point">
            <div className="container">
                <div className="desktop point-content">
                    <div
                        className="desktop point-item"
                        style={{
                            backgroundColor: active === 0 ? colorTheme : "#fff",
                            color: active === 0 ? "#fff" : "#000",
                        }}
                        onClick={() => selectCategory(0)}
                    >
                        <img src={all} alt="icon" />
                        <p>{t("point.all")}</p>
                    </div>
                    {isLoading
                        ? Array(6)
                              .fill(0)
                              .map((_, index) => <PointsSkeleton key={index} />)
                        : categories?.map((item) => (
                              <Item
                                  key={item.id}
                                  item={item}
                                  active={active}
                                  selectCategory={selectCategory}
                              />
                          ))}
                </div>
            </div>
        </section>
    );
};

export default Points;
