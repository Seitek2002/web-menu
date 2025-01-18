import { FC, useState } from "react";
import { useGetCategoriesQuery } from "../../api/Categories";
import PointsSkeleton from "../../skeletons/Points";
import Search from "../Search";

import search from "../../assets/icons/points/search.svg";

import "./style.scss";

const Points: FC = () => {
    const { data: items, isLoading } = useGetCategoriesQuery();

    const [active, setActive] = useState("0");
    const [show, setShow] = useState(false);

    const clickShow = () => {
        setShow(!show);
    };

    return (
        <section className="point">
            {show && <Search onToggle={clickShow} />}
            <div className="container">
                <div className="point-perent">
                    <div
                        className={`point-item ${
                            active === "-1" ? "active" : ""
                        }`}
                        onClick={clickShow}
                    >
                        <div className="point-wrapper">
                            <img src={search} alt="icon" />
                        </div>
                        <p>Поиск</p>
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
                        <>
                            {items?.map((item) => (
                                <div
                                    className={`point-item ${
                                        active === item.categoryId
                                            ? "active"
                                            : ""
                                    }`}
                                    key={item.categoryId}
                                    onClick={() => setActive(item.categoryId)}
                                >
                                    <div className="point-wrapper">
                                        <img
                                            src={item.categoryPhoto}
                                            alt="icon"
                                        />
                                    </div>
                                    <p>{item.categoryName}</p>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Points;
