export interface IFoodCatalog {
  id: number;
  productName: string;
  productPrice: string;
  productPhoto: string;
  weight: number;
  category: {
    id: number;
    categoryName: string;
  };
}
