import { useState } from "react";
import { useTranslation } from "react-i18next";
import ava from "../../../../assets/icons/Busket/ava.svg";
import first from "../../../../assets/icons/Busket/first.svg";
import { useAppSelector } from "src/hooks/useAppSelector";
import { useAppDispatch } from "src/hooks/useAppDispatch";
import { setOrder } from "src/store/yourFeatureSlice";

import "./style.scss";

interface TipsProps {
  setItemName: (item: string) => void;
}

const Tips: React.FC<TipsProps> = ({ setItemName }) => {
  const dispatch = useAppDispatch();
  const order = useAppSelector((state) => state.yourFeature.order);
  const colorTheme = useAppSelector(state => state.yourFeature.venue?.colorTheme);
  const list: string[] = ["", "50 c", "100 c", "15 %", "20 %"];
  const [active, setActive] = useState<number>(0);
  const { t } = useTranslation();

  const handleClick = (index: number) => {
    setActive(index);
    setItemName(list[index]);
    dispatch(setOrder({ ...order, tipsPrice: list[index] }));
  }

  return (
    <div className="busket__server bg-[#fff]">
      <h3 className="busket__server-title">{t("busket.tips")}</h3>
      <div className="busket__server-info">
        <div className="busket__server-ava">
          <img src={ava} alt="ava" />
        </div>
        <div className="busket__server-inner">
          <span className="busket__server-job text-[#626576]">{t("busket.job")}</span>
          <span className="busket__server-name">Имнакулов Дамир</span>
        </div>
      </div>
      <div className="busket__server-wrapper">
        {list.map((item, index) => (
          <div 
            key={index}
            onClick={() => handleClick(index)} 
            className={`busket__server-item ${active === index ? "active" : "bg-[#F9F9F9]"}`}
            style={active === index ? { backgroundColor: colorTheme, color: '#fff' } : {}}
          >
            {item ? item : <img src={first} alt="icon" />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tips;
