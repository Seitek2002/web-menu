export interface IOrderProduct {
  product: number;
  count: number;
  modificator?: number;
}

export interface IOrder {
  phone: string;
  comment?: string;
  serviceMode?: number;
  servicePrice?: string;
  tipsPrice?: string;
  orderProducts: IOrderProduct[];
}

export interface IOrderById {
  id: number;
  phone: string;
  comment?: string;
  status: number,
  serviceMode?: number;
  servicePrice?: string;
  tipsPrice?: string;
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
