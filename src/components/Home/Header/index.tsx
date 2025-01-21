import { FC } from "react";

import "./style.scss";

import logo from "../../../assets/icons/Header/logo.svg";
import clock from "../../../assets/icons/Header/Clock.svg";
const Header: FC = () => {
    return (
        <header className="header">
            <div className="container">
                <div className="header__content">
                    <div className="header__logo">
                        <img src={logo} alt="logo" />
                        <div className="header__info">
                            <p className="header__name">Жираф</p>
                            <div className="header__inner">
                                <img src={clock} alt="icon" />
                                <p className="header__time">10:00 - 22:00</p>
                            </div>
                        </div>
                    </div>
                    <div className="header__table">
                        <p>Стол №12</p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
