import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { useGetCategoriesQuery } from "../../../../api/Categories.api";
import PointsSkeleton from "../../../../skeletons/Points";
import all from "../../../../assets/icons/points/all.svg";

import "./style.scss";

interface IProps {
  onCategoryChange: (categoryId: number | undefined) => void;
}

const Points: FC<IProps> = ({ onCategoryChange }) => {
  const { data: categories, isLoading } = useGetCategoriesQuery();
  const [active, setActive] = useState<number | undefined>(0);
  const { t } = useTranslation();

  const selectCategory = (id: number | undefined) => {
    setActive(id);
    onCategoryChange(id);
  };

  return (
    <>
      <section className="desktop point">
        <div className="container">
          <div className="desktop point-content">
            <div
              className={`desktop point-item ${
                active === 0
                  ? "bg-[#875AFF] text-[#fff]"
                  : "active bg-[#fff] text-[#000]"
              }`}
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
                  <div key={item.id}>
                    <div
                      className={`desktop point-item ${
                        active === item.id
                          ? "bg-[#875AFF] text-[#fff]"
                          : "active bg-[#fff]"
                      }`}
                      onClick={() => selectCategory(item.id)}
                    >
                      <img src={item.categoryPhoto} alt="icon" />
                      <p>{item.categoryName}</p>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Points;
