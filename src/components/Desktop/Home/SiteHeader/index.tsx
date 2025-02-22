import { FC, useState, useEffect, ChangeEvent } from "react";
import { useTranslation } from "react-i18next";

import logo from "../../../../assets/icons/SiteHeader/logo.svg";
import arrow from "../../../../assets/icons/Header/black-arrow.svg";
// import user from "../../../../assets/icons/SiteHeader/user.svg";
import search from "../../../../assets/icons/SiteHeader/search.svg";
import logoCompanion from "../../../../assets/icons/Header/logo.svg";
import clock from "../../../../assets/icons/Header/clock.svg";
import bell from "../../../../assets/icons/Header/bell.svg";
import check from "../../../../assets/icons/Header/check.svg";

import "./style.scss";

const SiteHeader: FC<{ setSearchText: (text: string) => void }> = ({ setSearchText }) => {
  const { t, i18n } = useTranslation();
  const [inputVal, setInputVal] = useState('');
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [active, setActive] = useState("RU");

  // Маппинг кодов языков для UI
  const languageMap: { [key: string]: string } = {
    ru: "RU",
    kg: "KG",
    en: "ENG",
  };

  // Обновляем active при смене языка
  useEffect(() => {
    const lang = i18n.language;
    setActive(languageMap[lang] || "RU");
  }, [i18n.language]);

  const toggleLanguageMenu = () => {
    setIsLanguageOpen((prev) => !prev);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value);
    setSearchText(e.target.value)
  }

  const selectLanguage = (language: string) => {
    const langCode = language === "RU" ? "ru" : language === "KG" ? "kg" : "en";
    i18n.changeLanguage(langCode); // Меняем язык
    localStorage.setItem("i18nextLng", langCode); // Сохраняем язык
    setIsLanguageOpen(false);
  };

  const list = ["RU", "KG", "ENG"];

  return (
    <header className="desktop siteHeader">
      <div className="container">
        <div className="siteHeader__content">
          <div className="siteHeader__top">
            <div className="siteHeader__logo">
              <img src={logo} alt="logo" />
              <div className="siteHeader__info">
                <p className="siteHeader__name text-[#090A0B]">iMenu.kg</p>
              </div>
            </div>
            <div className="siteHeader__search bg-[#F9F9F9]">
              <img src={search} alt="search" />
              <input value={inputVal} type="text" placeholder={t("search")} onChange={(e) => handleChange(e)} />
            </div>
            <div className="siteHeader__block">
              {/* <div className="siteHeader__user bg-[#F9F9F9]">
                <img src={user} alt="user" />
              </div> */}
              <div className="siteHeader__language">
                <div
                  className={`siteHeader__language-selected bg-[#F9F9F9] ${
                    isLanguageOpen ? "active" : ""
                  }`}
                  onClick={toggleLanguageMenu}
                >
                  {active} <img src={arrow} alt="arrow" />
                </div>
                {isLanguageOpen && (
                  <div className="siteHeader__wrapper bg-[#F9F9F9] active">
                    {list
                      .filter((item) => item !== active)
                      .map((item) => (
                        <div
                          className="siteHeader__item text-[#090A0B] cursor-pointer"
                          onClick={() => selectLanguage(item)}
                          key={item}
                        >
                          {item}
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <hr />
          <div className="siteHeader__bottom">
            <div className="header__logo">
              <img src={logoCompanion} alt="logo" />
              <div className="header__left">
                <p className="header__name text-[#090A0B]">{t("title")}</p>
                <div className="header__inner">
                  <img src={clock} alt="icon" />
                  <p className="header__time text-[#626576]">10:00 - 22:00</p>
                </div>
              </div>
            </div>
            <div className="flex gap-[20px]">
              <div className="siteHeader__notify">
                <img src={bell} alt="bell" />
                <p>{t("notify")}</p>
              </div>
              <div className="siteHeader__check">
                <img src={check} alt="check" />
                <p>{t("check")}</p>
              </div>
              <div className="header__table bg-[#F9F9F9]">
                <p className="text-[#626576]">{t("table")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;
