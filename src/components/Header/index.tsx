import { FC, useState } from "react";

import "./style.scss";

import logo from "../../assets/icons/Header/logo.svg";
import table from "../../assets/icons/Header/table.svg";
import arrow from "../../assets/icons/Header/black-arrow.svg";

const Header: FC = () => {
    const [isLanguageOpen, setIsLanguageOpen] = useState(false);
    const [active, setActive] = useState("RU");

    const toggleLanguageMenu = () => {
        setIsLanguageOpen((prev) => !prev);
    };

    const selectLanguage = (language: string) => {
        setActive(language); // Устанавливаем активный язык
        setIsLanguageOpen(false); // Закрываем меню после выбора
    };

  const list = ["RU","KG","ENG"]

    return (
        <header className="header">
            <div className="container">
                <div className="header__content">
                    <div className="header__logo">
                        <img src={logo} alt="logo" />
                        <div className="header__info">
                            <p className="header__name">Жираф</p>
                            <div className="header__inner">
                                <img src={table} alt="icon" />
                                <p className="header__table">Стол №12</p>
                            </div>
                        </div>
                    </div>
                    <div className={isLanguageOpen ? "header__language active" : "header__language"}>
                        <div className={`header__language-selected ${ isLanguageOpen ? "active" : "" }`} onClick={toggleLanguageMenu} > {active} <img src={arrow} alt="arrow" /> </div>
                          <div className={`header__wrapper ${isLanguageOpen ? "active" : ""}`}>
                            {list.filter((item) => item != active).map((item) =>  (
                            <div className="header__item" onClick={() => selectLanguage(item)} key={item}>{item}</div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
