import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { useGetCategoriesQuery } from "../../../../api/Categories.api";
import PointsSkeleton from "../../../../skeletons/Points";
import Search from "../Search";

import search from "../../../../assets/icons/points/search.svg";
import all from "../../../../assets/icons/points/all.svg";

import "./style.scss";

interface IProps {
  onCategoryChange: (categoryId: number | undefined) => void;
}

const Points: FC<IProps> = ({ onCategoryChange }) => {
  const { data: categories, isLoading } = useGetCategoriesQuery();

  const [active, setActive] = useState<number | undefined>(0);
  const [show, setShow] = useState(false);
  const { t } = useTranslation();

  const clickShow = () => {
    setShow(!show);
  };

  const selectCategory = (id: number | undefined) => {
    setActive(id);
    onCategoryChange(id);
  };

  return (
    <section className="desktop point">
      {show && <Search onToggle={clickShow} />}
      <div className="container">
        <div className="point-perent">
          <div
            className={`point-item ${active === -1 ? "active" : ""}`}
            onClick={clickShow}
          >
            <div className="point-wrapper bg-[#F9F9F9] border-white">
              <img src={search} alt="icon" />
              <p>{t("point.search")}</p>
            </div>
          </div>
          <div
            className={`point-item bg-[#fff] ${active === 0 ? "bg-[#875AFF] border-[#875AFF] text-white" : "border-white"}`}
            onClick={() => selectCategory(0)}
          >
            <div className={`point-wrapper ${active === 0 ? "bg-[#875AFF] border-[#875AFF] text-white" : "border-white"}`}>
              <img src={all} alt="icon" />
              <p>{t("point.all")}</p>
            </div>
          </div>
          {isLoading ? (
            Array(6).fill(0).map((_, index) => <PointsSkeleton key={index} />)
          ) : (
            categories?.map((item) => (
              <div
                className={`point-item ${active === item.id ? "active" : ""}`}
                key={item.id}
                onClick={() => selectCategory(item.id)}
              >
                <div className={`point-wrapper ${active === item.id ? "bg-[#875AFF] border-[#875AFF] text-white" : "border-white"}`}>
                  <img src={item.categoryPhoto} alt="icon" />
                </div>
                <p>{item.categoryName}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Points;
