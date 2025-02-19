import { FC } from "react";
interface ListItemProps {
    table: number;
    quantity: number;
}
const ListHead: FC<ListItemProps> = ({table, quantity}) => {

    return (
            <div className="order__status-list-head">
                <h4 className="order__status-list-title text-[#090A0B]">
                    {
                        table ? ("Заказы стола №"+table) : ("Мои заказы")
                    }
                </h4>
                <div className="order__status-list-order-quantity text-[#727272]">
                    {quantity} заказов
                </div>
            </div>
    );
};

export default ListHead;
