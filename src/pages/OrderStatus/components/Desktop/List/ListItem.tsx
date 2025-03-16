import { FC } from "react";
import { useAppSelector } from "src/hooks/useAppSelector";

interface ListItemProps {
    img: string;
    name: string;
    price: number;
    weight: number;
    quantity: number;
}

const ListItem: FC<ListItemProps> = ({ img, name, price, weight, quantity }) => {
    const colorTheme = useAppSelector(state => state.yourFeature.venue?.colorTheme);

    return (
        <div className="order__status-list-item">
            <div className="order__status-list-img-wrapper">
                <img src={img} alt={name} />
            </div>
            <div className="order__status-list-info-wrapper">
                <div className="order__status-list-info">
                    <h5 className="order__status-list-name text-[#090A0B]">
                        {name}
                    </h5>
                    <span className="order__status-list-weight text-[#727272]">
                        {weight} г
                    </span>
                </div>
                <div className="order__status-list-info">
                    <span className="order__status-list-price" style={{ color: colorTheme }}>
                        {price} с
                    </span>
                    <span className="order__status-list-quantity text-[#727272]">
                        {quantity} шт
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ListItem;
