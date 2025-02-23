import { FC, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import "./style.scss";

import logo from "../../../../assets/icons/SiteHeader/logo.svg";
import arrow from "../../../../assets/icons/Header/black-arrow.svg";
// import user from "../../../../assets/icons/SiteHeader/user.svg";

const SiteHeader: FC = () => {
  const { i18n } = useTranslation();
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

  const selectLanguage = (language: string) => {
    const langCode = language === "RU" ? "ru" : language === "KG" ? "kg" : "en";
    i18n.changeLanguage(langCode); // Меняем язык
    localStorage.setItem("i18nextLng", langCode); // Сохраняем язык
    setIsLanguageOpen(false);
  };

  const list = ["RU", "KG", "ENG"];

  return (
    <header className="mobile siteHeader">
      <div className="container">
        <div className="siteHeader__content bg-[#fff]">
          <div className="siteHeader__logo">
            <div>
            </div>
            <img src={logo} alt="logo" />
            <div className="siteHeader__info">
              <p className="siteHeader__name text-[#090A0B]">iMenu.kg</p>
            </div>
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
      </div>
    </header>
  );
};

export default SiteHeader;
