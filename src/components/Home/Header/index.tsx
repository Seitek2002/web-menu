import { FC } from "react";

import logo from "../../../assets/icons/Header/logo.svg";
import clock from "../../../assets/icons/Header/Clock.svg";

import "./style.scss";

const Header: FC = () => {
    return (
        <header className="header">
            <div className="container">
                <div className="header__content">
                    <div className="header__logo">
                        <img src={logo} alt="logo" />
                        <div className="header__info">
                            <p className="header__name text-[#090A0B]">Жираф</p>
                            <div className="header__inner">
                                <img src={clock} alt="icon" />
                                <p className="header__time text-[#626576]">10:00 - 22:00</p>
                            </div>
                        </div>
                    </div>
                    <div className="header__table bg-[#fff]">
                        <p className="text-[#626576]">Стол №12</p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
