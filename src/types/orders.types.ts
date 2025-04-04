export interface IOrderProduct {
  product: number;
  count: number;
  modificator?: number;
}

export interface IOrder {
  id: number;
  phone: string;
  comment: string;
  serviceMode: number;
  status: number;
  servicePrice: string;
  tipsPrice: string;
  createdAt: string;
  orderProducts: IOrderProduct[];
}

// orderProducts: [
//   {
//     product: 10;
//     count: 1;
//     modificator?: 2;
//   },
//   {
//     product: 10;
//     count: 1;
//     modificator?: 1;
//   },
//   {
//     product: 10;
//     count: 1;
//     modificator?: 0;
//   },
// ]
