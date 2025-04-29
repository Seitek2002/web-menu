export interface IOrderProduct {
  product: {
    id: number;
    productName: string;
    productPhoto: string;
    weight: number;
  };
  count: number;
  modificator?: number;
  price?: number;
}

export interface IReqCreateOrder {
  phone: string;
  comment?: string;
  serviceMode: number;
  address?: string;
  servicePrice?: number;
  tipsPrice?: number;
  spot?: number;
  table?: number;
  orderProducts: IOrderProduct[];
}

export interface IOrder {
  id?:number;
  phone: string;
  comment?: string;
  address?: string;
  venue_slug: string;
  serviceMode?: number;
  servicePrice?: string;
  tipsPrice?: string;
  orderProducts: IOrderProduct[];
  status?: number;
}

export interface IOrderById {
  id: number;
  phone: string;
  comment?: string;
  status: number;
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
