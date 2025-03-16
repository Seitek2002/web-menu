import { FC, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetCategoriesQuery } from "../../../../../api/Categories.api";
import PointsSkeleton from "../../../../../skeletons/Points";
import Search from "../Search";
import Item from "./Item";
import { useAppSelector } from "src/hooks/useAppSelector";

import search from "../../../../../assets/icons/points/search.svg";
import all from "../../../../../assets/icons/points/all.svg";

import "./style.scss";

interface IProps {
    onCategoryChange: (categoryId: number | undefined) => void;
    onSearchTextChange: (e: string) => void;
}

const Points: FC<IProps> = ({ onCategoryChange, onSearchTextChange }) => {
    const params = useParams<{ venue: string }>();
    const { data: categories, isLoading } = useGetCategoriesQuery({
        venueSlug: params.venue,
    });

    const [active, setActive] = useState<number | undefined>(0);
    const [show, setShow] = useState(false);

    const colorTheme = useAppSelector(
        (state) => state.yourFeature.venue?.colorTheme
    ); // Получаем colorTheme из store

    const clickShow = () => {
        document.body.style.overflow = show ? "auto" : "inherit";
        setShow(!show);
    };

    const ScrollClick = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const selectCategory = (id: number | undefined) => {
        setActive(id);
        onCategoryChange(id ?? undefined);

        if (navigator.vibrate) {
            navigator.vibrate(10);
        }
    };

    return (
        <section className="mobile point">
            {show && (
                <Search
                    onToggle={clickShow}
                    onSearchTextChange={onSearchTextChange}
                />
            )}
            <div className="container">
                <div className="mobile point-perent">
                    <div
                        className={`mobile point-item ${
                            active === -1 ? "active" : ""
                        }`}
                        onClick={clickShow}
                    >
                        <div
                            className="mobile point-wrapper"
                            style={{
                                backgroundColor: "#F9F9F9",
                                borderColor: "white",
                            }}
                        >
                            <img src={search} alt="icon" />
                        </div>
                        <p>Поиск</p>
                    </div>
                    <div
                        className={`mobile point-item ${
                            active === 0 ? "active" : ""
                        }`}
                        onClick={() => {
                            selectCategory(0);
                            ScrollClick();
                        }}
                    >
                        <div
                            className={`mobile point-wrapper`}
                            style={{
                                backgroundColor:
                                    active === 0 ? colorTheme : "#F9F9F9",
                                borderColor:
                                    active === 0 ? colorTheme : "white",
                            }}
                        >
                            <img src={all} alt="icon" />
                        </div>
                        <p>Все</p>
                    </div>
                    {isLoading ? (
                        <>
                            {Array(6)
                                .fill(0)
                                .map((_, index) => (
                                    <PointsSkeleton key={index} />
                                ))}
                        </>
                    ) : (
                        categories?.map((item) => (
                            <Item
                                key={item.id}
                                item={item}
                                active={active}
                                selectCategory={selectCategory}
                            />
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};

export default Points;
