import { FC } from "react";
import Menu from "src/components/Menu";

import "./style.scss";

interface IProps {
  selectedCategory: number | undefined;
  renameTitleHead?: () => void;
  searchText: string;
}

const Catalog: FC<IProps> = ({ selectedCategory, searchText }) => {

  // console.log(renameTitleHead);

  return (
    <section className="cart">
      <div className="container">
        <div className="cart-content">
          <div className="cart-left">
            <Menu selectedCategory={selectedCategory} searchText={searchText} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Catalog;
