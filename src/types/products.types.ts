export interface IProductCatalog {
  id: number;
  productName: string;
  productPrice: string;
  productPhoto: string;
  weight: number;
  category: {
    id: number;
    categoryName: string;
  };
  modificators: {
    id: number;
    externalId: string;
    name: string;
    price: string;
  }[]
}