export interface IProductModificator {
  id: number;
  name: string;
  price: string;
}

export interface IProductCatalog {
  id: number;
  productName: string;
  productPrice: string;
  productDescription: string | null;
  productPhoto: string;
  weight: number;
  category: {
    id: number;
    categoryName: string;
  };
  modificators: IProductModificator[]
}

export interface IOrderProduct {
  venueSlug: string,
  spotSlug: string,
  tableNum?: string,
  phone: string,
  comment: string,
  serviceMode: number,
  servicePrice: string,
  tipsPrice: string,
  orderProducts: {
    product: number,
    count: number,
    modificator?: number
  }[]
}
