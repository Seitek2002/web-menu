import { FC, useState } from "react";

import "./style.scss";

import logo from "../../assets/icons/Header/logo.svg";
import table from "../../assets/icons/Header/table.svg";
import arrow from "../../assets/icons/Header/black-arrow.svg";


const Header: FC = () => {
    const [isLanguageOpen, setIsLanguageOpen] = useState(false);

    const toggleLanguageMenu = () => {
        setIsLanguageOpen(!isLanguageOpen);
    };

    return (
        <header className="header">
            <div className="container">
                <div className="header__content">
                    <div className="header__logo">
                        <img src={logo} alt="logo" />
                        <div className="header__info">
                            <p className="header__name">Жираф</p>
                            <div className="header__inner">
                                <img src={table} alt="icon" />{" "}
                                <p className="header__table">Стол №12</p>
                            </div>
                        </div>
                    </div>
                    <div className="header__language">
                        <div
                            className={isLanguageOpen ? "header__language-selected active" : "header__language-selected"}
                            onClick={toggleLanguageMenu}
                            
                        >
                            RU <img  src={arrow} alt="arrow" />
                        </div>
                        <div
                            className={isLanguageOpen ? "header__wrapper active" : "header__wrapper"}
                            onClick={toggleLanguageMenu}
                        >
                            <div className="header__item">KG</div>
                            <div className="header__line"></div>
                            <div className="header__item">ENG</div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
