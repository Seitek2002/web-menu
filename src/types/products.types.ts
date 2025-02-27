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