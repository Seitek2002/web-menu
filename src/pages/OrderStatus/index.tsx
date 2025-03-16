import { FC } from "react";

import Head from "./components/Desktop/Head";
import ListItem from "./components/Desktop/List/ListItem";
import ListHead from "./components/Desktop/List/ListHead";
import Status from "./components/Desktop/Status";
// import Check from "src/components/OrderStatus/Check";

import burger from "../../assets/images/Catalog/item-2.webp";
import shawarma from "../../assets/images/Catalog/item-1.webp";
import salad from "../../assets/images/OrderStatus/salad.png";
import cake from "../../assets/images/OrderStatus/cake.png";
import pancakes from "../../assets/images/OrderStatus/pancakes.png";

import "./style.scss";

interface Order {
    id: number;
    img: string;
    name: string;
    price: number;
    weight: number;
    quantity: number;
}

const myOrders: Order[] = [
    { id: 0, img: salad, name: "Салат с креветками", price: 200, weight: 200, quantity: 2 },
    { id: 1, img: shawarma, name: "Двойная запеченная шаурма", price: 400, weight: 500, quantity: 2 },
];

const allOrders: Order[] = [
    { id: 2, img: burger, name: "Бургер стандартный", price: 600, weight: 300, quantity: 2 },
    { id: 3, img: cake, name: "Шоколадный торт", price: 480, weight: 120, quantity: 2 },
    { id: 4, img: pancakes, name: "Японские панкейки с ягодами и медовым сиропом", price: 230, weight: 350, quantity: 1 },
    ...myOrders, // Это объединяет myOrders в allOrders
];

const OrderStatus: FC = () => {
    return (
        <section className="order__status">
            <div className="container">
                <Head />
                <div className="order__status-wrapper">
                    <div className="order__status-list bg-white shadow rounded">
                        {/* Мои заказы */}
                        <ListHead table={0} quantity={myOrders.length} />
                        <div className="order__status-list-content divide-y-2 divide-gray-300">
                            {myOrders.map((item) => (
                                <ListItem key={item.id} {...item} />
                            ))}
                        </div>

                        {/* Заказы стола №12 */}
                        <ListHead table={12} quantity={allOrders.length} />
                        <div className="order__status-list-content divide-y-2 divide-gray-300">
                            {allOrders.map((item) => (
                                <ListItem key={item.id} {...item} />
                            ))}
                        </div>
                    </div>
                    {/* Статус заказа */}
                    <Status />
                </div>
            </div>

            {/* <Check /> */}
        </section>
    );
};

export default OrderStatus;
